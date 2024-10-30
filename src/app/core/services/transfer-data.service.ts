import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { UserMenuTree } from '../interfaces/UserMenuTree';

@Injectable({
  providedIn: 'root',
})
export class TransferDataService {
  constructor() {}
  public moduleType: string = null;
  public userTypeList: string = null;
  public userIsadmin?: string;
  public fetchIActive = false;
  public paymentConfirmation = new BehaviorSubject<any>(null);
  public paymentRequestConfirmation = new BehaviorSubject<any>(null);
  public paymentReportConfirmation = new BehaviorSubject<any>(null);
  public behaviourSubject = new BehaviorSubject<any>(null);
  public foreignKeySubject = new BehaviorSubject<any>(null);
  public loggedUser = new BehaviorSubject(false);
  public languageCanged = new BehaviorSubject(false);
  public showMoreMyRequest = new BehaviorSubject(false);
  public userKeyFromCreate?: number;
  public refreshOfferData = new BehaviorSubject<any>(null);
  public updateDependentlov = new BehaviorSubject<any>(null);
  public prckey: number = null;
  public refreshOffersPayments = new BehaviorSubject(false);
  public refreshRepaymentParam = new BehaviorSubject(false);
  public wfActionsChanged = new BehaviorSubject<any>(null);
  public hideAttachmentAddNewButton = new BehaviorSubject(false);
  public spinnerFlag = new BehaviorSubject(true);
  public spinnerFlagForRequest = new BehaviorSubject(true);
  public staticTranslationData: { [key: string]: any } = {};
  public showNewRequestBtn = new BehaviorSubject(false);
  public fetchCustomerRequest = new BehaviorSubject(false);
  public filterMyRequest = new BehaviorSubject(null);
  public filterMyRequestByAttName = new BehaviorSubject(null);
  public filterMyRequeStsortingASC = new BehaviorSubject(null);
  public checkForDependentLov = new BehaviorSubject(false);
  public afterSubmitPrc = new BehaviorSubject<any>(null);

  /////// attributes for registration form
  public newCustomer: boolean = false;
  public existedCustomerData?: any;
  public clntKey?: number;
  public fromResetPass?: boolean;
  public userKey?: number;
  public userName?: string;
  public mobileNo?: string;
  public userRequestStatus?: string;
  public bpTypeModKeys: { [key: string]: any } = {};
  public parentBpModKey?: string;
  public parentControlValue?: any;
  public childControlsForOtherPages: { [key: string]: any } = {};
  public lovMatchedObject: { [key: string]: any } = {};
  // finance info for dependent lov
  public financeInfoControls: { [key: string]: any } = {};
  public financeInfoPristeneLoaded = new BehaviorSubject<any>(false);
  // item detail for dependent lov
  public itemDetailsControls: { [key: string]: any } = {};
  public itemDetailsPristeneLoaded = new BehaviorSubject<any>(false);
  // repayment params for dependent
  public repaymentParamsControls: { [key: string]: any } = {};
  public financeInfoHiddenForm: { [key: string]: any } = {};
  public repaymentParamsPristeneLoaded = new BehaviorSubject<any>(false);

  public refreshRequest = new BehaviorSubject<any>(false);

  public refreshAllRequestOtherInfo = new BehaviorSubject<any>(-1);

  ///////////////////////////////////////
  public modules?: UserMenuTree[];
  public userRequest?: any;
  public formWhere?: string;
  public processActionName?: string;
  public processName?: string;
  subscriptions: Subscription[] = [];
  ////////////////// User request components valid//////////////////
  public itemDetailFormValid = new BehaviorSubject<any>(null);
  public otherInfoFormValid = new BehaviorSubject<any>(null);
  public finaceInfoFormValid = new BehaviorSubject<any>(null);
  public repaymentParamFormValid = new BehaviorSubject<any>(null);
  public financialObligationFormValid = new BehaviorSubject<any>(null);
  public attachmentFormValid = new BehaviorSubject<any>(null);
  public multiItemsFormValid = new BehaviorSubject<any>(null);
  public financeInfoFormchanged: boolean = false;
  public itemDetailFormchanged: boolean = false;
  public paymentParamFormchanged: boolean = false;
  public otherInfoFormchanged: boolean = false;
  public financialObligationFormchanged?: boolean;
  public multiItemsFormchanged: boolean = false;
  public attachmentFormchanged: boolean = false;
  stopOnSubmitIfNext: boolean = false;

