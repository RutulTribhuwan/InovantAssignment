import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  phoneCode: string = '';  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneCode: ['', Validators.required],
      
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password, phoneCode } = this.loginForm.value;
  
      this.authService.login(email, password, phoneCode).subscribe(
        (response) => {
          console.log('Login Success:', response);
          if (response.success && response.status === 200) {
            // Store user data and auth token
            localStorage.setItem('userData', JSON.stringify(response.data));
            localStorage.setItem('authToken', response.token);
  
            // Navigate to My Account page
            this.router.navigate(['/my-account']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        (error) => {
          console.error('Login Error:', error);
          this.errorMessage = `Login failed. Error details: ${error.message}`;
        }
      );
    }
  }
  
  
}
