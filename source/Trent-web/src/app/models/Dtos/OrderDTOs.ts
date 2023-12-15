export interface OrderDto {
  id: number;
  creationDate: Date;
  leaseStartDate: Date;
  leaseEndDate: Date;
  price: number;
  accommodationID: number;
  renterID: number;
}
export interface CreateOrderDto {
  creationDate: Date;
  leaseStartDate: Date;
  leaseEndDate: Date;
  price: number;
  accommodationID: number;
  renterID: number;
}
export interface UpdateOrderDto {
  creationDate: Date;
  leaseStartDate: Date;
  leaseEndDate: Date;
  price: number;
  accommodationID: number;
  renterID: number;
}
