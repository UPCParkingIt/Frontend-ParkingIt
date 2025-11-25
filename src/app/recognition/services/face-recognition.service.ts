import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {FaceRecognitionEntity} from '../model/face-recognition.entity';

@Injectable({
  providedIn: 'root',
})
export class FaceRecognitionService extends BaseService<FaceRecognitionEntity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/recognitions/fr';
  }
}
