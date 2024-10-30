export interface UserRequest {
  urKey: number;

  applicationCode: string;
  wppImage;
  langKey: number;
  clntKey: number;
  updateDate: Date;
  cusIdentityNumber: number;
  urDecimalPalcesOption: string;
  cusApplicationCode: string;
  cusActiveName: string;
  cusMigStatus: string;
  cusActive: string;
  cusMigStatusName: string;
  urRepaymentOption: string;
  guaApplicationCode: string;
  guaMigStatusName: string;
  guarantorMigStatus: string;
  guaActiveName: string;
  guaActive: string;
  urSggestedInstAmt: number;
  urSuggestedFirstInstDate: Date;
  cusFullLPersonName: string;

  guaFullLPersonName: string;

  supFullLPersonName: string;

  urAssClassDescription: string;
  urItemStatus: string;

  urAssetClass: string;

  urDownPaymentPercentage: number;

  urFinancePurpose: string;

  urFinanceType: string;

  urGraceDays: number;

  urMasterFinanceConcept: string;

  urPrincipal: number;
  urShowroom: string;
  urStatus: string;
  otherSupplierName: string;

  urProfitRate: number;

  urReleaseDate: Date;

  urSector: string;

  urTenureNo: number;

  wcrCode: string;

  wcrKey: number;

  wcrLocalName: string;

  wppCusKey: number;

  wppGuaKey: number;

  wppSupKey: number;

  urPortalCode: number;

  urIntegrationCode: string;

  financeConceptName: string;

  financeTypeName: string;

  utilizationName: string;

  sectorName: string;

  financePurposeName: string;

  flexField1: string;

  flexField2: string;

  flexField3: string;

  flexField4: string;

  flexField5: string;

  prcKey: number;

  contStatusDesc: string;

  assetClassName: string;

  prefLang: string;

  officerOrigKey: number;

  urSubmissionDate;

  sectionStatus: string;

  flexField6: string;

  flexField7: string;

  flexField8: string;

  flexField9: string;

  flexField10: string;

  fcpKey: number;
  productName: string;
  fileName: string;
}
