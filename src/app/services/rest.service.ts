import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { Ride } from '../book-ride/Ride';
import { Login } from '../login/Login';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}

  getAllRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>('../../assets/rides.json')
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllUsers(): Observable<Login[]> {
    return this.http.get<Login[]>('../../assets/users.json')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return throwError(errMsg);
  }

}
