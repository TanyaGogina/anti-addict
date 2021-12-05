import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ReminderComponent} from "./reminder/reminder.component";
import {IonicModule} from "@ionic/angular";


const routes: Routes = [
  {
    path: '',
    component: ReminderComponent
  }
];


@NgModule({
  declarations: [ReminderComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule
    ]
})
export class ReminderModule { }
