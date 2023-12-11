import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  userPassword = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);


  constructor(private router: Router) {}

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.userPassword.hasError('required')) {
      return 'You must enter a value';
    }

    return ''
  }

  openRegister() {
    this.router.navigateByUrl('register');
  }


  login() {

  }

}
