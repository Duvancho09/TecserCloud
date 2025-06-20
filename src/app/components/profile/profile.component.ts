import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { VehicleService } from '../../services/vehicle.service';
import { Vehiculo } from '../../models/vehiculo.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
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
  carList: { form: FormGroup; editMode: boolean; historialPartes: any[] }[] = [];

  constructor(private router: Router, private vehicleService: VehicleService){}

  ngOnInit(): void {
    // const storedData = localStorage.getItem('carDataList');
    // const data = storedData ? JSON.parse(storedData) : [];
    
    this.vehicleService.getVehiculos().subscribe({
      next: (vehiculos: Vehiculo[]) => {
        this.carList = vehiculos.map((car: any) => ({
          form: new FormGroup({
            marca: new FormControl(car.marca, Validators.required),
            modelo: new FormControl(car.modelo, Validators.required),
            color: new FormControl(car.color, Validators.required),
            anio: new FormControl(car.anio, [Validators.required, Validators.pattern(/^\d{4}$/)]),
            placa: new FormControl(car.placa, [Validators.required]),
            fechaIngreso: new FormControl(car.fechaIngreso, Validators.required),
            partes: new FormControl(car.partes || ''),
            descripcion: new FormControl(car.descripcion || ''),
            fechaVenta: new FormControl(car.fechaVenta || '')
          }),
          historialPartes: car.historialPartes || [],
          editMode: false
        }));
      }, error: (err) => {
        console.error('Error al obtener vehículos', err);
      }
    })
  }
  
  goToRegister() {
    this.router.navigate(['/register-car']);
  }

  toggleEdit(index: number) {
    this.carList[index].editMode = !this.carList[index].editMode;
  }

  saveChanges(index: number) {
    const form = this.carList[index].form;

    if(form.valid){
      const vehiculoActualizado: Vehiculo = form.value;

      this.vehicleService.updateVehiculo(vehiculoActualizado).subscribe({
        next: () => {
          this.carList[index].editMode = false;
          Swal.fire('¡Actualizado!', 'Los datos se han guardado correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          Swal.fire('Error', 'No se pudo actualizar el vehículo', 'error');
        }
      });
    }


    if (this.carList[index].form.valid) {
      this.carList[index].editMode = false;

      const updatedData = this.carList.map(car => car.form.value);
      localStorage.setItem('carDataList', JSON.stringify(updatedData));

    }
  }

  deleteCar(index: number) {
    const placa = this.carList[index].form.get('placa')?.value;
    console.log('placa a eliminar:', placa);

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el vehículo completamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.deleteVehiculo(placa).subscribe({
          next: () => {
            this.carList.splice(index, 1);
            Swal.fire('Eliminado', 'El vehículo fue eliminado correctamente.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el vehiculo', 'error');
          }
        });
      }
    });
  }
}