import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  constructor(private menu: MenuController,) { }

  ngOnInit() {}

  openSidebar(): void {
    this.menu.toggle();
  }
}
