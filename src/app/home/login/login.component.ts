import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

//firebase authentication service
import { AuthService } from 'src/app/service/auth/auth.service';
import { isFunction } from 'util';


declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
      private router: Router,
      public auth: AuthService
  ) { }

  ngOnInit() {
    document.body.className = 'hold-transition login-page';
      $(() => {
          $('input').iCheck({
              checkboxClass: 'icheckbox_square-blue',
              radioClass: 'iradio_square-blue',
              increaseArea: '20%' /* optional */
          });
      });
  }

    login() {
        console.log("inside Login");
        this.auth.googleSignin()
        
         
    }

}





