import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaisesService } from './servicios/paises-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('anillosDePoder');
  constructor(private paisService: PaisesService) {}

  paises: any[] = [];
  error = '';
  ngOnInit(): void {
    this.cargarPaises();
  }
  cargarPaises() {
    this.paisService.getAllCountries().subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: (err) => {
        this.error = 'Cagamos';
      },
    });
  }
}