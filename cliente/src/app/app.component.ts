import {
  Component,
  ViewChild,
  ElementRef
} from "@angular/core";

import { CommonService } from "./service/common.service";
import { Router } from "@angular/router";

import { AuthenticationService } from "./_services";
import { Usuarios, Role } from "./_models";

@Component({
  selector: "app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent {
  currentUser: Usuarios;

  @ViewChild("addPost") addBtn: ElementRef;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
    if (!localStorage.getItem("loggedInUser")) {
      this.router.navigate(["/"]);
    }
    this.commonService.postEdit_Observable.subscribe(res => {
      this.addBtn.nativeElement.click();
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();

    this.router.navigate(["/login"]);
  }

  admin() {
    this.router.navigate(["/admin"]);
  }

  pagina() {
    alert(this.router.url);
  }

  get comprobar() {
    return this.router.url === "/";
  }
}
