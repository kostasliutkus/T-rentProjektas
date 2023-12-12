import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private path = environment.apiurl;
  private accessToken: string | null = null;
  private accessTokenKey = 'accessToken';
  setAccessToken(token: string): void {
    this.accessToken = token;
  }
  getAccessToken(): string | null {
    return this.accessToken;
  }
  clearAccessToken(): void {
    this.accessToken = null;
  }
  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem(this.accessTokenKey);

    // Check if the access token exists and is not expired
    // You might have additional checks here, such as token expiration

    return !!accessToken; // Returns true if there is a token, false otherwise
  }
  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }
}
