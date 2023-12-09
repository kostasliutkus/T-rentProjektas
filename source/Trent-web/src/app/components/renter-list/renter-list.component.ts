import { Component, OnInit } from '@angular/core';
import { Renter } from '../../models/Renter.model';
import {ApiRenterService} from "../../services/api.renter.service";
@Component({
  selector: 'app-renter-list',
  templateUrl: './renter-list.component.html',
  styleUrls: ['./renter-list.component.scss']
})
export class RenterListComponent implements OnInit{
  renters: Renter[] = [];

  constructor(private apiRenterService: ApiRenterService) {}

  ngOnInit(): void {
    this.apiRenterService.getAllRenters().subscribe((data) => {
      this.renters = data;
    });
  }
}
