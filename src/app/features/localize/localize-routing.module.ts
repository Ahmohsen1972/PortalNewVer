import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeHomeComponent } from './components/localize-home/localize-home.component';
import { ActionLocalizeComponent } from './components/action-localize/action-localize.component';
import { ModuleLocalizeComponent } from './components/module-localize/module-localize.component';
import { ProcessLocalizeComponent } from './components/process-localize/process-localize.component';
import { AttributeHelpDetailsComponent } from './components/attribute-help-details/attribute-help-details.component';

const routes: Routes = [
  { path: '', component: LocalizeHomeComponent },
  { path: 'attribute-details', component: AttributeHelpDetailsComponent },
  { path: 'module-localize', component: ModuleLocalizeComponent },
  { path: 'process-localize', component: ProcessLocalizeComponent },
  { path: 'action-localize', component: ActionLocalizeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalizeRoutingModule {}
