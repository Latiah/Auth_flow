export default class {
  id: string;
  title: string;
  address: string;
  time: number;
  price: number;

  constructor(
    id: string,
    title: string,
    address: string,
    time: number,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.time = time;
    this.price = price;
  }
}
