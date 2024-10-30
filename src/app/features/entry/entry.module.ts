import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryRoutingModule } from './entry-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { CoreModule } from 'app/core/core.module';
import { FinancialProgComponent } from './financial-prog/financial-prog.component';
import { ViewProductInfoComponent } from './view-product-info/view-product-info.component';

@NgModule({
  declarations: [ViewProductInfoComponent, FinancialProgComponent],
  imports: [
    CommonModule,
    EntryRoutingModule,
    SharedModule,
    CoreModule,
    CommonModule,
    SharedModule,
    EntryRoutingModule
  ],
})
export class EntryModule {}
