import { Component } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/loginRequest.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeIn',[
      transition(':enter',[
        style({ opacity: 0 }),
        animate('2s ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideIn',[
      transition(':enter',[
        style({ transform: 'translateX(100px)', opacity: 0 }),
        animate('0.8s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  cargando = false;
  dataForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    contrasena: new FormControl('', [Validators.required, Validators.maxLength(30)])
  });

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(){
    if(!this.authService.estaLogueado()){
      history.pushState(null, '', location.href);
      window.onpopstate = () => {
        history.go(1);
      };
    }
  }

  ingresar(){
    this.cargando = true;
    if(this.dataForm.valid){
      const loginData: LoginRequest = {
        correo: this.dataForm.value.correo || '',
        contrasena: this.dataForm.value.contrasena || ''
      };

      const TIMEOUT_MS = 30000;
      let yaMostroError = false;

      const timeout = setTimeout(() => {
        if(!yaMostroError){
          yaMostroError = true;
          this.cargando = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Tiempo de espera agotado. Verifica tu conexión.',
            showCloseButton: true
          });
        }
      }, TIMEOUT_MS);

      this.authService.login(loginData).subscribe({
        next: res => {
          if(yaMostroError) return;
          clearTimeout(timeout);
          this.cargando = false;
          console.log('Respues del login:', res);
          sessionStorage.setItem('authToken', res.token);
          sessionStorage.setItem('userRol', res.rol);
          sessionStorage.setItem('cedula', res.cedulaCliente);
          const savedToken = sessionStorage.getItem('authToken');
          console.log('Token guardado en sessionStorage', savedToken);
          Swal.fire({
            icon: 'success',
            title: 'Datos correctos',
            text: 'Disfruta de la página y las cosas que trae para ti',
            showCloseButton: true
          });
          this.router.navigate(['/home']);
        },
         error: err => {
          if(yaMostroError) return;
          clearTimeout(timeout);
          yaMostroError = true;
          this.cargando = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Credenciales inválidas o problema en el servidor, intenta mas tarde',
            showCloseButton: true
          });
        }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Campos',
          text: 'Por favor completa todos los campos',
          showCloseButton: true
        })
      }
    }
  }