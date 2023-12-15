import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";
import {CreateOrderDto, OrderDto, UpdateOrderDto} from "../models/Dtos/OrderDTOs";
@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {
  private path = environment.apiurl;
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
  getOrders(idR: number, idA: number): Observable<OrderDto[]> {
    const url = `${this.path}Renters/${idR}/Accommodations/${idA}/Orders`;
    return this.httpClient.get<OrderDto[]>(url, { headers: this.getHeaders() });
  }

  getOrder(idR: number, idA: number, orderId: number): Observable<OrderDto> {
    const url = `${this.path}Renters/${idR}/Accommodations/${idA}/Orders/${orderId}`;
    return this.httpClient.get<OrderDto>(url, { headers: this.getHeaders() });
  }

  addOrder(ordRequest: CreateOrderDto, idR: number, idA: number): Observable<OrderDto> {
    const url = `${this.path}Renters/${idR}/Accommodations/${idA}/Orders`;
    return this.httpClient.post<OrderDto>(url, ordRequest, { headers: this.getHeaders() });
  }

  changeOrder(id: number, orderToUpdate: UpdateOrderDto, idR: number, idA: number): Observable<OrderDto> {
    const url = `${this.path}Renters/${idR}/Accommodations/${idA}/Orders/${id}`;
    return this.httpClient.put<OrderDto>(url, orderToUpdate, { headers: this.getHeaders() });
  }

  deleteOrder(id: number, idR: number, idA: number): Observable<void> {
    const url = `${this.path}Renters/${idR}/Accommodations/${idA}/Orders/${id}`;
    return this.httpClient.delete<void>(url, { headers: this.getHeaders() });
  }
}
