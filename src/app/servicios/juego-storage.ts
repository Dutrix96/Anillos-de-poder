import { Injectable } from '@angular/core';

export interface PartidaLocal {
  idPartida: number;
  fechaIso: string;
  gano: boolean;
  rachaMax: number;
  correctas: number;
  respondidas: number;
}

const SS_KEY = 'partida_activa_lotr';
const LS_KEY = 'historial_partidas_lotr';

@Injectable({ providedIn: 'root' })
export class JuegoStorage {
  guardarActiva(data: any) {
    sessionStorage.setItem(SS_KEY, JSON.stringify(data));
  }

  leerActiva<T>(): T | null {
    const raw = sessionStorage.getItem(SS_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  limpiarActiva() {
    sessionStorage.removeItem(SS_KEY);
  }

  leerHistorial(): PartidaLocal[] {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as PartidaLocal[]) : [];
  }

  guardarEnHistorial(partida: PartidaLocal) {
    const hist = this.leerHistorial();
    hist.unshift(partida);
    localStorage.setItem(LS_KEY, JSON.stringify(hist));
  }

  limpiarHistorial() {
    localStorage.removeItem(LS_KEY);
  }
}