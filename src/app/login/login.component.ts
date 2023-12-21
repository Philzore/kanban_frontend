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


  async login() {
    this.loginInProgress = true;
    try {
      let resp: any = await this.backendService.loginWithUsernameAndPassword(this.username.value, this.userPassword.value);
      if (resp.success == false) {
        this.errorLogin = true;
      } else {
        localStorage.setItem('token', resp['token']);
        console.log(resp);
        this.backendService.currentUser = resp.name;
        this.backendService.loadKanbanChannels();
        this.router.navigateByUrl('/board');
      }
    } catch (err) {
      console.log('error :', err);
    }
    this.loginInProgress = false;
  }

}
