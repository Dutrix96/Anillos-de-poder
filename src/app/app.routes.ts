import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import { Detalle2 } from './raza/detalle/detalle';
import { Busqueda2 } from './raza/busqueda/busqueda';
import { BuscarPersonaje } from './personajes/buscar-personaje/buscar-personaje';
import { EditarPersonajeComponent } from './personajes/detalle-personaje/detalle-personaje';
import { Padre } from './modales/padre/padre';
import { PortadoresComponent } from './portadores-component/portadores-component';

export const routes: Routes = [
  { path: 'buscar-anillo', component: Busqueda },
  { path: 'crear-anillo', component: Detalle },
  { path: 'explorar-razas', component: Busqueda2 },
  { path: 'crear-raza', component: Detalle2 },
  { path: 'personajes', component: BuscarPersonaje },
  { path: 'personajes/nuevo', component: EditarPersonajeComponent },
  { path: 'personajes/editar/:id', component: EditarPersonajeComponent },
  { path: '', redirectTo: 'buscar-anillo', pathMatch: 'full' },
  { path: 'padre', component: Padre},
  { path: 'portadores', component: PortadoresComponent}
];