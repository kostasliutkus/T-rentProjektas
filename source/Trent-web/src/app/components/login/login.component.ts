import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserDto} from "../../models/User.Dto";
import {ApiLoginService} from "../../services/api.login.service";
import {SuccessfulLoginDto} from "../../models/SuccessfulLogin.Dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  constructor(
    private apiLoginService: ApiLoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}
  loginUser(): void {
    const LoginDto = {
      userName: this.userName,
      password: this.password,
    };
    this.apiLoginService.login(LoginDto).subscribe(
      (SuccessfulLoginDto: SuccessfulLoginDto) => {
        console.log('User registered successfully:', SuccessfulLoginDto);
        this.snackBar.open('login successful', 'Dismiss',{duration: 3000});
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error registering user:', error);

        const errorMessage = error.error?.message || 'An error occurred during registration';
        this.snackBar.open(errorMessage, 'Error', { duration: 5000 });
      }
    );
  }
}
