export interface FaceRecognitionEntity {
  id: string;
  userId: string;
  deviceId: string;
  faceImageData: Uint8Array | string;
  faceEncodingVector: string;
}
