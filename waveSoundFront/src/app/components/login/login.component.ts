import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../service/Token.service';
import { AuthService } from '../../service/Auth.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('closeModal') closeModal:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('password') password: ElementRef<HTMLInputElement> | undefined;
  formLogin: boolean = true;
  loged: boolean = false;
  public login: FormGroup;
  public registerForm: FormGroup;
  public errors: any;
  usuario: Usuario | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private service: AuthService,
    private tokenService: TokenService
  ) {
    this.login = this.formBuilder.group({
      email: [''],
      password: [''],
    });
    this.registerForm = this.formBuilder.group({
      nombre: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.loged = true;
    }
  }

  onSubmit() {
    this.cleanErrors();
    if (this.formLogin) {
      if (this.login.valid) {
        this.service.login(this.login.value).subscribe(
          (response) => this.handleResponse(response),
          (error) => this.handleError(error)
        );
        this.loged = true;
        this.closeModal?.nativeElement.click();
        if (this.password) {
          this.password.nativeElement.value = '';
        }
      }
    } else {
      if (this.registerForm.valid) {
        this.service.register(this.registerForm.value).subscribe(
          (response) => this.handleResponse(response),
          (error) => this.handleError(error)
        );
      }
    }
  }

  cambiar() {
    if (this.formLogin) {
      this.formLogin = false;
    } else {
      this.formLogin = true;
    }
  }

  logout() {
    this.tokenService.revokeToken();
    this.loged = false;
    this.router.navigate(['']);
    localStorage.removeItem('id');
  }

  private handleResponse(response: any): void {
    if (this.formLogin) {
      console.log(response);
      console.log(response.id);
      localStorage.setItem('id', response.id);
      this.usuario = {
        id: response.id,
        nombre: response.nombre,
        email: response.email,
        password: response.password,
        token: response.token,
        canciones: null,
      };
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      this.tokenService.handleToken(response.token);
      this.router.navigate(['/canciones']);
    } else {
      console.log(response.message);
      this.router.navigate(['/login']);
    }
  }

  handleError(error: any) {
    this.errors = error.error.errors;
    console.log(this.errors);
  }

  private cleanErrors() {
    this.errors = null;
  }
}
