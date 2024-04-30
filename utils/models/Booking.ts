import ParkingSpot from "./ParkingSpot";

export default class {
  id: string;
  price: number;
  date: string;
  hours: number;
  total: number = 0;
  parkingSpot: ParkingSpot | null;

  constructor(
    id: string,
    price: number,
    date: string,
    hours: number,
    parkingSpot: ParkingSpot | null
  ) {
    this.id = id;
    this.price = price;
    this.date = date;
    this.hours = hours;
    this.total = price * hours;
    this.parkingSpot = parkingSpot;
  }
}
