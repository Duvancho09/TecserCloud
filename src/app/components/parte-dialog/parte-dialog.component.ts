import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parte-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './parte-dialog.component.html',
  styleUrl: './parte-dialog.component.css'
})
export class ParteDialogComponent {

  constructor(private dialogRef: MatDialogRef<ParteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  dialogForm = new FormGroup({
    nombreParte: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    cantidadDisponible: new FormControl('', [Validators.required]),
    parteUbicacion: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
  });

  guardar(){
    if(this.dialogForm.valid){
      this.dialogRef.close(this.dialogForm.value);
      
      Swal.fire({
        icon: 'success',
        title: '¡Registro de parte exitoso!',
        text: 'El registro de la parte nueva se agregó al inventario correctamente',
        showCloseButton: true
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos del formulario',
        showCloseButton: true
      });
    }
  }

  cancelar(){
    this.dialogRef.close(null);
  }
}