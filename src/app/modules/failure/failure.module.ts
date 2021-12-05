import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FailureComponent} from "./failure/failure.component";
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: FailureComponent
  }
];


@NgModule({
  declarations: [FailureComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class FailureModule { }
