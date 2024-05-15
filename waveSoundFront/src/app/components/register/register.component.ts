import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import e from 'cors';
import { AuthService } from '../../service/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm:FormGroup
  public errors :any

  constructor(private builder:FormBuilder,private router:Router,private activaetedRoute:ActivatedRoute,private service:AuthService) {
    this.registerForm= this.builder.group({
      nombre:[""],
      email:[""],
      password:[""]
    })
   }

   onSubmit(){
    this.cleanErrors()
    if(this.registerForm.valid){
      this.service.register(this.registerForm.value).subscribe(
        response => this.handleResponse(response),
        error => this.handleError(error)
      )
    }
   }

   handleResponse(response:any){
    console.log(response.message)
    this.router.navigate(['/login'])
   }

   handleError(error:any){
    this.errors = error.error.errors
    console.log(this.errors)
   }

   private cleanErrors(){
    this.errors = null
   }
  

}
