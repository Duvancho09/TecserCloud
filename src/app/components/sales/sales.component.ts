import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SalesComponent {
  carList: { form: FormGroup; editMode: boolean }[] = [];
  partesVehiculo: string[] = [];

  constructor(private router: Router){}

  ngOnInit(): void {
    const storedData = localStorage.getItem('carDataList');
    const data = storedData ? JSON.parse(storedData) : [];
    
    this.carList = data.map((car: any) => ({
      form: new FormGroup({
        marca1: new FormControl(car.marca1, Validators.required),
        modelo1: new FormControl(car.modelo1, Validators.required),
        color1: new FormControl(car.color1, Validators.required),
        anio1: new FormControl(car.anio1, [Validators.required, Validators.pattern(/^\d{4}$/)]),
        placa1: new FormControl(car.placa1, [Validators.required]),
        fechaIngreso1: new FormControl(car.fechaIngreso1, Validators.required),
        partes1: new FormControl(car.partes1 || ''),
        descripcion1: new FormControl(car.descripcion1 || ''),
        fechaVenta1: new FormControl(car.fechaVenta1 || '')
      }),
      editMode: false
    }));

    const partesSet = new Set<string>();
    this.carList.forEach((car: any) => {
      if(car.partes){
        partesSet.add(car.partes);
      }
    });
    this.partesVehiculo = Array.from(partesSet);
  }

  deleteCar(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará la venta registrada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carList.splice(index, 1);
        const updatedData = this.carList.map(car => car.form.value);
        localStorage.setItem('carDataList', JSON.stringify(updatedData));
        Swal.fire('Eliminada', 'La venta fue eliminada correctamente.', 'success');
      }
    });
  }

}
