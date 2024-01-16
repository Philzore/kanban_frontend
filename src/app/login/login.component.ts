import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  userPassword = new FormControl('', [Validators.required]);
  loginInProgress = false;
  errorLogin = false;

  constructor(
    private router: Router,
    private backendService: BackendService,
  ) { }

  /**
   * error message for form field
   * 
   * @param form {string} - for switch case
   * @returns {string} - error message
   */
  getErrorMessage(form) {
    switch (form) {
      case 'username':
        if (this.username.hasError('required')) {
          return 'You must enter a username';
        }
        break;
      case 'userPassword':
        if (this.userPassword.hasError('required')) {
          return 'You must enter a password';
        }
        break;

      default:
        break;
    }
    return ''
  }

  /**
   * navigate to register url
   * 
   */
  openRegister() {
    this.router.navigateByUrl('register');
  }

  /**
   * login the user and save token and name in localStorage
   * 
   */
  async login() {
    this.loginInProgress = true;
    try {
      let resp: any = await this.backendService.loginWithUsernameAndPassword(this.username.value, this.userPassword.value);
      if (resp.success == false) {
        this.errorLogin = true;
      } else {
        localStorage.setItem('token', resp['token']);
        localStorage.setItem('user', resp['name']);
        
        this.backendService.currentUser = resp.name;
        this.backendService.loadKanbanChannels();
        this.router.navigateByUrl('/board');
      }
    } catch (err) {
      
    }
    this.loginInProgress = false;
  }

}
