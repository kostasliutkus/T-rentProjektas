import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from  './components/login/login.component'
import {RegisterComponent} from "./components/register/register.component";
import {RenterListComponent} from "./components/renter-list/renter-list.component";
import {AccommodationListComponent} from "./components/accommodation-list/accommodation-list.component";
import {RenterComponent} from "./components/renter/renter.component";
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'renter-list', component: RenterListComponent },
  { path: 'accommodation-list', component: AccommodationListComponent },
  { path: 'renter/:id', component: RenterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
