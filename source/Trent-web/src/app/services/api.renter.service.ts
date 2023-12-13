import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Renter } from '../models/Renter.model';
import {CreateRenterDto} from "../models/Dtos/RenterDTOs";

@Injectable({
  providedIn: 'root'
})
export class ApiRenterService {
  private path = environment.apiurl + 'Renters';
  constructor(private httpClient: HttpClient) {}

  getRenter(index: number): Observable<Renter> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.get<Renter>(`${this.path}/${index}`, { headers: header, withCredentials: true });
  }

  getAllRenters(): Observable<Renter[]> {
    console.log(this.path)
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.get<Renter[]>(this.path, { headers: header, withCredentials: true });
  }

  addRenter(createRenterDto: CreateRenterDto): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path, createRenterDto, { headers: header });
  }

  editRenter(index: number, updatedRenter: Renter): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put(`${this.path}/${index}`, updatedRenter, { headers: header });
  }

  deleteRenter(index: number): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.delete(`${this.path}/${index}`, { headers: header });
  }
}
