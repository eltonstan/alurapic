import { Component, NgModule } from "@angular/core";
import { AlertComponent } from "./alert.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AlertComponent],
    exports: [AlertComponent],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class AlertModule {}