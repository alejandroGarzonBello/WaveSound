import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cancion } from '../../models/Cancion';
import { Usuario } from '../../models/Usuario';
import { CancionService } from '../../service/Canciones.service';

@Component({
  selector: 'app-subida',
  templateUrl: './subida.component.html',
  styleUrl: './subida.component.css'
})
export class SubidaComponent {
  public form:FormGroup
  public errors :any
  cancion:Cancion|null = null
  usuario:Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  file:File|null = null
  submitted = false

  constructor(private builder:FormBuilder,private router:Router,private activaetedRoute:ActivatedRoute,private service:CancionService) {
    this.form= this.builder.group({
      titulo: ["",Validators.required],
      artista: ["",Validators.required],
      album: ["",Validators.required],
      genero: ["",Validators.required],
      duracion: ["",Validators.required],
      ubicacion: ["",Validators.required],
      portada: ["",Validators.required],
      archivo: ["",Validators.required]
    })
   }
   onSubmit(){
    this.submitted = true
    
    console.log("submit");
    if(this.form.valid){
      this.cancion = {
        titulo: this.form.value.titulo,
        artista: this.form.value.artista,
        album: this.form.value.album,
        genero: this.form.value.genero,
        duracion: this.form.value.duracion,
        ubicacion: this.form.value.ubicacion,
        portada: this.form.value.portada,
        favorito: false,
        usuario: this.usuario
      }
      console.log(this.cancion);
      if (this.cancion) {
        console.log("submit2");
        this.service.saveCancion(this.cancion).then((response:any) => {
          this.handleResponse(response);
        }).catch((error:any) => {
          this.handleError(error);
        });
      }
    }
   }

  handleResponse(response:any){
    console.log("reponse");
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (this.file) {
      this.service.uploadCancion(this.file, this.usuario.id.toString()).subscribe(
        (response: any) => this.handleResponse2(response),
        (error: any)  => this.handleError(error)
      );
    }
  }

  handleResponse2(response:any){
    console.log("reponse2");
    console.log(response.message);
    this.router.navigate(['/home']);
  }

  handleError(error:any){
    this.errors = error;
    console.log(this.errors);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.file = file;
  }
}
