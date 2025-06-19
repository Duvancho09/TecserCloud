import { Component } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  dataForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)])
  });

  constructor(private router: Router){}

  ingresar(){
    if(this.dataForm.valid){
      const loginData = this.dataForm.value;
      Swal.fire({
        icon: 'success',
        title: 'Datos correctos',
        text: 'Disfruta de la página y las cosas que trae para ti',
        showCloseButton: true
      });
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Por favor revisa los campos que esten llenos y coincida el usuario con la contraseña',
        showCloseButton: true
      })
    }
  }

}
