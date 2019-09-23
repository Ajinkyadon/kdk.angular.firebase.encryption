import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(
    private router: Router,
    public auth: AuthService
) { }


  login() {
      console.log("inside Login");
      this.auth.googleSignin()
      
       
  }
}
  