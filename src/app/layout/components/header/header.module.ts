import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRouting } from './header.routing';
import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';


@NgModule({
imports: [
CommonModule,
TranslateModule,
HeaderRouting,
FormsModule
],
declarations: [
HeaderComponent
]
})
export class HeaderModule {}
