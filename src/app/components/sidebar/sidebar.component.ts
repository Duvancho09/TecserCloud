import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('a', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          stagger(150, [
            animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('profileFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('sidenavSlide', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ])
  ]),
  trigger('logoFadeDown', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-30px)' }),
      animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ])
]
})
export class SidebarComponent {
  menuVisible = false;
  fechaActual = new Date();
  isSmallScreen: boolean = false;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver, public authService: AuthService){
    this.breakpointObserver.observe(['(max-width: 670px)']).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnInit(){
    setTimeout(() => {
      this.menuVisible = true;
    }, 50);
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  exit(){
    Swal.fire({
      icon: 'question',
      title: '¿Seguro que desea salir de la página?',
      showCancelButton: true,
      confirmButtonText: 'Si, salir!',
      cancelButtonText: 'No, seguir en la página'
    }).then((result) => {
      if(result.isConfirmed){
        this.authService.eliminarToken();

        Swal.fire({
          toast: true,
          position: 'center',
          icon: 'success',
          title: 'Sesión cerrada exitosamente',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

        setTimeout(() => {
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        }, 2000);
      }
    });
  }

  canActivate(): boolean{
    const token = sessionStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
