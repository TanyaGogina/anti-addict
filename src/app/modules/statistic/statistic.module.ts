import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StatisticComponent} from "./statistic/statistic.component";
import { IonicModule } from '@ionic/angular';
import { GoogleChartComponent } from 'ng2-google-charts';


const routes: Routes = [
  {
    path: '',
    component: StatisticComponent
  }
];


@NgModule({
  declarations: [StatisticComponent, GoogleChartComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class StatisticModule { }
