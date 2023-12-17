import {Component, Inject, OnInit} from '@angular/core';
import {ApiRenterService} from "../../services/api.renter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Renter} from "../../models/Renter.model";
import {TokenService} from "../../services/token.service";
import {RenterDto, UpdateRenterDto} from "../../models/Dtos/RenterDTOs";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.scss']
})
export class RenterComponent implements OnInit {
  editedRenter!:UpdateRenterDto;
  firstName:string=''
  lastName:string=''
  isAuthorized: boolean=false;
  index!: number;
  renter!: Renter;
  isEditing: boolean = false;
  editForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiRenterService: ApiRenterService,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params=>
    {
      const id = params.get('id');
      if (typeof id === "string") {
        this.index = parseInt(id);
      }
    })
    this.loadRenter(this.index);
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organization: ['', Validators.required],
      age: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

  }
  private loadRenter(renterId: number): void {
    this.apiRenterService.getRenter(renterId).subscribe(
      (renter: Renter) => {
        this.renter = renter;
        this.editedRenter = { ...renter };
        this.firstName=this.editedRenter.firstName;
        this.lastName=this.editedRenter.lastName;
        const currentUserId = this.tokenService.getUserId();
        const role = this.tokenService.getUserRole();
        if(renter.userId == currentUserId || role=='admin')
          this.isAuthorized = true;
        this.editForm.patchValue({
          firstName: renter.firstName,
          lastName: renter.lastName,
          organization: renter.organization,
          age: renter.age,
          email: renter.email,
          phone: renter.phone,
        });
      },
      error => {
        console.error('Error loading Renter', error);
      }
    );
  }
  toggleEditForm(): void {
    this.isEditing = !this.isEditing;
  }
  saveEdit(): void {
    if (this.editForm.valid && this.isAuthorized) {
      const renterUpdateDto = this.editForm.value;
      this.apiRenterService.editRenter(this.renter.id, renterUpdateDto).subscribe(
        updatedRenter => {
          console.log('Renter updated successfully', updatedRenter);
          this.loadRenter(updatedRenter.id);
          this.isEditing = false;
          this.snackBar.open('Renter Updated successfully', 'Dismiss', { duration: 3000});
          this.router.navigate(['/renter-list']);
        },
        error => {
          console.error('Error updating Renter', error);
        }
      );
    }
  }
  openDeleteConfirmation(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { renterId: this.renter.id, renterName: this.renter.firstName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRenter();
      }
    });
  }
  deleteRenter(): void {
    if(this.tokenService.isAuthenticated()){
      this.apiRenterService.deleteRenter(this.renter.id).subscribe(
        () => {
          console.log('Renter deleted successfully');
          this.snackBar.open('Renter deleted successfully', 'Dismiss', { duration: 3000});
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error deleting Renter', error);
        }
      );
    }else{
      console.log('Please log in');
    }
  }
  navigateToAccommodationList() {
    this.router.navigate(['/accommodation-list',this.index]);
  }
}
@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Delete Renter</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete {{ data.renterName }}?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
    </div>
  `,
})
export class DeleteConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
