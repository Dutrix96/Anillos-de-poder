import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  constructor(private http:HttpClient){}

  private baseUrl = environment.baseUrl

  getAllCountries(): Observable <any []> {
    return this.http.get<any []>(`${this.baseUrl}all?fields=name,capital`)
  }
}
