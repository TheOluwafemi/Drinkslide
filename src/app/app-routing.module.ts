import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./Auth/auth.guard";
import { LoginGuard } from "./Auth/login.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    canActivate: [LoginGuard],
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    canActivate: [LoginGuard],
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "tabs",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "create-post",
    loadChildren: () =>
      import("./create-post/create-post.module").then(
        (m) => m.CreatePostPageModule
      ),
  },
  {
    path: "post-detail",
    loadChildren: () =>
      import("./Home/post-detail/post-detail.module").then(
        (m) => m.PostDetailPageModule
      ),
  },
  {
    path: "onboarding",
    loadChildren: () =>
      import("./onboarding/onboarding.module").then(
        (m) => m.OnboardingPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
