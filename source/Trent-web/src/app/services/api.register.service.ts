import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { RegisterUserDto } from '../models/Register.User.Dto'
import { UserDto } from '../models/User.Dto';
import { catchError } from 'rxjs/operators';
import {environment} from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ApiRegisterService {
  private path = environment.apiurl;

  constructor(private http: HttpClient) {}

  register(registerUserDto: RegisterUserDto): Observable<UserDto> {
    const url = `${this.path}register`;
    return this.http.post<UserDto>(url, registerUserDto).pipe(
      catchError((error)=> {
        return throwError(error);
      })
    );
  }
}
