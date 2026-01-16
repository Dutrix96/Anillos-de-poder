import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-detalle2',
  imports: [ReactiveFormsModule, SelectModule,InputTextModule,TextareaModule,SelectButtonModule,ButtonModule, RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle2 {

  regiones = ['Mordor','Rivendel','La Comarca']
  afinidades = ['Tiene', 'No tiene']



 formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    longevidad: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    nivelCorrupcion: new FormControl(0, [
      Validators.required,
      
    ]),
    regionPrincipal: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    afinidadMagica: new FormControl('', [
      Validators.required
    ])
  
  })

  enviar(){
    alert
  }
 }