import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonajesService } from '../../servicios/personajes-service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-buscar-personaje',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ProgressBarModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
  providers: [ConfirmationService, MessageService],
})
export class BuscarPersonaje implements OnInit {
  personajes: any[] = [];
  error = '';

  constructor(
    private personajesService: PersonajesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    this.personajesService.getAllPersonajes().subscribe({
      next: (data) => {
        this.personajes = data;
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar personajes';
      },
    });
  }

  confirmarBajaFisica(personaje: any): void {
    this.confirmationService.confirm({
      message:
        'Se va a borrar de forma definitiva el registro ¿Estás seguro que deseas borrarlo?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.personajesService.bajaFisica(personaje.id).subscribe({
          next: () => {
            this.personajes = this.personajes.filter((p) => p.id !== personaje.id);

            this.messageService.add({
              severity: 'success',
              summary: 'OK',
              detail: 'Personaje borrado definitivamente.',
              life: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'No se puede borrar',
              detail: 'No se puede borrar ese personaje porque es portador.',
              life: 4000,
            });
          },
        });
      },
    });
  }

  confirmarBajaLogica(personaje: any): void {
    this.confirmationService.confirm({
      message: 'Se va a dar de baja el personaje ¿Estás seguro?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.personajesService.bajaLogica(personaje.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'OK',
              detail: 'Se ha dado de baja correctamente.',
              life: 3000,
            });
            this.cargarPersonajes();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo dar de baja el personaje.',
              life: 4000,
            });
          },
        });
      },
    });
  }

  confirmarReactivar(personaje: any): void {
    this.confirmationService.confirm({
      message: '¿Deseas reactivar el personaje?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.personajesService.reactivar(personaje.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'OK',
              detail: 'Personaje reactivado correctamente.',
              life: 3000,
            });
            this.cargarPersonajes();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo reactivar el personaje.',
              life: 4000,
            });
          },
        });
      },
    });
  }
}