import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Accommodation, UpdateAccommodationDto} from "../../models/Dtos/AccommodationDTOs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Renter} from "../../models/Renter.model";
import {ApiAccommodationService} from "../../services/api.accommodation.service";
import {TokenService} from "../../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteConfirmationDialogComponent} from "../renter/renter.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent implements OnInit{
  editForm!: FormGroup;
  editedAccommodation!:UpdateAccommodationDto;
  isEditing: boolean = false;
  accommodation!: Accommodation;
  idR!: number;
  id!: number;
  isAuthorized: boolean=false;
  location: string='';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiAccommodationService: ApiAccommodationService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params=>
    {
      const idr = params.get('idR');
      const id = params.get('id');
      if (typeof id === "string") {
        this.id = parseInt(id);
      }
      if (typeof idr === "string") {
        this.idR = parseInt(idr);
      }
    })
    this.loadAccommodation(this.idR,this.id);
    this.editForm = this.formBuilder.group({
      instructions: ['', Validators.required],
      location: ['', Validators.required],
    });
  }
  private loadAccommodation(idR: number,id: number){
    this.apiAccommodationService.getAccommodation(id,idR).subscribe(
      (accommodation: Accommodation) => {
        this.accommodation = accommodation;
        this.editedAccommodation = { ...accommodation };
        this.location=this.editedAccommodation.location;
        const currentUserId = this.tokenService.getUserId();
        this.isAuthorized = accommodation.userId == currentUserId;
        console.log(accommodation.userId)
        this.editForm.patchValue({
          location: accommodation.location,
          instructions: accommodation.instructions,
        });
      },
      error => {
        console.error('Error loading Accommodation', error);
      }
    );
  }
  openDeleteConfirmation(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogAccommodationComponent, {
      data: { location: this.accommodation.location}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccommodation();
      }
    });
  }
  deleteAccommodation(): void {
    if(this.tokenService.isAuthenticated()){
      this.apiAccommodationService.deleteAccommodation(this.id,this.idR).subscribe(
        () => {
          console.log('Accommodation deleted successfully');
          this.snackBar.open('Accommodation deleted successfully', 'Dismiss', { duration: 3000});
          this.router.navigate(['/']);
        },
        error => {
          console.error('Accommodation deleting Renter', error);
        }
      );
    }else{
      console.log('Please log in');
    }
  }
  toggleEditForm(): void {
    this.isEditing = !this.isEditing;
  }
  saveEdit(): void {
    if (this.editForm.valid && this.isAuthorized) {
      const accommodationToUpdate = this.editForm.value;
      this.apiAccommodationService.updateAccommodation(this.id,accommodationToUpdate,this.idR).subscribe(
        updatedAccommodation => {
          console.log('Renter updated successfully', updatedAccommodation);
          this.loadAccommodation(updatedAccommodation.renterID,updatedAccommodation.id);
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
}
@Component({
  selector: 'app-delete-confirmation-dialog-accommodation',
  template: `
    <h1 mat-dialog-title>Delete Renter</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete {{ data.location }}?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
    </div>
  `,
})
export class DeleteConfirmationDialogAccommodationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

