import { Raza } from '../interfaces/raza'
export class Razas {

  razas: Raza[] = [

  {

    id: 1,

    nombre: 'Elfo',

    descripcion: 'Seres inmortales, sabios y estrechamente ligados a la naturaleza.',

    longevidad: 'Inmortal',

    regionPrincipal: 'Rivendel, Lothlórien',

    afinidadMagica: true,

    nivelCorrupcion: 5

  },

  {

    id: 2,

    nombre: 'Enano',

    descripcion: 'Grandes artesanos, resistentes y amantes de la piedra y el metal.',

    longevidad: '250 años',

    regionPrincipal: 'Moria, Erebor',

    afinidadMagica: false,

    nivelCorrupcion: 30

  },

  {

    id: 3,

    nombre: 'Humano',

    descripcion: 'Raza diversa, ambiciosa y fácilmente corruptible.',

    longevidad: '80 años',

    regionPrincipal: 'Gondor, Rohan',

    afinidadMagica: true,

    nivelCorrupcion: 60

  },

  {

    id: 4,

    nombre: 'Maiar',

    descripcion: 'Espíritus inmortales con gran poder, servidores de los Valar.',

    longevidad: 'Inmortal',

    regionPrincipal: 'Valinor, Tierra Media',

    afinidadMagica: true,

    nivelCorrupcion: 20

  },

  {

    id: 5,

    nombre: 'Orco',

    descripcion: 'Criaturas corrompidas, violentas y sometidas a la oscuridad.',

    longevidad: 'Desconocida',

    regionPrincipal: 'Mordor, Isengard',

    afinidadMagica: false,

    nivelCorrupcion: 90

  }

];}
