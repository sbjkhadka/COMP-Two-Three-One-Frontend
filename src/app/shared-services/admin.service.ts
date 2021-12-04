import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ContactUsModel} from '../shared-models/contact-us.model';
import {environmentAngular} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  sendFeedbackOrRequest(contactUsModel: ContactUsModel): Observable<any> {
    return this.http.post<any>(`${environmentAngular.base_url}feedback`, contactUsModel).pipe(catchError(error => {
      return throwError(error);
    }));
  }
}
