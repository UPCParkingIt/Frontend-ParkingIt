import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import { VehicleEntity } from "../model/vehicle.entity";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService extends BaseService<VehicleEntity>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/vehicles';
  }

  getLastVehicle(): Observable<VehicleEntity>{
    return this.http.get<VehicleEntity>(`${this.basePath}${this.resourceEndpoint}/last`, this.httpOptions);
  }
}
