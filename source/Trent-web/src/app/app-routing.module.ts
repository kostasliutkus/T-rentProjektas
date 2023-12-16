import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from  './components/login/login.component'
import {RegisterComponent} from "./components/register/register.component";
import {RenterListComponent} from "./components/renter-list/renter-list.component";
import {AccommodationListComponent} from "./components/accommodation-list/accommodation-list.component";
import {RenterComponent} from "./components/renter/renter.component";
import {OrderListComponent} from "./components/order-list/order-list.component";
import {AddOrderComponent} from "./components/add-order/add-order.component";
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'renter-list', component: RenterListComponent },
  { path: 'accommodation-list/:idR', component: AccommodationListComponent },
  { path: 'renter/:id', component: RenterComponent },
  { path: 'order-list/:idR/:idA', component: OrderListComponent },
  { path: 'add-order', component: AddOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
