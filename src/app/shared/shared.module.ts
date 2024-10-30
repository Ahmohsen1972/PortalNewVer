import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { appMaterial } from '../app-material';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmPopComponent } from './components/confirm-pop/confirm-pop.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { GenericPopupComponent } from './components/generic-popup/generic-popup.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { DadDirective } from './components/direcitves/dad.directive';

@NgModule({
  declarations: [
    ConfirmPopComponent,
    GenericPopupComponent,
    DynamicFormComponent,
    NoDataComponent,
    DadDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    appMaterial,
    HttpClientModule,
    FontAwesomeModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    SatPopoverModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    appMaterial,
    ConfirmPopComponent,
    QuillModule,
    SatPopoverModule,
    DynamicFormComponent,
    NoDataComponent,
    DadDirective,
  ],
})
export class SharedModule {}
