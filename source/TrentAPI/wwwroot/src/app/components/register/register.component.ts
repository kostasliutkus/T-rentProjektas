import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiRegisterService } from '../../services/api.register.service'
import { RegisterUserDto } from '../../models/Register.User.Dto';
import { UserDto } from '../../models/User.Dto';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  constructor(
    private apiRegisterService: ApiRegisterService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ){}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    })
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  registerUser(): void {
    if (this.registerForm.valid) {
      if (this.registerForm.get('password')?.value !== this.registerForm.get('passwordConfirmation')?.value) {
        console.error('Passwords do not match');
        this.snackBar.open('Passwords do not match', 'Dismiss', {duration: 3000});
        return;
      }

      const registerUserDto = {
        userName: this.registerForm.get('userName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };
      this.apiRegisterService.register(registerUserDto).subscribe(
        (userDto: UserDto) => {
          console.log('User registered successfully:', userDto);
          this.snackBar.open('Registration successful', 'Dismiss', {duration: 3000});
          // Reset  form
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
          // Reset  form
          this.registerForm.reset();
          const errorMessage = error.error?.message || 'An error occurred during registration';
          this.snackBar.open(errorMessage, 'Error', {duration: 5000});
        }
      );
    }
  }
}
