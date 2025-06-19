import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';

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

  constructor(private router: Router, private breakpointObserver: BreakpointObserver){
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

}
