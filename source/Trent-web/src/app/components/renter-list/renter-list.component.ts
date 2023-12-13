import { Component, OnInit } from '@angular/core';
import { Renter } from '../../models/Renter.model';
import {ApiRenterService} from "../../services/api.renter.service";
import {TokenService} from '../../services/token.service';
import {MatTableModule} from '@angular/material/table';
import {Router} from  '@angular/router';
@Component({
  selector: 'app-renter-list',
  templateUrl: './renter-list.component.html',
  styleUrls: ['./renter-list.component.scss']
})
export class RenterListComponent implements OnInit{
  displayedColumns: string[] = ['firstName', 'lastName', 'organization', 'age','email','phone'];
  renters: Renter[] = [];

  constructor(private apiRenterService: ApiRenterService,private router: Router) {}

  ngOnInit(): void {
    this.apiRenterService.getAllRenters().subscribe((data) => {
      this.renters = data;
    });
  }
  goToRenter(renter: Renter): void {
    this.router.navigate(['/renter',renter.id])
  }
}
