import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = new FormControl('', [Validators.required]);
  userPassword = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);


  constructor(private router: Router, private backendService: BackendService,) { }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.userPassword.hasError('required')) {
      return 'You must enter a value';
    }

    return ''
  }

  openLogin() {
    this.router.navigateByUrl('');
  }

  async register() {
    if (this.checkPassword()) {
      try {
        let resp: any = await this.backendService.registerNewUser(this.username.value, this.userPassword.value, this.email.value, this.firstName.value, this.lastName.value);
        this.router.navigateByUrl('/');
      } catch (err) {
        console.log('error :', err);
      }
    }
  }

  checkPassword() {
    if (this.userPassword.value === this.confirmPassword.value) {
      return true ;
    } else {
      return false ;
    }
    
  }
}
