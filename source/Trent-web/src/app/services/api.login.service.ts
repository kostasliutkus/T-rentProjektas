import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from "../environments/environment";
import {SuccessfulLoginDto} from "../models/SuccessfulLogin.Dto";
import {LoginDto} from "../models/Login.Dto";
import {catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {
  private path = environment.apiurl;

  constructor(private http: HttpClient) {}

  login(loginDto: LoginDto): Observable<SuccessfulLoginDto> {
    const url = `${this.path}login`;
    return this.http.post<SuccessfulLoginDto>(url, loginDto).pipe(
      catchError((error)=> {
        return throwError(error);
      })
    );
  }
}