  ////customer service report form change////
  public csrMainInfoFormChanged: boolean = false;
  public csrAttachmentFormChanged: boolean = false;
  //////////////////////////////////////////////////////////
  public newFinancialObligationAdded = new BehaviorSubject<any>(false);
  public afterSubmit = new BehaviorSubject<any>(false);

  /////////////////// For Person Profile and business party ///////////////////////
  public fromCreateBp: boolean = false;
  public viewOrEditBp: string = '';
  public bpKey: number | null = null;
  public bpType: string | null = null;
  public fetchScr: boolean = false;
  public mainInfoKey: number | null = null;
  public userPofilePrckey: any = null;
  public guarantorPrckey: any = null;
  //////////////////////////////////////////////////////////////
  public virtualKeyboard = new BehaviorSubject<any>(null);

  public resendOtp = new BehaviorSubject<any>(false);

  public filterInactivatedBp = new BehaviorSubject(null);

  ////////////////// Customer Service Report components valid//////////////////
  public mainInfoFormValid = new BehaviorSubject<any>(null);
  public mainInfoFormchanged: boolean = false;
  public csrAttachmentFormValid = new BehaviorSubject<any>(null);
  public disableChangingLanguage = new BehaviorSubject<any>(false);
  public csrKeyFromCreate?: number;
  public prckeyFromCustomerService: number | null = null;
  public afterCreateCSR = new BehaviorSubject(false);
  public csrWfActionsChanged = new BehaviorSubject<any>(null);
  public csrWfActionsChangedForOfficer = new BehaviorSubject<any>(null);
  public filterCustomerServiceReport = new BehaviorSubject(null);
  public filterAllCustomerServiceReport = new BehaviorSubject(null);
  public showMoreCustomerServiceReports = new BehaviorSubject(false);

  updateStaticTranslation(tData: any) {
    this.staticTranslationData = tData;
  }
  get StaticTranslation() {
    return this.staticTranslationData;
  }

  getBehaviourSubjectResendOtp(): Observable<any> {
    return this.resendOtp.asObservable();
  }

  getBehaviourSubjectRefreshAllRequestOtherInfo(): Observable<any> {
    return this.refreshAllRequestOtherInfo.asObservable();
  }

  getBehaviourSubjectRefreshRequest(): Observable<any> {
    return this.refreshRequest.asObservable();
  }

  getBehaviourSubjectWfActionsChanged(): Observable<any> {
    return this.wfActionsChanged.asObservable();
  }

  getBehaviourSubjectCsrWfActionsChanged(): Observable<any> {
    return this.csrWfActionsChanged.asObservable();
  }

  getBehaviourSubjectCsrWfActionsChangedForOfficer(): Observable<any> {
    return this.csrWfActionsChangedForOfficer.asObservable();
  }

  getBehaviourSubjectRepaymentParamsPristineLoaded(): Observable<any> {
    return this.itemDetailsPristeneLoaded.asObservable();
  }
  getBehaviourSubjectItemDetailsPristineLoaded(): Observable<any> {
    return this.itemDetailsPristeneLoaded.asObservable();
  }

  getBehaviourSubjectFinanceInfoPristineLoaded(): Observable<any> {
    return this.financeInfoPristeneLoaded.asObservable();
  }

  getBehaviourSubjectHideAttachmentAddNewButton(): Observable<any> {
    return this.hideAttachmentAddNewButton.asObservable();
  }

  getBehaviorSubjectPaymentConfirmation(): Observable<any> {
    return this.paymentConfirmation.asObservable();
  }

