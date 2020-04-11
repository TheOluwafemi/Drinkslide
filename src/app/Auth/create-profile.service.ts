import { Injectable, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { retry, catchError, takeWhile } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CreateProfileService implements OnDestroy {
  alive: boolean;
  registerState = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.alive = true;
  }

  _register(
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    return this.http
      .post(environment.registerUser, {
        email: email,
        name: username,
        password: password,
      })
      .pipe(retry(2));
  }

  register(email, username, password) {
    this._register(email, username, password)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        if (res) {
          this.registerState.next(res);
        } else {
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
