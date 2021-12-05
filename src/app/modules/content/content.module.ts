import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentComponent} from "./content/content.component";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {IonicModule} from "@ionic/angular";

const routes: Routes = [
    {
        path: '',
        component: ContentComponent
    }
];


@NgModule({
    declarations: [ContentComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        IonicModule
    ]
})
export class ContentModule {
}
