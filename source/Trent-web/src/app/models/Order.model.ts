export interface Order {
  id: number;
  creationDate: Date;
  leaseStartDate: Date;
  leaseEndDate: Date;
  price: number;
  accommodationId: number;
  renterId: number;
  userId: string;
  //user: TrentRestUser;
}
