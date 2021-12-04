import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FinanceComponent} from "./finance/finance.component";

const routes: Routes = [
  {
    path: '',
    component: FinanceComponent
  }
];


@NgModule({
  declarations: [FinanceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FinanceModule { }
