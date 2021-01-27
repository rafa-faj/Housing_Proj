export default interface Room {
  id: number;
  dateCreated: string;
  userId: number;
  roomType: string;
  price: number;
  negotiable: boolean;
  description: string;
  stayPeriod: string;
  numRooms: number;
  numBathrooms: number; // float
  moveIn: number;
  moveInId: number;
  bookmark: number;
  address: number;
  addressId: number;
}
