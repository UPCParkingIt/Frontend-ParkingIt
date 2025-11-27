import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecognitionProcessService extends BaseService<boolean>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/recognitions/process';
  }

  getProcessStatus(){
    return this.http.get<boolean>(`${this.basePath}${this.resourceEndpoint}/status`, this.httpOptions);
  }

  activateProcess(){
    return this.http.post(`${this.basePath}${this.resourceEndpoint}/activate`, {}, this.httpOptions)
  }

  deactivateProcess(){
    return this.http.delete(`${this.basePath}${this.resourceEndpoint}/deactivate`, this.httpOptions);
  }
}
