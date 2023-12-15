import {Component, OnInit} from '@angular/core';
import {Accommodation} from '../../models/Dtos/AccommodationDTOs';
import {ApiAccommodationService} from "../../services/api.accommodation.service";

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit{
  displayedColumns: string[] = ['location', 'instructions'];
  accommodations: Accommodation[] = [];

  constructor(private apiAccommodationService: ApiAccommodationService) {}

  ngOnInit(): void {
    this.LoadAccommodations(4);
  }
  private LoadAccommodations(idR: number){
    this.apiAccommodationService.getAllAccommodations(idR).subscribe((data) => {
      this.accommodations = data;
    });
  }
}
