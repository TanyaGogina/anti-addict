import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PollComponent} from "./poll/poll.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: PollComponent
  }
];


@NgModule({
  declarations: [PollComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule,
        FormsModule
    ]
})
export class PollModule { }
