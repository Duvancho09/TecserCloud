import { Component, Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-dialog-user',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.css'
})
export class DialogUserComponent {

  userForm = new FormGroup ({
    nombreCompleto: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
    rolId: new FormControl('', [Validators.required])
  });

  constructor(private usersService: UsersService, private dialogRef: MatDialogRef<DialogUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  guardar(){
    if(this.userForm.valid){
      this.dialogRef.close(this.userForm.value);

      // Swal.fire({
      //   icon: 'success',
      //   title: '¡Registro de usuario exitoso!',
      //   text: 'El registro del usuario se realizo correctamente',
      //   showCloseButton: true
      // });
    } 
    // else {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Campos incompletos',
    //     text: 'Por favor completa todos los campos del formulario',
    //     showCloseButton: true
    //   });
    // }
  }

  cancelar(){
    this.dialogRef.close();
  }
}