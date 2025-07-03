import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
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
export class RegisterUserComponent {
  cargando: boolean = false;
  users: Users[] = [];
  userList: {form: FormGroup; editMode: boolean}[] = [];

  constructor(private dialog: MatDialog, private userService: UsersService, public authService: AuthService){}

  ngOnInit(): void{
    this.userService.getUsers().subscribe({
      next: (usuarios: Users[]) => {
        this.userList = usuarios.map((usuarios: any) => ({
          form: new FormGroup({
            nombreCompleto: new FormControl(usuarios.nombreCompleto, Validators.required),
            correo: new FormControl(usuarios.correo, Validators.required),
            contrasena: new FormControl(usuarios.contrasena, Validators.required),
            rolId: new FormControl(usuarios.rolId, Validators.required)
          }),
          editMode: false,
          rolIdObtenido: undefined as number | undefined
        }));
      }, error: (err) => {
        console.error('Error al obtener los usuarios', err);
      }
    })
  }

  nuevoUsuario(){
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.cargando = true;
        console.log('Datos enviados al backend:', result);
        this.userService.addUserNew(result).subscribe({
          next: (data) => {
            this.cargando = false;
            this.users.push(data);
            Swal.fire({
              icon: 'success',
              title: '¡Usuario registrado!',
              text: 'EL usuario se ah registrado con exito'
            });
          },
          error: (err) => {
            this.cargando = false;
            console.error('Error al guardar usuario', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo guardar el usuario, revisa la consola o revisa tu back'
            });
          }, 
        });
      }
    });
  }

  toggleEdit(index: number){
    this.userList[index].editMode = !this.userList[index].editMode;
  }

  saveChanges(index: number){
    const form = this.userList[index].form;

    if(form.valid){
      const usuarioActualizado: Users = form.value;

      this.userService.updateUser(usuarioActualizado).subscribe({
        next: () => {
          this.userList[index].editMode = false;
          Swal.fire('¡Usuario actualizado!', 'Los datos se han actualizado correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
          Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
        }
      });
    }
  }

  deleteUser(index: number){
    const nombre = this.userList[index].form.get('nombreCompleto')?.value;
    console.log('Usuario a eliminar:', nombre);

    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esto eliminara el usuario por completo..',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.deleteUser(nombre).subscribe({
          next: () => {
            this.userList.splice(index, 1);
            Swal.fire('Eliminado', 'El usuario fue eliminado correctamente', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error')
          }
        })
      }
    })
  }

}
