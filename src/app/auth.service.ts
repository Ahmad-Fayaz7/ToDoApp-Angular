import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private apiUrl: string = 'https://localhost:7220/accounts/login';

  // Login
  login(credentials: { email: string; password: string }) {
    return this.http.post(this.apiUrl, credentials).subscribe(
      (response: any) => {
        localStorage.setItem('jwtToken', response.token); // save the token
        this.router.navigate(['']);
      },
      (err) => {
        console.log('Login failed: ', err);
      }
    );
  }

  // Logout
  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

  // Get token
  getToken() {
    return localStorage.getItem('jwtToken');
  }
  /* 
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwt_decode(token);
      const expirationTime = decoded.exp * 1000;
      return expirationTime < Date.now();
    }
    return true;
  } */

  isAuthenticated(): boolean {
    // return !this.isTokenExpired();
    return !!this.getToken();
  }
}
