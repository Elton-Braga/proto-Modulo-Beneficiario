import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tela-dashboard',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './tela-dashboard.component.html',
  styleUrl: './tela-dashboard.component.scss',
})
export class TelaDashboardComponent {}
