import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { AuthenticationService } from "../Auth/authentication.service";
import { LoadingController } from "@ionic/angular";
import { tap } from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  loading: HTMLIonLoadingElement;

  constructor(
    public authService: AuthenticationService,
    public loadingController: LoadingController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.presentLoading();
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${this.authService.getToken()}`,
      },
    });
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.stopLoading();
          }
        },
        (error) => {
          this.stopLoading();
        }
      )
    );
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please wait...",
      duration: 3000,
      animated: true,
      translucent: true,
      keyboardClose: true,
      spinner: "dots",
    });
    await this.loading.present();
  }

  async stopLoading() {
    await this.loading.dismiss();
  }
}
