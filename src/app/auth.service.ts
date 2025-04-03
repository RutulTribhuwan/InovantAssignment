import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://dev.myemprove.com/api/ver3api/student-login?lang=en&store=KW';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, phoneCode: string): Observable<any> {
    const requestBody = {
      email,
      password,
      phone_code: phoneCode, 
      device_type: 'W',
      device_token: '',
      device_model: '',
      app_version: '',
      os_version: '',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, requestBody, { headers });
  }


  
getUserData() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}


  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
