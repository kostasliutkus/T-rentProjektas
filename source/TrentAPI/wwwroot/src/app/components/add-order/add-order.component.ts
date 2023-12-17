import {Component, OnInit} from '@angular/core';
import {FormsModule, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {ApiOrderService} from "../../services/api-order.service";
import {OrderDto} from "../../models/Dtos/OrderDTOs";
import {RenterDto} from "../../models/Dtos/RenterDTOs";
import {ApiRenterService} from "../../services/api.renter.service";
import {Accommodation} from "../../models/Dtos/AccommodationDTOs";
import {ApiAccommodationService} from "../../services/api.accommodation.service";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit{
  orderForm!: FormGroup;
  renters!: RenterDto[];
  accommodations!: Accommodation[];
  showAccommodations: boolean=false;
  idR!: number;
  idA!: number;
  tomorrow!: Date;
  endDate!: Date;
  ngOnInit(){
    this.setTomorrow();
    this.loadRenters();
    this.setEndDate();
    this.orderForm = this.formBuilder.group({
      leaseStartDate: ['',Validators.required],
      leaseEndDate: ['',Validators.required],
      price: ['',Validators.required],
      renterID: ['', Validators.required],
      accommodationID: ['',Validators.required]
    })
  }
  constructor(
    private apiOrderService: ApiOrderService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private apiRenterService: ApiRenterService,
    private apiAccommodationService: ApiAccommodationService
  ){}
  addOrder() {
    if (this.orderForm.valid) {
      if (this.tokenService.isAuthenticated()) {
        const CreateOrderDto = this.orderForm.value;
        // console.log('FORM:- ',this.orderForm.value);
        this.apiOrderService.addOrder(CreateOrderDto, CreateOrderDto.renterID, CreateOrderDto.accommodationID).subscribe(
          (orderDto: OrderDto) => {
            console.log('Order Created successfully:', orderDto);

            this.snackBar.open('Order Created successfully', 'Dismiss', {duration: 3000});
            // Reset  form
            this.orderForm.reset();
            //go to profile
            this.router.navigate(['profile']);
          },
          (error) => {
            console.error('Error creating order:', error);
            // Reset  form
            this.orderForm.reset();
            const errorMessage = error.error?.message || 'Error Creating Order';
            this.snackBar.open(errorMessage, 'Error', {duration: 5000});
          }
        );
      }
    }
  }
  private loadRenters(){
    this.apiRenterService.getAllRenters().subscribe((data) => {
      this.renters = data;
    });
  }
  private setTomorrow() {
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }
  private setEndDate(){
    this.endDate = new Date();
    this.endDate.setDate(this.tomorrow.getDate() + 2)
  }
  onRenterSelected(renterId: number) {
    if (renterId) {
      this.showAccommodations = true;
      this.loadAccommodations(renterId);
    } else {
      this.showAccommodations = false;
      // may reset list here
    }
  }
  private loadAccommodations(idR: number){
    this.apiAccommodationService.getAllAccommodations(idR).subscribe((data) => {
      this.accommodations = data;
    });
  }

}
