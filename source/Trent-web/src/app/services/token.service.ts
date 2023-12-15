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
  private getUserRole(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken && decodedToken.role) {
        return decodedToken.role;
      } else {
        console.error('Role not found in the decoded token');
        return null;
      }
    } else {
      console.error('Token is null');
      return null;
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
  isTrentUser(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'TrentUser';
  }
  isAdmin(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'Admin';
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
  isAuthorized(): boolean {
    const token = this.getToken();
    // Check if token is present, not expired, and meets your authorization criteria
    return !!token && !this.jwtHelper.isTokenExpired(token) && this.meetsAuthorizationCriteria(token);
  }

  private meetsAuthorizationCriteria(token: string): boolean {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role === 'Admin';
  }
}
