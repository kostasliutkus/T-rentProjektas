import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RenterListComponent } from './components/renter-list/renter-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {ApiRenterService} from "./services/api.renter.service";
import {ApiLoginService} from "./services/api.login.service";
import {ApiRegisterService} from "./services/api.register.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
@NgModule({
  declarations: [
    AppComponent,
    RenterListComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule
  ],
  providers: [ApiRenterService,ApiLoginService,ApiRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
