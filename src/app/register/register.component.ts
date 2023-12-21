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

  errorRegister = false ;
  registerInProgress = false ;

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
    this.registerInProgress = true ;
    if (this.checkPassword()) {
      try {
        let resp: any = await this.backendService.registerNewUser(this.username.value, this.userPassword.value, this.email.value, this.firstName.value, this.lastName.value);
        console.log(resp);
        if (resp.success == true) {
          this.router.navigateByUrl('/');
        } else if (resp.success == false) {
          this.errorRegister = true ;
        }
        
      } catch (err) {
        console.log('error :', err);
      }
    }
    this.registerInProgress = false ;
  }

  checkPassword() {
    if (this.userPassword.value === this.confirmPassword.value) {
      return true ;
    } else {
      return false ;
    }
    
  }
}
