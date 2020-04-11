import { Component, OnInit } from "@angular/core";
import { CreateProfileService } from "../Auth/create-profile.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {
  AlertController,
  ToastController,
  MenuController,
} from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  email: string;
  username: string;
  password: string;
  registerForm: FormGroup;

  constructor(
    private createProfileService: CreateProfileService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  async onRegister() {
    const username = this.registerForm.controls.name.value;
    const password = this.registerForm.controls.password.value;
    const email = this.registerForm.controls.email.value;

    this.createProfileService.register(email, username, password);
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
