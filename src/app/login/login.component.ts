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
  
  
  constructor(
    private router: Router,
    private backendService: BackendService,
    ) {}

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
    try {
      let resp:any = await this.backendService.loginWithUsernameAndPassword(this.username.value, this.userPassword.value);
      localStorage.setItem('token', resp['token']);
      this.backendService.currentUser = resp.name ;
      this.backendService.loadKanbanChannels();
      this.router.navigateByUrl('/board');
    } catch(err) {
      console.log('error :' , err) ;
    }
  }

}
