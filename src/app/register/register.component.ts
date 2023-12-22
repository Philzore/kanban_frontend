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
  email = new FormControl('', [Validators.email , Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);

  errorRegister = false;
  registerInProgress = false;
  confirmError = false ;

  constructor(private router: Router, private backendService: BackendService,) { }

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
          return 'You must enter a user name';
        }
        break;
      case 'userPassword':
        if (this.userPassword.hasError('required')) {
          return 'You must enter a password';
        }
        break;
      case 'confirmPassword':
        if (this.confirmPassword.hasError('required')) {
          return 'You must confirm your password';
        } else if (!this.checkPassword()) {
          return 'Passwords are not the same'
        }
        break;
      case 'email':
        if (this.email.hasError('required')) {
          return 'You must enter a email';
        } else if (this.email.hasError('email')) {
          return 'You must enter a email';
        }
        break;
      case 'firstName':
        if (this.firstName.hasError('required')) {
          return 'You must enter your first name';
        }
        break;
      case 'lastName':
        if (this.lastName.hasError('required')) {
          return 'You must enter your last name';
        }
        break;

      default:
        break;
    }
    return ''
  }

  /**
   * navigate to login after register
   * 
   */
  openLogin() {
    this.router.navigateByUrl('');
  }

  /**
   * register new user
   * 
   */
  async register() {
    this.registerInProgress = true;
    if (this.checkPassword()) {
      try {
        let resp: any = await this.backendService.registerNewUser(this.username.value, this.userPassword.value, this.email.value, this.firstName.value, this.lastName.value);
        console.log(resp);
        if (resp.success == true) {
          this.router.navigateByUrl('/');
        } else if (resp.success == false) {
          this.errorRegister = true;
        }

      } catch (err) {
        console.log('error :', err);
      }
    }
    this.registerInProgress = false;
  }

  /**
   * check the password with the confirm password
   * 
   * @returns {bool} - if confirm was correct
   */
  checkPassword() {
    this.confirmError = false ;
    if (this.userPassword.value === this.confirmPassword.value) {
      return true;
    } else {
      this.confirmError = true ;
      return false;
    }

  }
}
