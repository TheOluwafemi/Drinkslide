import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.page.html",
  styleUrls: ["./onboarding.page.scss"]
})
export class OnboardingPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() {}
  ngOnInit() {}
}
