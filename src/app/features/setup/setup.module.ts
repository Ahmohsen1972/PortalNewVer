import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';
import { LovsComponent } from './components/lovs/lovs.component';
import { UsersComponent } from './components/users/users.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ModulesComponent } from './components/modules/modules.component';
import { DomainsComponent } from './components/domains/domains.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { SetupHomeComponent } from './components/setup-home/setup-home.component';
import { LovModuleComponent } from './components/lov-module/lov-module.component';
import { ViewLovsComponent } from './components/lovs/view-lovs/view-lovs.component';
import { ViewUsersComponent } from './components/users/view-users/view-users.component';
import { FetchUserComponent } from './components/users/fetch-user/fetch-user.component';
import { AddNewLovComponent } from './components/lovs/add-new-lov/add-new-lov.component';
import { ViewDomainComponent } from './components/domains/view-domain/view-domain.component';
import { ViewModuleComponent } from './components/modules/view-module/view-module.component';
import { DefaultValuesComponent } from './components/default-values/default-values.component';
import { ModuleServicesComponent } from './components/module-services/module-services.component';
import { UserRolesComponent } from './components/users/view-users/user-roles/user-roles.component';
import { FlexFieldSetupComponent } from './components/flex-field-setup/flex-field-setup.component';
import { FinanceProductsComponent } from './components/finance-products/finance-products.component';
import { AddNewModuleComponent } from './components/modules/add-new-module/add-new-module.component';
import { ViewLanguageComponent } from './components/languages/view-language/view-language.component';
import { AddNewDomainComponent } from './components/domains/add-new-domain/add-new-domain.component';
import { StaticTranslationComponent } from './components/static-translation/static-translation.component';
import { ViewLovModuleComponent } from './components/lov-module/view-lov-module/view-lov-module.component';
import { EditClintInfoComponent } from './components/clients/edit-clint-info/edit-clint-info.component';
import { ViewClientInfoComponent } from './components/clients/view-client-info/view-client-info.component';
import { FinClientProdConfComponent } from './components/fin-client-prod-conf/fin-client-prod-conf.component';
import { AddEditVacationComponent } from './components/vacations/add-edit-vacation/add-edit-vacation.component';
import { UserInformationComponent } from './components/users/view-users/user-information/user-information.component';
import { AddNewLanguageComponent } from './components/languages/add-new-language/add-new-language.component';
import { AssetAttMappingCodeComponent } from './components/asset-att-mapping-code/asset-att-mapping-code.component';
import { CodesInformationComponent } from './components/domains/view-domain/codes-information/codes-information.component';
import { ModuleInformationComponent } from './components/modules/view-module/module-information/module-information.component';
import { DomainInformationComponent } from './components/domains/view-domain/domain-information/domain-information.component';
import { ViewModuleServicesComponent } from './components/module-services/view-module-services/view-module-services.component';
import { AddEditCodeComponent } from './components/domains/view-domain/codes-information/add-edit-code/add-edit-code.component';
import { AddEditDomainInfoComponent } from './components/domains/view-domain/domain-information/add-edit-domain-info/add-edit-domain-info.component';
import { AddEditModuleInfoComponent } from './components/modules/view-module/module-information/add-edit-module-info/add-edit-module-info.component';
import { ModuleAttributesInformationComponent } from './components/modules/view-module/module-attributes-information/module-attributes-information.component';
import { AddEditModuleAttributesInfoComponent } from './components/modules/view-module/module-attributes-information/add-edit-module-attributes-info/add-edit-module-attributes-info.component';
import { AddNewModuleServicesComponent } from './components/module-services/add-new-module-services/add-new-module-services.component';
import { ModuleDetailsInformationComponent } from './components/module-services/view-module-services/module-details-information/module-details-information.component';
import { ModuleServicesInformationComponent } from './components/module-services/view-module-services/module-services-information/module-services-information.component';
import { AddEditModuleServicesInfoComponent } from './components/module-services/view-module-services/module-services-information/add-edit-module-services-info/add-edit-module-services-info.component';
import { AddEditDetailsComponent } from './components/module-services/view-module-services/module-details-information/add-edit-details/add-edit-details.component';
import { ViewCodesInformationComponent } from './components/domains/view-domain/codes-information/view-codes-information/view-codes-information.component';
import { ViewDetailsInformationComponent } from './components/module-services/view-module-services/module-details-information/view-details-information/view-details-information.component';
import { LovColumnsInformationComponent } from './components/lovs/view-lovs/lov-columns-information/lov-columns-information.component';
import { LovsInformationComponent } from './components/lovs/view-lovs/lovs-information/lovs-information.component';
import { AddEditLovColumnsComponent } from './components/lovs/view-lovs/lov-columns-information/add-edit-lov-columns/add-edit-lov-columns.component';
import { EditLovsComponent } from './components/lovs/view-lovs/lovs-information/edit-lovs/edit-lovs.component';
import { ViewDefaultvaluesComponent } from './components/default-values/view-defaultvalues/view-defaultvalues.component';
import { AddNewDefaultValueComponent } from './components/default-values/add-new-default-value/add-new-default-value.component';
import { LovModuleInformationComponent } from './components/lov-module/view-lov-module/lov-module-information/lov-module-information.component';
import { AddEditLovModuleComponent } from './components/lov-module/view-lov-module/lov-module-information/add-edit-lov-module/add-edit-lov-module.component';
import { LovColumnMappingInformationComponent } from './components/lov-module/view-lov-module/lov-column-mapping-information/lov-column-mapping-information.component';
import { AddEditLovColumnMappingComponent } from './components/lov-module/view-lov-module/lov-column-mapping-information/add-edit-lov-column-mapping/add-edit-lov-column-mapping.component';
import { ModuleBindParamInformationComponent } from './components/lov-module/view-lov-module/module-bind-param-information/module-bind-param-information.component';
import { AddEditLovModuleParamComponent } from './components/lov-module/view-lov-module/module-bind-param-information/add-edit-lov-module-param/add-edit-lov-module-param.component';
import { ViewStaticTranslationComponent } from './components/static-translation/view-static-translation/view-static-translation.component';
import { AddNewStaticTranslationComponent } from './components/static-translation/add-new-static-translation/add-new-static-translation.component';
import { EditFlexFieldSetupComponent } from './components/flex-field-setup/edit-flex-field-setup/edit-flex-field-setup.component';
import { ViewAssAttMappingCodeComponent } from './components/asset-att-mapping-code/view-ass-att-mapping-code/view-ass-att-mapping-code.component';
import { EditAssAttMappingCodeComponent } from './components/asset-att-mapping-code/edit-ass-att-mapping-code/edit-ass-att-mapping-code.component';
import { ViewFinanceProductsComponent } from './components/finance-products/view-finance-products/view-finance-products.component';
import { AddNewFinanceProductComponent } from './components/finance-products/add-new-finance-product/add-new-finance-product.component';
import { FinanceProductInformationComponent } from './components/finance-products/view-finance-products/finance-product-information/finance-product-information.component';
import { AddEditFinanceProductInformationComponent } from './components/finance-products/view-finance-products/finance-product-information/add-edit-finance-product-information/add-edit-finance-product-information.component';
import { FinanceClientProductInformationComponent } from './components/finance-products/view-finance-products/finance-client-product-information/finance-client-product-information.component';
import { AddEditFinanceClientProductInformationComponent } from './components/finance-products/view-finance-products/finance-client-product-information/add-edit-finance-client-product/add-edit-finance-client-product-information.component';
import { ViewFinanceClientProductInformationComponent } from './components/finance-products/view-finance-products/finance-client-product-information/view-finance-client-product-information/view-finance-client-product-information.component';
import { ViewFinClientProdConfComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/view-fin-client-prod-conf.component';
import { FinClientProdConfInfComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/fin-client-prod-conf-inf/fin-client-prod-conf-inf.component';
import { AddEditFinClientProdConfComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/add-edit-fin-client-prod-conf/add-edit-fin-client-prod-conf.component';
import { RequiredDocumentsComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/required-documents/required-documents.component';
import { ViewRequiredDocumentComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/required-documents/view-required-document/view-required-document.component';
import { AddEditRequiredDocumentComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/required-documents/add-edit-required-document/add-edit-required-document.component';
import { AddEditUserRolesComponent } from './components/users/view-users/user-roles/add-edit-user-roles/add-edit-user-roles.component';
import { FinanceModulesComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/modules/modules.component';
import { AddEditFinanceModuleComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/modules/add-edit-finance-module/add-edit-finance-module.component';
import { ViewFinanceModuleComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/modules/view-finance-module/view-finance-module.component';
import { FinanceParametersComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/finance-parameters/finance-parameters.component';
import { ViewFinanceParametersModuleComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/finance-parameters/view-finance-parameters-module/view-finance-parameters-module.component';
import { AddEditFinanceParametersModuleComponent } from './components/fin-client-prod-conf/view-fin-client-prod-conf/finance-parameters/add-edit-finance-parameters-module/add-edit-finance-parameters-module.component';
import { CslRequiredDocumnetsComponent } from './components/csl-required-documnets/csl-required-documnets.component';
import { ViewCslReqDocComponent } from './components/csl-required-documnets/view-csl-req-doc/view-csl-req-doc.component';
import { AddEditCslReqDocComponent } from './components/csl-required-documnets/add-edit-csl-req-doc/add-edit-csl-req-doc.component';

@NgModule({
  declarations: [
    ViewFinanceModuleComponent,
    FinanceModulesComponent,
    AddEditFinanceModuleComponent,
    LanguagesComponent,
    AddNewLanguageComponent,
    ViewLanguageComponent,
    SetupHomeComponent,
    DomainsComponent,
    AddNewDomainComponent,
    ViewDomainComponent,
    DomainInformationComponent,
    CodesInformationComponent,
    AddEditCodeComponent,
    AddEditDomainInfoComponent,
    ModulesComponent,
    ViewModuleComponent,
    AddNewModuleComponent,
    ModuleInformationComponent,
    AddEditModuleInfoComponent,
    ModuleAttributesInformationComponent,
    AddEditModuleAttributesInfoComponent,
    ModuleServicesComponent,
    ViewModuleServicesComponent,
    AddNewModuleServicesComponent,
    ModuleDetailsInformationComponent,
    ModuleServicesInformationComponent,
    AddEditModuleServicesInfoComponent,
    AddEditDetailsComponent,
    ViewCodesInformationComponent,
    ViewDetailsInformationComponent,
    LovsComponent,
    ViewLovsComponent,
    LovColumnsInformationComponent,
    LovsInformationComponent,
    AddEditLovColumnsComponent,
    EditLovsComponent,
    AddNewLovComponent,
    UsersComponent,
    FetchUserComponent,
    DefaultValuesComponent,
    ViewDefaultvaluesComponent,
    AddNewDefaultValueComponent,
    LovModuleComponent,
    ViewLovModuleComponent,
    LovModuleInformationComponent,
    AddEditLovModuleComponent,
    LovColumnMappingInformationComponent,
    AddEditLovColumnMappingComponent,
    ModuleBindParamInformationComponent,
    AddEditLovModuleParamComponent,
    StaticTranslationComponent,
    ViewStaticTranslationComponent,
    AddNewStaticTranslationComponent,
    FlexFieldSetupComponent,
    EditFlexFieldSetupComponent,
    AssetAttMappingCodeComponent,
    ViewAssAttMappingCodeComponent,
    EditAssAttMappingCodeComponent,
    FinanceProductsComponent,
    ViewFinanceProductsComponent,
    AddNewFinanceProductComponent,
    FinanceProductInformationComponent,
    AddEditFinanceProductInformationComponent,
    FinanceClientProductInformationComponent,
    AddEditFinanceClientProductInformationComponent,
    ViewFinanceClientProductInformationComponent,
    VacationsComponent,
    AddEditVacationComponent,
    ClientsComponent,
    EditClintInfoComponent,
    ViewClientInfoComponent,
    FinClientProdConfComponent,
    ViewFinClientProdConfComponent,
    FinClientProdConfInfComponent,
    AddEditFinClientProdConfComponent,
    RequiredDocumentsComponent,
    ViewRequiredDocumentComponent,
    AddEditRequiredDocumentComponent,
    UserRolesComponent,
    AddEditUserRolesComponent,
    ViewUsersComponent,
    UserInformationComponent,
    FinanceParametersComponent,
    ViewFinanceParametersModuleComponent,
    AddEditFinanceParametersModuleComponent,
    CslRequiredDocumnetsComponent,
    ViewCslReqDocComponent,
    AddEditCslReqDocComponent,
  ],

  imports: [CommonModule, SetupRoutingModule, SharedModule],
})
export class SetupModule {}
