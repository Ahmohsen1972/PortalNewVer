import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { BanksComponent } from './components/banks/banks.component';
import { SetupComponent } from './components/setup/setup.component';
import { SetupOptionsRoutingModule } from './setup-options-routing.module';
import { EmployersComponent } from './components/employers/employers.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { ViewBankComponent } from './components/banks/view-bank/view-bank.component';
import { RequiredDocsComponent } from './components/required-docs/required-docs.component';
import { AssetClassesComponent } from './components/asset-classes/asset-classes.component';
import { AddNewBanksComponent } from './components/banks/add-new-banks/add-new-banks.component';
import { ViewCountryComponent } from './components/countries/view-country/view-country.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { ViewEmployerComponent } from './components/employers/view-employer/view-employer.component';
import { ViewCurrencyComponent } from './components/currencies/view-currency/view-currency.component';
import { AddNewCountryComponent } from './components/countries/add-new-country/add-new-country.component';
import { AddNewEmployerComponent } from './components/employers/add-new-employer/add-new-employer.component';
import { AddNewCurrencyComponent } from './components/currencies/add-new-currency/add-new-currency.component';
import { ViewRequiredDocComponent } from './components/required-docs/view-required-doc/view-required-doc.component';
import { CustomerServiceLettersComponent } from './components/customer-service-letters/customer-service-letters.component';
import { ViewAssetClassComponent } from './components/asset-classes/view-asset/view-asset-class/view-asset-class.component';
import { AddNewRequiredDocComponent } from './components/required-docs/add-new-required-doc/add-new-required-doc.component';
import { AssetInformationComponent } from './components/asset-classes/view-asset/asset-information/asset-information.component';
import { AssetAttInformationComponent } from './components/asset-classes/view-asset/asset-att-information/asset-att-information.component';
import { AddEditAssetAttComponent } from './components/asset-classes/view-asset/asset-att-information/add-edit-asset-att/add-edit-asset-att.component';
import { ViewAssetAttComponent } from './components/asset-classes/view-asset/asset-att-information/view-asset-att/view-asset-att.component';
import { ViewCustomerServiceLetterComponent } from './components/customer-service-letters/view-customer-service-letter/view-customer-service-letter.component';
import { AddNewCustomerServiceLetterComponent } from './components/customer-service-letters/add-new-customer-service-letter/add-new-customer-service-letter.component';

@NgModule({
  declarations: [
    SetupComponent,
    CountriesComponent,
    CurrenciesComponent,
    BanksComponent,
    EmployersComponent,
    RequiredDocsComponent,
    TermsConditionsComponent,
    AddNewBanksComponent,
    AddNewCountryComponent,
    AddNewCurrencyComponent,
    ViewCountryComponent,
    ViewBankComponent,
    ViewCurrencyComponent,
    AddNewRequiredDocComponent,
    ViewRequiredDocComponent,
    AddNewEmployerComponent,
    ViewEmployerComponent,
    AssetClassesComponent,
    ViewAssetClassComponent,
    AssetInformationComponent,
    AssetAttInformationComponent,
    AddEditAssetAttComponent,
    ViewAssetAttComponent,
    CustomerServiceLettersComponent,
    ViewCustomerServiceLetterComponent,
    AddNewCustomerServiceLetterComponent,
  ],
  imports: [CommonModule, SharedModule, SetupOptionsRoutingModule],
})
export class SetupOptionsModule {}
