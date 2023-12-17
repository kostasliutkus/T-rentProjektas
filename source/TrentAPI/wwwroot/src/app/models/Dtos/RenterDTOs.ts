export interface RenterDto {
  id: number;
  firstName: string;
  lastName: string;
  organization: string;
  age: number;
  email: string;
  phone: string;
}
export interface CreateRenterDto {
  firstName: string;
  lastName: string;
  organization: string;
  age: number;
  email: string;
  phone: string;
}
export interface UpdateRenterDto {
  firstName: string;
  lastName: string;
  organization: string;
  age: number;
  email: string;
  phone: string;
}

