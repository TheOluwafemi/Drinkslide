import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../Auth/authentication.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AlertController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.authService.checkToken();

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  onLogin() {
    const username = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.authService.login(username, password);
    this.authService.loginState.subscribe((res) => {
      if (res) {
        this.authService.setToken(res["token"]);
        this.router.navigateByUrl("/tabs/home");
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
}
