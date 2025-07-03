import { Component } from '@angular/core';
import { Inventario } from '../../models/inventario.model';
import { InventarioService } from '../../services/inventario.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { ParteDialogComponent } from '../parte-dialog/parte-dialog.component';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  templateUrl: './inventary.component.html',
  styleUrl: './inventary.component.css'
})
export class InventaryComponent {
  displayedColumns: string[] = ['nombreParte', 'descripcion', 'cantidadDisponible', 'parteUbicacion', 'precio', 'acciones'];
  inventarioList = new MatTableDataSource<Inventario>();
  // inventarioList1: Inventario[] = [];
  editIndex: number | null = null;
  nuevoInventario: Inventario = {
    nombreParte: '',
    descripcion: '',
    cantidadDisponible: 0,
    parteUbicacion: '',
    precio: 0
  };
  agregandoParte: boolean = false;

  constructor(private inventarioService: InventarioService, private dialog: MatDialog){}

  ngOnInit(){
    this.obtenerInventario();
  }
  
  obtenerInventario() {
    this.inventarioService.getCompraParte().subscribe({
      next: data => {
        this.inventarioList.data = data,
        console.log('Datos cargados en tabla:', this.inventarioList.data);
      },
      error: err => console.error('Error al cargar inventario', err)
    });
  }
  
  editarParte(parte: Inventario){
    console.log('Editar:', parte);
  }
  
  mostrarFilaNueva() {
    this.editIndex = this.inventarioList.data.length;
    this.nuevoInventario = {
      nombreParte: '',
      descripcion: '',
      cantidadDisponible: 0,
      parteUbicacion: '',
      precio: 0
    };
    this.inventarioList.data = [...this.inventarioList.data, this.nuevoInventario]; 
  this.editIndex = this.inventarioList.data.length - 1;
  }

  abrirDialogoParte(){
    const dialogRef = this.dialog.open(ParteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado devuelto del popup:', result);
      if(result){
        console.log('Datos enviados al backend:', result);
        this.inventarioService.addParte(result).subscribe({
          next: (data) => {
            this.inventarioList.data = [...this.inventarioList.data, data];
            console.log('Nuevo array:', this.inventarioList.data);
            this.inventarioList._updateChangeSubscription();
            Swal.fire({
              icon: 'success',
              title: '¡Parte guardada!',
              text: 'La parte fue añadida exitosamente al inventario'
            });
          },
          error: (err) => {
            console.error('Error al guardar parte', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo guardar la parte, revisa la consola o contacta al adiminstrador'
            });
          }
        });
      }
    });
  }

  guardarParte() {
    this.inventarioService.addParte(this.nuevoInventario).subscribe({
      next: (data) => {
        this.inventarioList.data = [...this.inventarioList.data, data];
        this.agregandoParte = false;
        this.editIndex = null;
        this.nuevoInventario = {
          nombreParte: '',
          descripcion: '',
          cantidadDisponible: 0,
          parteUbicacion: '',
          precio: 0
        };
      },
      error: (err) => {
        console.error('Error al guardar parte', err);
      }
    });
  }
  
  delete() {
    this.editIndex = null;
  }

  mostrarFilaNuevaParte(){
    console.log('Añadiendo nueva parte:');
    this.agregandoParte = true;
    this.editIndex = this.inventarioList.data.length;
    this.nuevoInventario = {
      nombreParte: '',
      descripcion: '',
      cantidadDisponible: 0,
      parteUbicacion: '',
      precio: 0
    };
  }

}