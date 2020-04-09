import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../Home/home.module").then((m) => m.HomeModule),
          },
        ],
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../profile/profile.module").then(
                (m) => m.ProfilePageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
