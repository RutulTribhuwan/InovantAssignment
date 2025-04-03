import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {

  userData: any;

  constructor(private authService: AuthService, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
     
      const storedData = localStorage.getItem('userData');
      this.userData = storedData ? JSON.parse(storedData) : null;

      if (!this.userData) {
        this.router.navigate(['/login']);
      }
    }
  }

 

  saveProfile() {
     console.log('Profile saved:', this.userData);
  }

  logout() {
    this.authService.logout();
  }

  editProfile() {
    console.log('Editing Profile...');
    
  }

  
  openFAQ() {
    console.log('Opening FAQs...');
  }

  
  deleteAccount() {
    console.log('Deleting Account...');
    
  }




}
