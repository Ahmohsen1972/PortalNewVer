import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { LocalizeRoutingModule } from './localize-routing.module';
import { LocalizeHomeComponent } from './components/localize-home/localize-home.component';
import { ModuleLocalizeComponent } from './components/module-localize/module-localize.component';
import { ActionLocalizeComponent } from './components/action-localize/action-localize.component';
import { ProcessLocalizeComponent } from './components/process-localize/process-localize.component';
import { AttributeHelpDetailsComponent } from './components/attribute-help-details/attribute-help-details.component';
import { EditModuleLocalizeComponent } from './components/module-localize/edit-module-localize/edit-module-localize.component';
import { AddEditActionLocalizeComponent } from './components/action-localize/add-edit-action-localize/add-edit-action-localize.component';
import { EditAttributeDetailsComponent } from './components/attribute-help-details/edit-attribute-details/edit-attribute-details.component';
import { AddEditProcessLocalizeComponent } from './components/process-localize/add-edit-process-localize/add-edit-process-localize.component';

@NgModule({
  declarations: [
    LocalizeHomeComponent,
    ActionLocalizeComponent,
    ModuleLocalizeComponent,
    ProcessLocalizeComponent,
    EditModuleLocalizeComponent,
    AttributeHelpDetailsComponent,
    EditAttributeDetailsComponent,
    AddEditProcessLocalizeComponent,
    AddEditActionLocalizeComponent,
  ],
  imports: [CommonModule, SharedModule, LocalizeRoutingModule],
})
export class LocalizeModule {}
