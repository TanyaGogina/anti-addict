import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FinanceComponent} from "./finance/finance.component";
import {IonicModule} from "@ionic/angular";

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
        RouterModule.forChild(routes),
        IonicModule
    ]
})
export class FinanceModule { }
