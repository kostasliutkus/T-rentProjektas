import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessTokenKey = 'accessToken';
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private accessToken: string | null = null;

  getUserId(): string | null {
    const token = this.getToken();

    if (token) {
      const userId = this.decodeToken(token)?.sub;
      return userId || null;
    }
    return null;
  }
  private decodeToken(token: string): any {
    const payloadBase64 = token.split('.')[1];
    const payload = atob(payloadBase64);
    return JSON.parse(payload);
  }
  private getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }
  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
    } else {
      console.error('Token is null');
      return null;
    }
  }
  getUserRole(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } else {
      console.error('Token is null');
      return null;
    }
  }
  getDecodedUserId(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub;

    }else {
      console.error('Token is null');
      return '';
    }
  }
  setAccessToken(token: string): void {
    this.accessToken = token;
  }
  getAccessToken(): string | null {
    return this.accessToken;
  }
  clearAccessToken(): void {
    this.accessToken = null;
  }
  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

}
