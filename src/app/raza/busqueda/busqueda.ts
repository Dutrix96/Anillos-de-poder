import { Component } from '@angular/core';
import { Razas } from '../../clases/razas';
import { Raza } from '../../interfaces/raza';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-busqueda',
  imports: [InputTextModule,FormsModule,ButtonModule,CommonModule],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda2 {

  raza = new Razas()


  razasFiltrados: Raza[] = this.raza.razas
  campoBusqueda: string = '';
  buscar() {

     const t = this.campoBusqueda.toLowerCase();

    this.razasFiltrados = this.raza.razas.filter(r =>
      r.nombre.toLowerCase().includes(t) ||
      r.longevidad.toLowerCase().includes(t) ||
      r.regionPrincipal.toLowerCase().includes(t)||
      r.afinidadMagica.toString().includes(t)
    );

  }
}
