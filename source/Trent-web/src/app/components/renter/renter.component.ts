import {Component, OnInit} from '@angular/core';
import {ApiRenterService} from "../../services/api.renter.service";
import {ActivatedRoute,Router} from "@angular/router";
import {Renter} from "../../models/Renter.model";
@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.scss']
})
export class RenterComponent implements OnInit {
  constructor(private apiRenterService: ApiRenterService,private route: ActivatedRoute,private router: Router) {}
  index!: number;
  renter!: Renter;
  ngOnInit() {
    this.route.paramMap.subscribe(params=>
    {
      const id = params.get('id');
      if (typeof id === "string") {
        this.index = parseInt(id);
      }
    })
    this.apiRenterService.getRenter(this.index).subscribe((data) => {
      this.renter = data;
    })
  }
}
