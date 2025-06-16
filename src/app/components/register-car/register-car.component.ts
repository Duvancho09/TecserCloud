import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.css',
  animations: [
    trigger('fadeInGrow', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8) translateY(40px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ])
  ]
})

export class RegisterCarComponent {

  constructor(private router: Router) {}
  
  carForm = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    anio: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
    fechaIngreso: new FormControl('', [Validators.required]),
  })

  register() {
    if (this.carForm.valid) {
      const newCar = this.carForm.value;
      const existingData = localStorage.getItem('carDataList');
      const carDataList = existingData ? JSON.parse(existingData) : [];
      carDataList.push(newCar);
      localStorage.setItem('carDataList', JSON.stringify(carDataList));
      Swal.fire({
        icon: 'success',
        title: 'Exito al registrar!!!',
        text: 'El carro se registro correctamente',
        showConfirmButton: true,      
        timer: 4500
      }),
      this.router.navigate(['/profile']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar auto',
        text: 'Los campos estan vacios o incorrectos',
        timer: 4500,
        showCloseButton: true
      })
    }
  }

}
