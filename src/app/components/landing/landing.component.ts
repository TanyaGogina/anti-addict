import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {UserService} from "../../services/user.service";
import {AddictionsService} from "../../services/addictions.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  constructor(private menu: MenuController, public userService: UserService, public readonly addictionsService: AddictionsService) { }

  ngOnInit() {}

  openSidebar(): void {
    this.menu.toggle();
  }
}
