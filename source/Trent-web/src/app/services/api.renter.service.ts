import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { environment } from '../environments/environment';
import { Renter } from '../models/Renter.model';
import {CreateRenterDto,UpdateRenterDto} from "../models/Dtos/RenterDTOs";

@Injectable({
  providedIn: 'root'
})
export class ApiRenterService {
  private path = environment.apiurl + 'Renters';
  private renterAddedSubject = new Subject<void>()
  constructor(private httpClient: HttpClient) {}

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
  getRenter(index: number): Observable<Renter> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.get<Renter>(`${this.path}/${index}`, { headers: header, withCredentials: true });
  }

  getAllRenters(): Observable<Renter[]> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.get<Renter[]>(this.path, { headers: header, withCredentials: true });
  }

  addRenter(createRenterDto: CreateRenterDto): Observable<any> {
    const header = this.getHeaders();
    return this.httpClient.post(this.path, createRenterDto, { headers: header });
  }

  editRenter(index: number, updatedRenter: UpdateRenterDto): Observable<any> {
    const header = this.getHeaders();
    return this.httpClient.put(`${this.path}/${index}`, updatedRenter, { headers: header });
  }

  deleteRenter(index: number): Observable<any> {
    const header = this.getHeaders();
    return this.httpClient.delete(`${this.path}/${index}`, { headers: header });
  }

  renterAdded(): Observable<void> {
    return this.renterAddedSubject.asObservable();
  }

  notifyRenterAdded(): void {
    this.renterAddedSubject.next();
  }
}
