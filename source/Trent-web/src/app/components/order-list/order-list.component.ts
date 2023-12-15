import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../services/token.service";
import {ApiRenterService} from "../../services/api.renter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {OrderDto} from "../../models/Dtos/OrderDTOs";
import {ApiOrderService} from "../../services/api-order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  idR!:number;
  idA!:number;
  constructor(
    private tokenService: TokenService,
    private apiOrderService: ApiOrderService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  displayedColumns: string[] = ['creationDate', 'leaseStartDate', 'leaseEndDate'];
  orders: OrderDto[] = [];
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>
    {
      const idr = params.get('idR');
      const ida = params.get('idA');
      if (typeof idr === "string") {
        this.idR = parseInt(idr);
      }
      if (typeof ida === "string") {
        this.idA = parseInt(ida);
      }
    })
    this.loadOrders(this.idR,this.idA);
    this.tokenService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  private loadOrders(idR:number,idA:number){
    this.apiOrderService.getOrders(idR,idA).subscribe((data) => {
      this.orders = data;
    });
  }
  goToOrder(order: OrderDto){
    throw Error;
  }
}
