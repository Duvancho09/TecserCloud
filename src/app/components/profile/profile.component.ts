import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class ProfileComponent {
  carList: { form: FormGroup; editMode: boolean }[] = [];

  ngOnInit(): void {
    const storedData = localStorage.getItem('carDataList');
    const data = storedData ? JSON.parse(storedData) : [];
    
    this.carList = data.map((car: any) => ({
      form: new FormGroup({
        marca: new FormControl(car.marca, Validators.required),
        modelo: new FormControl(car.modelo, Validators.required),
        color: new FormControl(car.color, Validators.required),
        anio: new FormControl(car.anio, [Validators.required, Validators.pattern(/^\d{4}$/)]),
        fechaIngreso: new FormControl(car.fechaIngreso, Validators.required),
      }),
      editMode: false
    }));
  }

  toggleEdit(index: number) {
    this.carList[index].editMode = !this.carList[index].editMode;
  }

  saveChanges(index: number) {
    if (this.carList[index].form.valid) {
      this.carList[index].editMode = false;

      const updatedData = this.carList.map(car => car.form.value);
      localStorage.setItem('carDataList', JSON.stringify(updatedData));

      Swal.fire('¡Actualizado!', 'Los datos se han guardado correctamente', 'success');
    }
  }

  deleteCar(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el vehículo del perfil',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carList.splice(index, 1);
        const updatedData = this.carList.map(car => car.form.value);
        localStorage.setItem('carDataList', JSON.stringify(updatedData));
        Swal.fire('Eliminado', 'El vehículo fue eliminado correctamente.', 'success');
      }
    });
  }
}