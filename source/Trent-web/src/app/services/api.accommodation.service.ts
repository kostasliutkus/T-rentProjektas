import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation, CreateAccommodationDto, UpdateAccommodationDto } from '../models/Dtos/AccommodationDTOs';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiAccommodationService {
  private baseUrl = environment.apiurl; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getAllAccommodations(idR: number): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.baseUrl}/Renters/${idR}/Accommodations`);
  }

  getAccommodation(id: number, idR: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${this.baseUrl}/Renters/${idR}/Accommodations/${id}`);
  }

  addAccommodation(accRequest: CreateAccommodationDto, idR: number): Observable<Accommodation> {
    return this.http.post<Accommodation>(`${this.baseUrl}/Renters/${idR}/Accommodations`, accRequest);
  }

  updateAccommodation(id: number, accommodationToUpdate: UpdateAccommodationDto, idR: number): Observable<Accommodation> {
    return this.http.put<Accommodation>(
      `${this.baseUrl}/Renters/${idR}/Accommodations/${id}`,
      accommodationToUpdate
    );
  }
  deleteAccommodation(id: number, idR: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Renters/${idR}/Accommodations/${id}`);
  }
}
