import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  }
];


@NgModule({
  declarations: [AuthComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
