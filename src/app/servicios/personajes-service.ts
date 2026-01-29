import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
export interface PersonajeDTO {
  id: number;
  nombre: string;
  raza: string;
  fechaNacimiento: string;
  nivelCorrupcion: number;
}
@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiESDLA;

  getAllPersonajes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}api/listaPersonajes`);
  }

  getPersonajeById(id: number): Observable<PersonajeDTO> {
    return this.http.get<PersonajeDTO>(`${this.baseUrl}api/obtenerPersonaje/${id}`);
  }

  createPersonaje(personaje: PersonajeDTO): Observable<PersonajeDTO> {
    return this.http.post<PersonajeDTO>(`${this.baseUrl}api/insertarPersonaje`, personaje);
  }

  updatePersonaje(id: number, personaje: PersonajeDTO): Observable<PersonajeDTO> {
    return this.http.put<PersonajeDTO>(`${this.baseUrl}api/actualizarPersonaje/${id}`, personaje);
  }
}