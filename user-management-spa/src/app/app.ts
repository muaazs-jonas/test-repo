import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './core/components/navbar/navbar';
import { Auth } from './core/services/auth';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.html',
  animations: [
    trigger('navSlideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('250ms ease-out', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class App {
  authService = inject(Auth);
}
