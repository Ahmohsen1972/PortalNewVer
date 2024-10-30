import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LovsComponent } from './components/lovs/lovs.component';
import { UsersComponent } from './components/users/users.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DomainsComponent } from './components/domains/domains.component';
import { ModulesComponent } from './components/modules/modules.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { SetupHomeComponent } from './components/setup-home/setup-home.component';
import { LovModuleComponent } from './components/lov-module/lov-module.component';
import { DefaultValuesComponent } from './components/default-values/default-values.component';
import { ModuleServicesComponent } from './components/module-services/module-services.component';
import { FlexFieldSetupComponent } from './components/flex-field-setup/flex-field-setup.component';
import { FinanceProductsComponent } from './components/finance-products/finance-products.component';
import { StaticTranslationComponent } from './components/static-translation/static-translation.component';
import { FinClientProdConfComponent } from './components/fin-client-prod-conf/fin-client-prod-conf.component';
import { AssetAttMappingCodeComponent } from './components/asset-att-mapping-code/asset-att-mapping-code.component';
import { CslRequiredDocumnetsComponent } from './components/csl-required-documnets/csl-required-documnets.component';

const routes: Routes = [
  { path: '', component: SetupHomeComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'domains', component: DomainsComponent },
  { path: 'modules', component: ModulesComponent },
  { path: 'moduleservices', component: ModuleServicesComponent },
  { path: 'lovs', component: LovsComponent },
  { path: 'lov-module', component: LovModuleComponent },
  { path: 'users', component: UsersComponent },
  { path: 'static', component: StaticTranslationComponent },
  { path: 'flex-field', component: FlexFieldSetupComponent },
  { path: 'ass-att-mapp', component: AssetAttMappingCodeComponent },
  { path: 'default-values', component: DefaultValuesComponent },
  { path: 'finance-products', component: FinanceProductsComponent },
  { path: 'vacations', component: VacationsComponent },
  { path: 'client', component: ClientsComponent },
  { path: 'csl-req-docs', component: CslRequiredDocumnetsComponent },
  { path: 'fin-pro-con', component: FinClientProdConfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
