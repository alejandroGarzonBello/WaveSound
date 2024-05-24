import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cancion } from '../../models/Cancion';
import { Usuario } from '../../models/Usuario';
import { CancionService } from '../../service/Canciones.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-subida',
  templateUrl: './subida.component.html',
  styleUrl: './subida.component.css'
})
export class SubidaComponent {
  @ViewChild('subida') public subidaModal!: ModalDirective;
  public form:FormGroup
  public errors :any
  cancion:Cancion|null = null
  usuario:Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  file:File|null = null
  submitted = false
  @Output() reloadEvent = new EventEmitter<void>();
  @ViewChild('closeModal') closeModal:
    | ElementRef<HTMLButtonElement>
    | undefined;
  constructor(private builder:FormBuilder,private router:Router,private activaetedRoute:ActivatedRoute,private service:CancionService) {
      this.form= this.builder.group({
        titulo: ["",Validators.required],
        artista: ["",Validators.required],
        album: ["",Validators.required],
        genero: ["",Validators.required],
        duracion: ["",Validators.required],
        ubicacion: [{value: '', disabled: true}, Validators.required],
        portada: ["",Validators.required],
        archivo: ["",Validators.required]
      })
  }
   onSubmit(){
    this.submitted = true
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
      if (this.cancion) {
        this.service.saveCancion(this.cancion)
        .then(
          (response: any) => this.handleResponse(response),
          (error: any)  => this.handleError(error)
        );
      }
      this.reloadEvent.emit()
      this.closeModal?.nativeElement.click();
    }
   }

  handleResponse(response: any){
    console.log(response)
    const formData = new FormData();
    if (this.file) {
      formData.append('archivo', this.file);
    }
    this.service.uploadCancion(formData, this.usuario.id.toString())
      .subscribe(
        (response: any) => this.handleResponse2(response),
        (error: any)  => this.handleError(error)
      );
    this.router.navigate(['/canciones']);
  }

  handleResponse2(response:any){
    console.log("reponse2");
    console.log(response.message);
    this.subidaModal.hide();
    this.router.navigate(['canciones']);
  }

  handleError(error:any){
    this.errors = error;
    console.log(this.errors);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.file = new File([file], this.form.controls['titulo'].value+".m4a");
    this.setUbicacionValue();
  }

  setUbicacionValue() {
    if (this.file) {
      this.form.controls['ubicacion'].setValue(this.file.name);
    }
  }
}
