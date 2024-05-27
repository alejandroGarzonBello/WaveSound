import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import e from 'cors';
import { AuthService } from '../../service/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public errors: any;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private activaetedRoute: ActivatedRoute,
    private service: AuthService
  ) {
    this.registerForm = this.builder.group({
      nombre: [''],
      email: [''],
      password: [''],
    });
  }

  /**
   * Metodo que se ejecuta al enviar el formulario de registro
   */
  onSubmit() {
    this.cleanErrors();
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe(
        (response) => this.handleResponse(response),
        (error) => this.handleError(error)
      );
    }
  }

  /**
   * Metodo que se ejecuta al recibir una respuesta del servidor
   * @param response 
   */
  handleResponse(response: any) {
    console.log(response.message);
    this.router.navigate(['/login']);
  }

  /**
   * Metodo que se ejecuta al recibir un error del servidor
   * @param error 
   */
  handleError(error: any) {
    this.errors = error.error.errors;
    console.log(this.errors);
  }

  /**
   * Metodo que limpia los errores
   */
  private cleanErrors() {
    this.errors = null;
  }
}
