import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RenterDto} from "../../models/Dtos/RenterDTOs";
import {ApiRenterService} from "../../services/api.renter.service";
import {OrderDto} from "../../models/Dtos/OrderDTOs";
import {TokenService} from "../../services/token.service";
import {ApiAccommodationService} from "../../services/api.accommodation.service";
import {Accommodation} from "../../models/Dtos/AccommodationDTOs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.scss']
})
export class AddAccommodationComponent {
  accommodationForm!: FormGroup;
  renter!: RenterDto;
  idR!: number;
  constructor(
    private formBuilder: FormBuilder,
    private apiRenterService: ApiRenterService,
    private tokenService: TokenService,
    private apiAccommodationService: ApiAccommodationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params=>
    {
      const id = params.get('idR');
      if (typeof id === "string") {
        this.idR = parseInt(id);
      }
    })
    this.getRenter();
    this.accommodationForm = this.formBuilder.group({
      location: ['',Validators.required],
      instructions: ['',Validators.required],
      renterID: [this.idR,Validators.required]
    })
    this.accommodationForm.patchValue({
      renter: this.renter.id,
    });
    this.accommodationForm.get('renterID')?.disable();
  }
  addAccommodation() {
    if (this.accommodationForm.valid) {
      if (this.tokenService.isAuthenticated()) {
        const CreateAccommodationDTO = this.accommodationForm.value;
        // console.log('FORM:- ',this.accommodationForm.value);
        this.apiAccommodationService.addAccommodation(CreateAccommodationDTO, CreateAccommodationDTO.renterID).subscribe(
          (accommodation: Accommodation) => {
            console.log('Accommodation Created successfully:', accommodation);

            this.snackBar.open('Accommodation Created successfully', 'Dismiss', {duration: 3000});
            // Reset  form
            this.accommodationForm.reset();
            //go back
            this.location.back();
          },
          (error) => {
            console.error('Error creating accommodation:', error);
            // Reset  form
            this.accommodationForm.reset();
            const errorMessage = error.error?.message || 'Error Creating Order';
            this.snackBar.open(errorMessage, 'Error', {duration: 5000});
          }
        );
      }
    }
  }
  private getRenter(){
    this.apiRenterService.getRenter(this.idR).subscribe((data) => {
      this.renter = data;
    });
  }
}
