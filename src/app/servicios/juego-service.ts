import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PreguntaDTO {
  id: number;
  pregunta: string;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4: string;
}

export interface PartidaDTO {
  id: number;
  numeroCorrectas: number;
  finPartida: boolean;
  fechaInicio?: string;
  fechaFin?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private baseUrl = environment.apiESDLA;

  constructor(private http: HttpClient) {}

  empezarPartida(): Observable<PartidaDTO> {
    return this.http.get<PartidaDTO>(`${this.baseUrl}api/empezarPartida/`);
  }

  obtenerPregunta(id: number): Observable<PreguntaDTO> {
    return this.http.get<PreguntaDTO>(`${this.baseUrl}api/obtenerPregunta/${id}`);
  }

  comprobarRespuesta(idPregunta: number, respuestaUsuario: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}api/respuesta/${idPregunta}/?respuestaUsuario=${respuestaUsuario}`
    );
  }

  correcta(idPartida: number): Observable<PartidaDTO> {
    return this.http.put<PartidaDTO>(`${this.baseUrl}api/correcta/${idPartida}/`, {});
  }

  finalizar(idPartida: number): Observable<PartidaDTO> {
    return this.http.put<PartidaDTO>(`${this.baseUrl}api/finalizar/${idPartida}/`, {});
  }
}