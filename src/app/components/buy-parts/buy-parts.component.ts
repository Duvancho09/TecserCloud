import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { MaterialModule } from '../../material.module';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehiculo } from '../../models/vehiculo.model';

@Component({
  selector: 'app-buy-parts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './buy-parts.component.html',
  styleUrl: './buy-parts.component.css',
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class BuyPartsComponent {
  partesDisponibles: string[]=[
    'PUERTAS', 'MOTORES', 'CHASIS', 'ESPEJOS', 'RINES', 'LLANTAS', 'FAROLAS'
  ];
  carList: { form: FormGroup; editMode: boolean }[] = [];
  selectedImages: string[] = [];

  constructor(private router: Router, private vehicleService: VehicleService){}

  ngOnInit(): void {
    const storedData = localStorage.getItem('carDataList');
    const data = storedData ? JSON.parse(storedData) : [];

    this.vehicleService.getVehiculos().subscribe({
      next: (vehiculos: Vehiculo[]) => {
        this.carList = vehiculos.map((car: any, index: number) => {
          const form = new FormGroup({
            marca: new FormControl(car.marca, Validators.required),
            modelo: new FormControl(car.modelo, Validators.required),
            color: new FormControl(car.color, Validators.required),
            anio: new FormControl(car.anio, [Validators.required, Validators.pattern(/^\d{4}$/)]),
            placa: new FormControl(car.placa, [Validators.required]),
            partes: new FormControl(car.partes, [Validators.required]),
            fechaIngreso: new FormControl(car.fechaIngreso, [Validators.required]),
            descripcion: new FormControl(car.descripcion, [Validators.required]),
            fechaVenta: new FormControl(car.fechaVenta, Validators.required),
          });
          this.selectedImages[index] = car.partes?this.getImagePath(car.partes): '';
    
          form.get('partes')?.valueChanges.subscribe(parte => {
            this.selectedImages[index] = this.getImagePath(parte);
          });
          return { form, editMode: false };
        })
      }
    })
    
  }

  goToRegister() {
    this.router.navigate(['/register-car']);
  }

  getImagePath(parte: string): string {
    if (!parte) return '';
    return `assets/imgs/${parte.toLowerCase()}.jpg`;
  }

  guardar(index: number) {
    const form = this.carList[index].form;

    if(form.valid){
      const storedData = localStorage.getItem('carDataList');
      let data = storedData?JSON.parse(storedData):[];

      if(!data[index].historialPartes){
        data[index].historialPartes = [];
      }

      const nuevaParte = {
        partes: form.value.partes,
        descripcion: form.value.descripcion,
        fechaVenta: form.value.fechaVenta
      };
      data[index].historialPartes.push(nuevaParte);

      localStorage.setItem('carDataList', JSON.stringify(data));

      Swal.fire({
        icon: 'success',
        title: '¡COMPRA EXITOSA!',
        text: '¿Deseas comprar otra parte para este vehículo?',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar otra',
        cancelButtonText: 'No, volver al perfil',
        reverseButtons: true
      }).then((result) => {
        if(result.isConfirmed){
          form.patchValue({
            partes: '',
            descripcion: '',
            fechaVenta: ''
          });
        } else{
          this.router.navigate(['/profile']);
        }
      });
    }

      // if (this.carList[index].form.valid) {
      //   this.carList[index].editMode = false;
  
      //   const updatedData = this.carList.map(car => car.form.value);
      //   localStorage.setItem('carDataList', JSON.stringify(updatedData));
      //   Swal.fire({
      //     icon: 'success',
      //     title: '¡COMPRA EXITOSA!',
      //     text: '¿Deseas comprar otra parte para este vehículo?',
      //     showCloseButton: true,
      //     confirmButtonText: 'Sí, comprar otra',
      //     cancelButtonText: 'No, gracias por tu compra!',
      //     reverseButtons: true,
      //   }).then((result) => {
      //     if(result.isConfirmed) {
      //       this.carList[index].form.patchValue({
      //         partes: '',
      //         descripcion: '',
      //         fechaVenta: ''
      //     });
      //     }else{
      //       this.router.navigate(['/profile']);
      //     }
      //   });
      // }
    }
}
