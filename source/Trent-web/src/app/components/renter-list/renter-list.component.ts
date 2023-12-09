import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Renter } from '../../models/Renter.model';
@Component({
  selector: 'app-renter-list',
  templateUrl: './renter-list.component.html',
  styleUrls: ['./renter-list.component.scss']
})
export class RenterListComponent implements OnInit{
  renters: Renter[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllRenters().subscribe((data) => {
      this.renters = data;
    });
  }
}
