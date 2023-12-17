import {Component, OnInit} from '@angular/core';
import {Accommodation} from '../../models/Dtos/AccommodationDTOs';
import {ApiAccommodationService} from "../../services/api.accommodation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit{
  displayedColumns: string[] = ['location', 'instructions'];
  accommodations: Accommodation[] = [];
  isAuthenticated: boolean = false;
  idR!: number;
  constructor(
    private apiAccommodationService: ApiAccommodationService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.tokenService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.route.paramMap.subscribe(params=>
    {
      const id = params.get('idR');
      if (typeof id === "string") {
        this.idR = parseInt(id);

      }
    })
    this.LoadAccommodations(this.idR);
  }
  private LoadAccommodations(idR: number){
    if(this.tokenService.isAuthenticated())
    this.apiAccommodationService.getAllAccommodations(idR).subscribe((data) => {
      this.accommodations = data;
    });

  }
  goToAccommodation(accommodation: Accommodation){
    this.router.navigate(['/accommodation',accommodation.renterID,accommodation.id]);
  }
  createAccommodation(){
    this.router.navigate(['/create-accommodation',this.idR]);
  }
}
