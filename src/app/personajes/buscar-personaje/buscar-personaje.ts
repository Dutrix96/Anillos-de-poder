import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonajesService } from '../../servicios/personajes-service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-buscar-personaje',
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, ProgressBarModule],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit {
  personajes: any[] = [];
  error = '';

  constructor(private buscarPersonajesService: PersonajesService) {}

  ngOnInit(): void {
    this.buscarPersonajesService.getAllPersonajes().subscribe({
      next: (data) => {
        this.personajes = data;
      },
      error: (err) => {
        this.error = 'Error al cargar personajes';
        console.error(err);
      },
    });
  }
}