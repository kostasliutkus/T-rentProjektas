import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {Order} from "../../models/Order.Dto";
import {ApiOrderService} from "../../services/api-order.service";
import {OrderDto, UpdateOrderDto} from "../../models/Dtos/OrderDTOs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  editForm!: FormGroup;
  idR!: number;
  idA!: number;
  id!: number;
  order!: OrderDto;
  editedOrder!: UpdateOrderDto;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private apiOrderService: ApiOrderService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ){};
  ngOnInit(){

    this.route.paramMap.subscribe(params=>
    {
      const idr = params.get('idR');
      const ida = params.get('idA');
      const id = params.get('id');
      if (typeof idr === "string") {
        this.idR = parseInt(idr);
      }
      if (typeof ida === "string") {
        this.idA = parseInt(ida);
      }
      if (typeof id === "string") {
        this.id = parseInt(id);
      }
    })
    this.loadOrder(this.id,this.idR,this.idA);
    this.editForm = this.formBuilder.group({
      creationDate:['',Validators.required],
      leaseStartDate: ['', Validators.required],
      leaseEndDate: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.editForm.get('creationDate')?.disable();
  }
  loadOrder(id:number,idR:number,idA:number){
    if (this.tokenService.isAuthenticated()) {
      this.apiOrderService.getOrder(idR,idA,id).subscribe(
        (order: OrderDto) => {
          this.order = order;
          this.editedOrder = {...order};
          this.editForm.patchValue({
            creationDate: order.creationDate,
            leaseStartDate: order.leaseStartDate,
            leaseEndDate: order.leaseEndDate,
            price: order.price,
          });
        }, error => {
          console.error('Error loading order',error)
        }
      )
    }
  }
  saveEdit(): void {
    if (this.editForm.valid) {

      const orderToUpdateDto = this.editForm.value;
      this.apiOrderService.editOrder(this.id, orderToUpdateDto,this.idR,this.idA).subscribe(
        updatedOrder => {
          console.log('Order updated successfully', updatedOrder);
          this.loadOrder(updatedOrder.id,updatedOrder.renterID,updatedOrder.accommodationID);
          this.snackBar.open('Order updated successfully', 'Dismiss', { duration: 3000});
          this.router.navigate(['/profile']);
        },
        error => {
          this.snackBar.open('Error updating Order', 'Dismiss', { duration: 3000});
          console.error('Error updating Order', error);
        }
      );
    }
  }
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

}
