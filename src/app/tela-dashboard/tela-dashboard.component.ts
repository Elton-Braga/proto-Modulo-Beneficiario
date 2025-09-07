//import { NgFor } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tela-dashboard',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './tela-dashboard.component.html',
  styleUrls: ['./tela-dashboard.component.scss'],
})
export class TelaDashboardComponent implements AfterViewInit {
  ngOnInit() {}
  ngAfterViewInit(): void {}
}
