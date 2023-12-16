import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from  './components/login/login.component'
import {RegisterComponent} from "./components/register/register.component";
import {RenterListComponent} from "./components/renter-list/renter-list.component";
import {AccommodationListComponent} from "./components/accommodation-list/accommodation-list.component";
import {RenterComponent} from "./components/renter/renter.component";
import {AddOrderComponent} from "./components/add-order/add-order.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {EditOrderComponent} from "./components/edit-order/edit-order.component";
import {AccommodationComponent} from "./components/accommodation/accommodation.component";
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'renter-list', component: RenterListComponent },
  { path: 'accommodation-list/:idR', component: AccommodationListComponent },
  { path: 'renter/:id', component: RenterComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-order/:id/:idR/:idA', component: EditOrderComponent },
  { path: 'accommodation/:idR/:id', component: AccommodationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
