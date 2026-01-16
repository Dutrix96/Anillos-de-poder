import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detalle',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SelectButtonModule,
    ButtonModule
  ],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {

  // mismas razas que usas en los anillos del buscador
  razas = ['Elfo', 'Enano', 'Humano', 'Maiar', 'Oscuro'];

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    portador: new FormControl('', [Validators.required, Validators.minLength(3)]),
    raza: new FormControl('', [Validators.required]),
    poder: new FormControl('', [Validators.required, Validators.minLength(10)]),
    corrupcion: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
  });

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    console.log('Anillo guardado:', this.formulario.value);
    alert('Anillo guardado');
  }
  
  limpiar() {
      this.formulario.get('nombre')?.setValue('');
      this.formulario.get('portador')?.setValue('');
      this.formulario.get('raza')?.setValue('');
      this.formulario.get('poder')?.setValue('');
      this.formulario.get('corrupcion')?.setValue(50);
    };
}
