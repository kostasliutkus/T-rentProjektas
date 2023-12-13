import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { Renter} from "../../models/Renter.model";
import {ApiRenterService} from "../../services/api.renter.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateRenterDto} from "../../models/Dtos/RenterDTOs";

@Component({
  selector: 'app-add-renter',
  templateUrl: './add-renter.component.html',
  styleUrls: ['./add-renter.component.scss']
})
export class AddRenterComponent implements OnInit{
  renter!: CreateRenterDto;
  renterForm!: FormGroup;
  constructor(private formBuilder:FormBuilder,private dialogRef:MatDialogRef<AddRenterComponent>,private apiRenterService: ApiRenterService,private _snackBar: MatSnackBar) {}
  closeDialog(): void{
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.renterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organization: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }
  addRenter() {
    if(this.renterForm.valid){
      const RenterDto = this.renterForm.value;
      this.apiRenterService.addRenter(RenterDto).subscribe(
        response => {
          console.log('Renter added successfully', response);
          this.closeDialog();
          this.openSnackBar("Renter added successfully");
        },
        error => {
          console.error('Error adding Renter', error);
        }
      );
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message,"Dismiss",{duration: 3000});
  }
}
