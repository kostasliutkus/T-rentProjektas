import { Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserDto} from "../../models/User.Dto";
import {ApiLoginService} from "../../services/api.login.service";
import {SuccessfulLoginDto} from "../../models/SuccessfulLogin.Dto";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TokenService} from '../../services/token.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  userName: string = '';
  password: string = '';
  showPassword = false;
  constructor(
    private apiLoginService: ApiLoginService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  loginUser(): void {
    if (this.loginForm.valid) {
      const loginDto = this.loginForm.value;

      this.apiLoginService.login(loginDto).subscribe(
        (successfulLoginDto: SuccessfulLoginDto) => {
          console.log('User logged in successfully:', successfulLoginDto);

          // save access Token
          localStorage.setItem('accessToken', successfulLoginDto.accessToken);
          this.tokenService.setAccessToken('accessToken');
          this.snackBar.open('Login successful', 'Dismiss', { duration: 3000,panelClass:['error-snackbar'] });

          // Reset  form
          this.loginForm.reset();
          this.tokenService.setAuthenticated(true);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error logging in user:', error);
          // Reset  form
          this.loginForm.reset();
          const errorMessage = error.error?.message || 'Password and Username combination does not exist';
          this.snackBar.open(errorMessage, 'Error', { duration: 5000,panelClass:['error-snackbar'] });
        }
      );
    }
  }
}
