import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import { Detalle2 } from './raza/detalle/detalle';
import { Busqueda2 } from './raza/busqueda/busqueda';


export const routes: Routes = [
    { path: 'detalle', component: Detalle },
    { path: 'buscar', component: Busqueda },
    { path: 'detalle2', component: Detalle2},
    { path: 'buscar2', component: Busqueda2},
];
