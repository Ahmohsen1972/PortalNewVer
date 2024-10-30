import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialProgComponent } from './financial-prog/financial-prog.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialProgComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
