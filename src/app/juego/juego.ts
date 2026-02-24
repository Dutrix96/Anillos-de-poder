import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

import { JuegoService, PreguntaDTO } from '../servicios/juego-service';
import { JuegoStorage } from '../servicios/juego-storage';
import { ChangeDetectorRef } from '@angular/core'; //Esto es del gpt

type PartidaActiva = {
    idPartida: number;
    racha: number;
    correctas: number;
    respondidas: number;
    usadas: number[];
    rachaMax: number;
};

@Component({
    selector: 'app-juego',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './juego.html',
    styleUrl: './juego.css',
})
export class Juego implements OnInit {
    private readonly MAX_PREGUNTAS = 30;
    instanceId = Math.floor(Math.random() * 100000);
    private cargandoPregunta = false;

    cargando = false;
    error = '';

    estado: 'idle' | 'jugando' | 'ganada' | 'perdida' = 'idle';

    idPartida: number | null = null;
    pregunta: PreguntaDTO | null = null;

    racha = 0;
    rachaMax = 0;
    correctas = 0;
    respondidas = 0;
    usadas: number[] = [];

    constructor(
        private api: JuegoService,
        private storage: JuegoStorage,
        private cdr: ChangeDetectorRef
    ) { }
    ngOnInit(): void {
        const activa = this.storage.leerActiva<PartidaActiva>();

        if (activa && activa.idPartida) {
            this.idPartida = activa.idPartida;
            this.racha = activa.racha ?? 0;
            this.correctas = activa.correctas ?? 0;
            this.respondidas = activa.respondidas ?? 0;
            this.usadas = activa.usadas ?? [];
            this.rachaMax = activa.rachaMax ?? this.racha;

            this.estado = 'jugando';
            this.pregunta = null;

            this.cargarPregunta();
        }
    }

    empezar() {
        if (this.cargando || this.cargandoPregunta) return;

        if (this.estado === 'jugando' && this.idPartida) {
            this.abandonarComoDerrota();
        }

        this.reiniciarUI();

        this.estado = 'jugando';
        this.pregunta = null;
        this.error = '';

        this.cargando = true;

        this.api.empezarPartida()
            .pipe(finalize(() => (this.cargando = false)))
            .subscribe({
                next: (p) => {
                    this.idPartida = p.id;
                    this.racha = 0;
                    this.correctas = 0;
                    this.respondidas = 0;
                    this.usadas = [];
                    this.rachaMax = 0;

                    this.persistir();
                    this.cargarPregunta(true);
                    this.cdr.markForCheck();
                },
                error: (e) => {
                    console.error(e);
                    this.error = 'Error al empezar la partida';
                    this.estado = 'idle';
                    this.cdr.markForCheck();
                }
            });
    }

    responder(opcion: 1 | 2 | 3 | 4) {

        if (!this.pregunta || !this.idPartida || this.cargando || this.cargandoPregunta) return;

        this.error = '';
        this.cargando = true;

        const idPregunta = this.pregunta.id;

        this.api
            .comprobarRespuesta(idPregunta, opcion)
            .pipe(finalize(() => (this.cargando = false)))
            .subscribe({
                next: (ok) => {
                    this.respondidas++;

                    if (ok) {
                        this.correctas++;
                        this.racha++;
                        this.rachaMax = Math.max(this.rachaMax, this.racha);

                        this.persistir();

                        if (this.racha >= 5) {
                            this.terminar(true);
                            return;
                        }

                        this.cargarPregunta();
                    } else {
                        this.terminar(false);
                    }

                    this.cdr.markForCheck();
                },
                error: (e) => {
                    console.error('ERROR comprobarRespuesta =>', e);
                    this.error = 'Error al comprobar la respuesta';
                    this.cdr.markForCheck();
                }
            });
    }

    reiniciarUI() {
        this.storage.limpiarActiva();
        this.estado = 'idle';
        this.idPartida = null;
        this.pregunta = null;
        this.racha = 0;
        this.rachaMax = 0;
        this.correctas = 0;
        this.respondidas = 0;
        this.usadas = [];
        this.error = '';
        this.cargando = false;
        this.cargandoPregunta = false;
    }

    reiniciarClick() {//Vale la cosa esta en que si reiniciar o vuelves a pulsar empezar partida
                      //ya habiendo iniciado te va a contra como derrota
        if (this.estado === 'jugando' && this.idPartida) {
            this.terminar(false);
            return;
        }

        this.reiniciarUI();
    }

    private cargarPregunta(forzar = false) {

        if (!this.idPartida) {
            return;
        }

        if (this.cargandoPregunta && !forzar) {
            return;
        }

        this.cargandoPregunta = true;
        this.error = '';
        this.cargando = true;

        const id = this.siguienteIdNoRepetido();

        if (id === null) {
            this.error = 'No quedan preguntas disponibles (ya has usado todas).';
            this.cargando = false;
            this.cargandoPregunta = false;
            return;
        }

        this.api.obtenerPregunta(id)
            .pipe(
                finalize(() => {
                    this.cargando = false;
                    this.cargandoPregunta = false;
                })
            )
            .subscribe({
                next: (q) => {
                    this.pregunta = q;
                    this.usadas.push(q.id);
                    this.persistir();

                    this.cdr.markForCheck();
                },
                error: (e) => {
                    console.error('ERROR obtenerPregunta =>', e);
                    this.error = `No se pudo cargar la pregunta (${e.status})`;
                }
            });
    }

    private siguienteIdNoRepetido(): number | null {
        if (this.usadas.length >= this.MAX_PREGUNTAS) return null;

        let intentos = 0;
        while (intentos < 200) {
            const id = Math.floor(Math.random() * this.MAX_PREGUNTAS) + 1;
            if (!this.usadas.includes(id)) return id;
            intentos++;
        }
        return null;
    }

    private terminar(gano: boolean) {

        if (!this.idPartida) return;

        const id = this.idPartida;

        this.api.finalizar(id).subscribe({
            next: () => console.log('FINALIZAR OK'),
            error: (e) => console.error('FINALIZAR ERROR', e),
        });

        this.storage.guardarEnHistorial({
            idPartida: id,
            fechaIso: new Date().toISOString(),
            gano,
            rachaMax: this.rachaMax,
            correctas: this.correctas,
            respondidas: this.respondidas,
        });

        this.storage.limpiarActiva();

        this.estado = gano ? 'ganada' : 'perdida';
        this.pregunta = null;
        this.idPartida = null;

        this.cdr.markForCheck();
    }

    private persistir() {
        if (!this.idPartida) return;

        const data: PartidaActiva = {
            idPartida: this.idPartida,
            racha: this.racha,
            correctas: this.correctas,
            respondidas: this.respondidas,
            usadas: this.usadas,
            rachaMax: this.rachaMax,
        };

        this.storage.guardarActiva(data);
    }

    private abandonarComoDerrota() {//esto lo he metido yo fran porque si no haces trampas
        if (this.estado !== 'jugando' || !this.idPartida) return;

        const id = this.idPartida;

        this.storage.guardarEnHistorial({
            idPartida: id,
            fechaIso: new Date().toISOString(),
            gano: false,
            rachaMax: this.rachaMax,
            correctas: this.correctas,
            respondidas: this.respondidas,
        });

        this.storage.limpiarActiva();

        this.estado = 'perdida';
        this.pregunta = null;
        this.idPartida = null;

        this.cdr.markForCheck();

        this.api.finalizar(id).subscribe({ error: () => { } });
    }
}