  getBehaviorSubjectPaymentRequestConfirmation(): Observable<any> {
    return this.paymentRequestConfirmation.asObservable();
  }

  getBehaviorSubjectPaymentReportConfirmation(): Observable<any> {
    return this.paymentReportConfirmation.asObservable();
  }

  getBehaviourSubjectCheckDependentLov(): Observable<any> {
    return this.checkForDependentLov.asObservable();
  }
  getBehaviourSubjectFilteredMyRequest(): Observable<any> {
    return this.filterMyRequest.asObservable();
  }
  getBehaviourSubjectUpdateDependentLov(): Observable<any> {
    return this.updateDependentlov.asObservable();
  }

  getBehaviourSubjectFilterCustomerServiceReport(): Observable<any> {
    return this.filterCustomerServiceReport.asObservable();
  }

  getBehaviourSubjectFilterAllCustomerServiceReport(): Observable<any> {
    return this.filterAllCustomerServiceReport.asObservable();
  }

  getBehaviourSubjectShowMoreCustomerServiceReport(): Observable<any> {
    return this.showMoreCustomerServiceReports.asObservable();
  }

  getBehaviourSubjectFilteredMyRequestByAttName(): Observable<any> {
    return this.filterMyRequestByAttName.asObservable();
  }

  getBehaviourSubjectFilteredMyRequestStsortingASC(): Observable<any> {
    return this.filterMyRequeStsortingASC.asObservable();
  }
  getBehaviourSubjectfilterInactivatedBp(): Observable<any> {
    return this.filterInactivatedBp.asObservable();
  }
  getBehaviorSubjectLoggedUser(): Observable<any> {
    return this.loggedUser.asObservable();
  }

  getBehaviorSubjectVirtualKeyboard(): Observable<any> {
    return this.virtualKeyboard.asObservable();
  }

  getBehaviorSubjectSpinnerFlag(): Observable<any> {
    return this.spinnerFlag.asObservable();
  }

  getBehaviorSubjectSpinnerFlagForRequest(): Observable<any> {
    return this.spinnerFlagForRequest.asObservable();
  }

  getBehaviorSubjectAfterCreateCSR(): Observable<any> {
    return this.afterCreateCSR.asObservable();
  }

  // diabled changing language after creating report
  getBehaviourSubjectDisableChangingLanguage(): Observable<any> {
    return this.disableChangingLanguage.asObservable();
  }

  getBehaviorSubjectLanguageChanged(): Observable<any> {
    return this.languageCanged.asObservable();
  }

  getBehaviourSubjectRefreshAttachmentCustomProperties(): Observable<any> {
    return this.afterSubmitPrc.asObservable();
  }

  getBehaviorSubjectShowMoreMyRequest(): Observable<any> {
    return this.showMoreMyRequest.asObservable();
  }

  getBehaviorSubjectFetchCustomerRequests(): Observable<any> {
    return this.fetchCustomerRequest.asObservable();
  }

  getBehaviorSubjectRefreshRepaymentParam(): Observable<any> {
    return this.refreshRepaymentParam.asObservable();
  }

  getBehaviorSubjectShowNewRequestBtn(): Observable<any> {
    return this.showNewRequestBtn.asObservable();
  }

  getBehaviourSubjectafterSubmit(): Observable<any> {
    return this.afterSubmit.asObservable();
  }
  /*
  sendData(data: any) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next();
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
*/
  filterLovGeneral(
    controlName: string,
    childOf: Record<string, any[]>,
    data: any,
  ): any[] {
    let whereClauseParams: any[] = [];
    if (childOf != null) {
      let finaceTypeChilds: any = childOf;
      for (let key in finaceTypeChilds) {
        let financeInfoChildWhereClause: any[] = childOf[key];
        financeInfoChildWhereClause.forEach((control) => {
          whereClauseParams.push({ whereClauseValues: data });
        });
      }
    }
    return whereClauseParams;
  }
}
