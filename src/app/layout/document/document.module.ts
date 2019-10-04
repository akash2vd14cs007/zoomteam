import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentRouting } from './document.routing';
import { DocumentComponent } from './document.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, GrowlModule } from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
         NgbModule,
        DocumentRouting,
        ConfirmDialogModule,
        GrowlModule


    ],
    declarations: [
        DocumentComponent
    ],
    providers: [ConfirmationService]
})
export class DocumentModule {}
