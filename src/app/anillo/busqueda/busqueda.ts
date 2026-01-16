import { Component } from '@angular/core';
import { Anillos } from '../../clases/anillos';
import { Anillo } from '../../interfaces/anillo';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-busqueda',
  imports: [InputTextModule,FormsModule,ButtonModule,CommonModule,RouterLink],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {

  anillo = new Anillos()


  anillosFiltrados: Anillo[] = this.anillo.anillos
  campoBusqueda: string = '';
  buscar() {

    const t = this.campoBusqueda.toLowerCase();

    this.anillosFiltrados = this.anillo.anillos.filter(a =>
      a.nombre.toLowerCase().includes(t) ||
      a.portador.toLowerCase().includes(t) ||
      a.raza.toLowerCase().includes(t)
    );

  }
}