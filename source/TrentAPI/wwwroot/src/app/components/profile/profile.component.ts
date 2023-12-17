import {Component, Inject, OnInit} from '@angular/core';
import {TokenService} from "../../services/token.service";
import {ApiOrderService} from "../../services/api-order.service";
import {Order} from "../../models/Order.Dto";
import {ApiRenterService} from "../../services/api.renter.service";
import {ApiAccommodationService} from "../../services/api.accommodation.service";
import {forkJoin, of, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string | null = null;
  userRole: string | null = null;
  displayedColumns: string[] = [
    'creationDate', 'leaseStartDate',
    'leaseEndDate','price',
    'accommodationName', 'renterName',
    'edit','delete'];
  orders!: Order[];
  orderCount: number=0;
  constructor(
    private tokenService: TokenService,
    private apiOrderService: ApiOrderService,
    private apiRenterService: ApiRenterService,
    private apiAccommodationService: ApiAccommodationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }
  goToEdit(id:number,idR:number,idA:number): void{
    this.router.navigate(['/edit-order', id, idR, idA]);
  }
  ngOnInit(): void {

    this.userName = this.tokenService.getUserName();
    this.userRole = this.tokenService.getUserRole();
    //this.loadOrders();
    this.loadOrdersWithDetails();
  }
  loadOrdersWithDetails(): void {
    if (this.tokenService.isAuthenticated()) {
      this.apiOrderService.getOrdersByUser().pipe(
        switchMap((orders: Order[]) => {
          const orderDetailsRequests = orders.map(order => {
            const accommodationRequest = order.accommodationID
              ? this.apiAccommodationService.getAccommodation(order.accommodationID,order.renterID)
              : of(null); // jei neranda renterID ar accommodationID
            const renterRequest = order.renterID
              ? this.apiRenterService.getRenter(order.renterID)
              : of(null); //jei neranda renterID
            return forkJoin([accommodationRequest, renterRequest, of(order)]);
          });

          return forkJoin(orderDetailsRequests);
        })
      ).subscribe((orderDetails) => {
        this.orders = orderDetails.map(([accommodation, renter, order]) => ({
          ...order,
          accommodation,
          renter,
        }));
        this.orderCount = this.orders.length;
      });
    }
  }
  openDeleteConfirmation(orderToDelete: Order): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogOrderComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOrder(orderToDelete);
      }
    });
  }
  deleteOrder(orderToDelete: Order): void {
    if(this.tokenService.isAuthenticated()){
      this.apiOrderService.deleteOrder(orderToDelete.id,orderToDelete.renterID,orderToDelete.accommodationID).subscribe(
        () => {
          console.log('Order deleted successfully');
          this.snackBar.open('Order deleted successfully', 'Dismiss', { duration: 3000});
          this.router.navigate(['/']);
        },
        error => {
          this.snackBar.open('Error deleting Order', 'Dismiss', { duration: 3000});
          console.error('Error deleting Order', error);
        }
      );
    }else{
      console.log('Please log in');
      this.snackBar.open('Please log in to continue', 'Dismiss', { duration: 3000});
    }
  }
}
@Component({
  selector: 'app-delete-confirmation-dialog-order',
  template: `
    <h1 mat-dialog-title>Delete Order</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete this Order?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
    </div>
  `,
})
export class DeleteConfirmationDialogOrderComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
