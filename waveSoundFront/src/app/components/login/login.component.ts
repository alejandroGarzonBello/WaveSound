import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../service/Token.service';
import { AuthService } from '../../service/Auth.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public login:FormGroup
  public errors:any
  usuario:Usuario|undefined

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private activatedRouter:ActivatedRoute,
    private service:AuthService,
    private tokeService:TokenService) { 

   this.login = this.formBuilder.group({
      email:[""],
      password:[""],
   })
  }

  
  
  onSubmit(){
    this.cleanErrors()
    if(this.login.valid){
      this.service.login(this.login.value).subscribe(
        response => this.handleResponse(response),
        error => this.handleError(error)
      )
    }
    
  }
  private handleResponse(response: any): void {
    console.log(response);
    this.usuario={
      id:response.id,
      nombre:response.nombre,
      email:response.email,
      password:response.password,
      token:response.token,
      canciones:null
    }
    localStorage.setItem('usuario',JSON.stringify(this.usuario))
    this.tokeService.handleToken(response.token);
    this.router.navigate(['/canciones']);
  }

   handleError(error:any){
    this.errors = error.error.errors
    console.log(this.errors)
   }

   private cleanErrors(){
    this.errors = null
   }

   goToRegister(){
    this.router.navigate(['/register'])
   }

}
