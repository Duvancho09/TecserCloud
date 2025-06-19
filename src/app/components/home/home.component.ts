import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInHeader', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('700ms ease-out')
      ])
    ]),
    trigger('fadeInSub', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('900ms 200ms ease-out')
      ])
    ]),
    trigger('fadeInStagger', [
      transition('* => *', [
        query('.buble-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(150, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }) 
      ])
    ])
  ]
})
export class HomeComponent {
  currentIndex = 0;

  filteredImages = [
    { name: 'CHEVROLET', imagen: 'assets/imgs/chevrolet.jpg' },
    { name: 'MAZDA', imagen: 'assets/imgs/mazda.png' },
    { name: 'RENAULT', imagen: 'assets/imgs/renault.png' },
  ]

  constructor(private router: Router){}

  ngAfterViewInit(): void {
  const scrollEl = document.querySelector('.partes-carousel') as HTMLElement;
  if (scrollEl) {
    setInterval(() => {
      if (scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth - 10) {
        scrollEl.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollEl.scrollBy({ left: 220, behavior: 'smooth' });
      }
    }, 3000);
  }
}

  seleccionar(){
    this.router.navigate(['/register-car'])
  }

  comprarParte(){
    this.router.navigate(['/buyparts'])
  }

}