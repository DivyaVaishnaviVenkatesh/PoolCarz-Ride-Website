import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthenticationService {

   private subject = new Subject<any>();

    loginUser() {
       this.subject.next({statusText: 'Logout'});
    }

    logoutUser() {
        this.subject.next({statusText: ''});
    }

    checkUserLoggedIn(): Observable<any> {
        return this.subject.asObservable();
    }
}
