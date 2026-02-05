import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PersonajeDTO {
  id: number;
  nombre: string;
  raza: string;
  fechaNacimiento: string;
  nivelCorrupcion: number;
  fechaBaja?: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  private baseUrl = environment.apiESDLA;

  constructor(private http: HttpClient) {}

  getAllPersonajes(): Observable<PersonajeDTO[]> {
    return this.http.get<PersonajeDTO[]>(
      `${this.baseUrl}api/listaPersonajes`
    );
  }

  getPersonajeById(id: number): Observable<PersonajeDTO> {
    return this.http.get<PersonajeDTO>(
      `${this.baseUrl}api/obtenerPersonaje/${id}`
    );
  }

  createPersonaje(personaje: PersonajeDTO): Observable<PersonajeDTO> {
    return this.http.post<PersonajeDTO>(
      `${this.baseUrl}api/insertarPersonaje`,
      personaje
    );
  }

  updatePersonaje(id: number, personaje: PersonajeDTO): Observable<PersonajeDTO> {
    return this.http.put<PersonajeDTO>(
      `${this.baseUrl}api/actualizarPersonaje/${id}`,
      personaje
    );
  }

  bajaLogica(id: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}api/bajaLogica/${id}`,
      {}
    );
  }

  bajaFisica(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}api/bajaFisica/${id}`
    );
  }

  reactivar(id: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}api/reactivar/${id}`,
      {}
    );
  }
}