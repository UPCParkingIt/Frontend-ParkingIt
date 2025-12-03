export interface ReservationEntity {
  id: string,
  reservationDate: Date,
  userId: string,
  location: string,
  accessCode: string,
  expirationDate: Date,
  hours: number,
}
