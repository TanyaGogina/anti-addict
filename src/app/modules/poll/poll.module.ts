import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PollComponent} from "./poll/poll.component";


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
    RouterModule.forChild(routes)
  ]
})
export class PollModule { }
