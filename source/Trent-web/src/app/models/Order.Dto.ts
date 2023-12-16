export interface Order {
  id: number;
  creationDate: Date;
  leaseStartDate: Date;
  leaseEndDate: Date;
  price: number;
  accommodationID: number;
  renterID: number;
  userId: string;
}
