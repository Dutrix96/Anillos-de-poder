import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { JuegoStorage, PartidaLocal } from '../servicios/juego-storage';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas implements OnInit {
  total = 0;
  victorias = 0;
  derrotas = 0;

  historial: PartidaLocal[] = [];

  constructor(private storage: JuegoStorage) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.historial = this.storage.leerHistorial();
    this.total = this.historial.length;
    this.victorias = this.historial.filter(p => p.gano).length;
    this.derrotas = this.historial.filter(p => !p.gano).length;
  }

  borrar() {
    this.storage.limpiarHistorial();
    this.cargar();
  }
}