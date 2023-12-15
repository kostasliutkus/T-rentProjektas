import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation, CreateAccommodationDto, UpdateAccommodationDto } from '../models/Dtos/AccommodationDTOs';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiAccommodationService {
  private path = environment.apiurl;

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders{
    const accessToken =localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Please log in to access this action');
    }
    return new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  }

  getAllAccommodations(idR: number): Observable<Accommodation[]> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get<Accommodation[]>(`${this.path}Renters/${idR}/Accommodations`, { headers: header, withCredentials: true });
  }

  getAccommodation(id: number, idR: number): Observable<Accommodation> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get<Accommodation>(`${this.path}Renters/${idR}/Accommodations/${id}`, { headers: header, withCredentials: true });
  }

  addAccommodation(accRequest: CreateAccommodationDto, idR: number): Observable<Accommodation> {
    const header = this.getHeaders();
    return this.http.post<Accommodation>(`${this.path}Renters/${idR}/Accommodations`, accRequest,{ headers: header, withCredentials: true });
  }

  updateAccommodation(id: number, accommodationToUpdate: UpdateAccommodationDto, idR: number): Observable<Accommodation> {
    const header = this.getHeaders();
    return this.http.put<Accommodation>(
      `${this.path}Renters/${idR}/Accommodations/${id}`,
      accommodationToUpdate, { headers: header, withCredentials: true }
    );
  }
  deleteAccommodation(id: number, idR: number): Observable<void> {
    const header = this.getHeaders();
    return this.http.delete<void>(`${this.path}Renters/${idR}/Accommodations/${id}`, { headers: header, withCredentials: true });
  }
}
