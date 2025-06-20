import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registers-cars',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  templateUrl: './registers-cars.component.html',
  styleUrl: './registers-cars.component.css',
  animations: [
    trigger('fadeInGrow', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8) translateY(40px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RegistersCarsComponent {
  carList: { form: FormGroup; editMode: boolean }[] = [];
  
  ngOnInit(): void {
    const storedData = localStorage.getItem('carDataList');
    const data = storedData ? JSON.parse(storedData) : [];
    
    this.carList = data.map((car: any) => {
      const form = new FormGroup({
        marca: new FormControl(car.marca, Validators.required),
        modelo: new FormControl(car.modelo, Validators.required),
        color: new FormControl(car.color, Validators.required),
        anio: new FormControl(car.anio, [Validators.required, Validators.pattern(/^\d{4}$/)]),
        placa: new FormControl(car.placa, [Validators.required]),
        fechaIngreso: new FormControl(car.fechaIngreso, Validators.required),
        partes: new FormControl(car.partes || ''),
        descripcion: new FormControl(car.descripcion || ''),
        fechaVenta: new FormControl(car.fechaVenta || '')
      });
      form.disable();

      return { form: form, editMode: false };
    });
  }

   deleteCar(index: number) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará el registro del vehículo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.carList.splice(index, 1);
          const updatedData = this.carList.map(car => car.form.value);
          localStorage.setItem('carDataList', JSON.stringify(updatedData));
          Swal.fire('Eliminado', 'El registro del vehículo fue eliminado correctamente.', 'success');
        }
      });
    }

}
