import { Component, OnInit } from "@angular/core";
import { CreateProfileService } from "../Auth/create-profile.service";
import { Router } from "@angular/router";
import {
  AlertController,
  ToastController,
  MenuController,
} from "@ionic/angular";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  email: string;
  username: string;
  password: string;

  constructor(
    private createProfileService: CreateProfileService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private menuController: MenuController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  async onRegister() {
    this.createProfileService.register(
      this.email,
      this.username,
      this.password
    );
    this.createProfileService.registerState.subscribe((res) => {
      if (res) {
        this.presentToast();
        this.router.navigateByUrl("/login");
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Your profile has been created",
      duration: 2000,
    });
    toast.present();
  }
}
