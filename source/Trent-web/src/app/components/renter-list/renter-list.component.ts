import {Component, OnDestroy, OnInit} from '@angular/core';
import { Renter } from '../../models/Renter.model';
import {ApiRenterService} from "../../services/api.renter.service";
import {TokenService} from '../../services/token.service';
import {MatTableModule} from '@angular/material/table';
import{ MatDialog} from "@angular/material/dialog";
import {Router} from  '@angular/router';
import {AddRenterComponent} from "../add-renter/add-renter.component";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-renter-list',
  templateUrl: './renter-list.component.html',
  styleUrls: ['./renter-list.component.scss']
})
export class RenterListComponent implements OnInit,OnDestroy{
  displayedColumns: string[] = ['firstName', 'lastName', 'organization', 'age','email','phone','id'];
  renters: Renter[] = [];
  isAuthenticated: boolean = false;
  private renterAddedSubscription!: Subscription;

  constructor(private tokenService: TokenService,private apiRenterService: ApiRenterService,private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRenters();
    this.tokenService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.renterAddedSubscription = this.apiRenterService.renterAdded().subscribe(() => {
      this.loadRenters();
    });
  }
  private loadRenters(){
    this.apiRenterService.getAllRenters().subscribe((data) => {
      this.renters = data;
    });
  }
  ngOnDestroy(): void {
    this.renterAddedSubscription.unsubscribe();
  }
  createRenter(): void{
    this.openDialog();
  }
  openDialog(): void {
    this.dialog.open(AddRenterComponent,{
      width: '600px',
      height: '700px',
      data: {}
    });
  }
  goToRenter(renter: Renter): void {
    this.router.navigate(['/renter',renter.id])
  }
}
