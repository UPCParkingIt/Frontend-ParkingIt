import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {ReservationEntity} from '../../reservations/model/reservation.entity';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService<ReservationEntity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/notifications';
  }

  getAllNotificationsByUserId(userId: string) {
    return this.http.get<ReservationEntity>(`${this.basePath}/users/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
