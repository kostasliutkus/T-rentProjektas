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
import {MatTableModule} from "@angular/material/table";
import { AccommodationListComponent } from './components/accommodation-list/accommodation-list.component';
import { RenterComponent,DeleteConfirmationDialogComponent } from './components/renter/renter.component';
import { AddRenterComponent } from './components/add-renter/add-renter.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ApiOrderService} from "./services/api-order.service";
import {OrderComponent } from './components/order/order.component';
import {AddOrderComponent } from './components/add-order/add-order.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DeleteConfirmationDialogOrderComponent, ProfileComponent} from './components/profile/profile.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import {
  AccommodationComponent,
  DeleteConfirmationDialogAccommodationComponent
} from './components/accommodation/accommodation.component';
@NgModule({
  declarations: [
    AppComponent,
    RenterListComponent,
    RegisterComponent,
    LoginComponent,
    AccommodationListComponent,
    RenterComponent,
    AddRenterComponent,
    DeleteConfirmationDialogComponent,
    OrderComponent,
    AddOrderComponent,
    ProfileComponent,
    DeleteConfirmationDialogOrderComponent,
    EditOrderComponent,
    AccommodationComponent,
    DeleteConfirmationDialogAccommodationComponent
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
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ApiRenterService,ApiLoginService,ApiRegisterService,ApiOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
