export interface Accommodation {
  id: number;
  location: string;
  instructions: string;
  renterID: number;
}
export interface CreateAccommodationDto {
  location: string;
  instructions: string;
  renterID: number;
}
export interface UpdateAccommodationDto {
  location: string;
  instructions: string;
  renterID: number;
}
