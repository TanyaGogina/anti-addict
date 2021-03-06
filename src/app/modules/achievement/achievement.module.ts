import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AchievementComponent} from './achievement.component';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from "@ionic/angular";

const routes: Routes = [
    {
        path: '',
        component: AchievementComponent
    }
];


@NgModule({
    declarations: [AchievementComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IonicModule
    ]
})
export class AchievementModule {
}
