import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { BanksComponent } from './components/banks/banks.component';
import { EmployersComponent } from './components/employers/employers.component';
import { RequiredDocsComponent } from './components/required-docs/required-docs.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { AssetClassesComponent } from './components/asset-classes/asset-classes.component';
import { CustomerServiceLettersComponent } from './components/customer-service-letters/customer-service-letters.component';
const routes: Routes = [
  {
    path: '',
    component: SetupComponent,
  },
  { path: 'countries', component: CountriesComponent },
  { path: 'currencies', component: CurrenciesComponent },
  { path: 'banks', component: BanksComponent },
  { path: 'employers', component: EmployersComponent },
  { path: 'docs', component: RequiredDocsComponent },
  { path: 'terms', component: TermsConditionsComponent },
  { path: 'asset-classes', component: AssetClassesComponent },
  {
    path: 'customer-service-letters',
    component: CustomerServiceLettersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupOptionsRoutingModule {}
