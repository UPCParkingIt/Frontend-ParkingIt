import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import { VehicleEntity } from "../model/vehicle.entity";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VehicleService extends BaseService<VehicleEntity>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/vehicles';
  }

  getLastVehicle(){
    return this.http.get<VehicleEntity>(`${this.basePath}/last`, this.httpOptions);
  }
}
