import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonajesService, PersonajeDTO } from '../../servicios/personajes-service';

// PrimeNG Imports
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-editar-personaje',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    SelectModule,
    RouterModule,
  ],
  templateUrl: './detalle-personaje.html',
})
export class EditarPersonajeComponent implements OnInit {
  form: FormGroup;
  esEdicion = false;
  idPersonaje: number | null = null;

  razas = [
    { label: 'Elfo', value: 'ELFO' },
    { label: 'Enano', value: 'ENANO' },
    { label: 'Humano', value: 'HUMANO' },
    { label: 'Maiar', value: 'MAIAR' },
    { label: 'Oscuro', value: 'OSCURO' },
  ];

  constructor(
    private fb: FormBuilder,
    private personajesService: PersonajesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      raza: [null, [Validators.required]],
      nivelCorrupcion: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      fechaNacimiento: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.esEdicion = true;
        this.idPersonaje = +id;
        this.cargarPersonaje(this.idPersonaje);
      }
    });
  }

  cargarPersonaje(id: number) {
    this.personajesService.getPersonajeById(id).subscribe({
      next: (data) => {
        this.form.patchValue({
          nombre: data.nombre,
          raza: data.raza,
          nivelCorrupcion: data.nivelCorrupcion,
          fechaNacimiento: data.fechaNacimiento,
        });
      },
      error: (e) => console.error('Error cargando personaje', e),
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const personaje: PersonajeDTO = {
      ...this.form.value,
      id: this.idPersonaje || undefined,
    };

    if (this.esEdicion && this.idPersonaje) {
      this.personajesService.updatePersonaje(this.idPersonaje, personaje).subscribe({
        next: () => {
          alert('Personaje actualizado correctamente');
          this.router.navigate(['/personajes']);
        },
        error: (e) => alert('Error al actualizar: ' + e.message),
      });
    } else {
      this.personajesService.createPersonaje(personaje).subscribe({
        next: () => {
          alert('Personaje creado correctamente');
          this.router.navigate(['/personajes']);
        },
        error: (e) => alert('Error al crear: ' + e.message),
      });
    }
  }
}