import { Injectable, OnDestroy } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform, AlertController } from "@ionic/angular";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { retry, catchError, shareReplay, takeWhile } from "rxjs/operators";
import { throwError, Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService implements OnDestroy {
  token: string;
  profileId: string;
  alive: boolean;
  loginState = new BehaviorSubject(null);
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) {
    this.alive = true;
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get("token").then((res) => {
      if (res) {
        this.token = res;
        this.authenticationState.next(true);
      }
    });
  }

  checkUserId() {
    this.storage.get("profileId").then((res) => {
      if (res) {
        this.profileId = res;
      }
    });
  }

  setToken(token: string) {
    this.storage.set("token", `Token ${token}`);
  }

  setUserId(id: string) {
    this.storage.set("profileId", id);
  }

  _login(username: string, password: string): Observable<any> {
    return this.http
      .post(environment.loginUser, { username: username, password: password })
      .pipe(retry(2), catchError(this.handleError));
  }

  login(username, password) {
    this._login(username, password)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        if (res) {
          if (res.token) {
            this.setToken(res.token);
            this.setUserId(res.id);
            this.loginState.next(res);
            this.authenticationState.next(true);
          } else {
            this.presentErrorAlert(
              "Warning",
              "Check login credentials and try again"
            );
          }
        } else {
          this.presentErrorAlert("Error", "Unable to login user");
        }
      });
  }

  async presentErrorAlert(type: string, msg: string) {
    const alert = await this.alertController.create({
      header: type,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }

  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }

  logout() {
    this.storage.remove("token").then(() => {
      this.authenticationState.next(false);
      this.router.navigateByUrl["/login"];
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
