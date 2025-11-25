export interface LpRecognitionEntity {
  id: string;
  userId: string;
  deviceId: string;
  vehicleId: string;
  plateImageData: Uint8Array | string;
}
