export class UserRequest{

    private urKey : number ;
    private benEmail : string ;
    private benFullLPersonName : string ;
    private benIdentityNumber : string ;
    private benIdentityType : string ;
    private benMobileNo1 : string ;
    private cancellationDate : Date ;
    private clntKey : number ;
    private confirmationDate : Date ;
    private cusEmail : string ;
    private cusFullLPersonName : string ;
    private cusIdentityNumber : string ;
    private cusIdentityType : string ;
    private cusMobileNo1 : string ;
    private guaEmail : string ;
    private guaFullLPersonName : string ;
    private guaIdentityNumber : string ;
    private guaIdentityType : string ;
    private guaMobileNo1 : string ;
    private supEmail : string ;
    private supFullLPersonName : string ;
    private supIdentityNumber : string ;
    private supIdentityType : string ;
    private supMobileNo1 : string ;
    private urAssClassDescription : string ;
    private urAssetClass : string ;
    private urDecimalPalcesOption : string ;
    private urDownPaymentAmt : number ;
    private urDownPaymentPercentage : number ;
    private urFinancePurpose : string ;
    private urFinanceType : string ;
    private urFirstRepaymentAmount : number ;
    private urFirstRepaymentDate : Date ;
    private urGraceDays : number ;
    private urMasterFinanceConcept : string ;
    private urPrincipal : number ;
    private urProfitRate : number ;
    private urReleaseDate : Date ;
    private urRepaymentOption : string ;
    private urSector : string ;
    private urSggestedInstAmt : number ;
    private urShowroom : string ;
    private urStatus : string ;
    private urSuggestedFirstInstDate : Date ;
    private urSuggestedLastInstAmt : number ;
    private urSuggestedLastInstAmt3 : number ;
    private urTenureNo : number ;
    private urTenurePeriodicity : string ;
    private urUtilization : string ;
    private wcrCode : string ;
    private wcrForeignName : string ;
    private wcrKey : number ;
    private wcrLocalName : string ;
    private wppBenfKey : number ;
    private wppCusKey : number ;
    private wppGuaKey : number ;
    private wppSupKey : number ;
    private urPortalCode : string ;
    private urIntegrationCode : string ;

    public getUrKey(): number {
        return this.urKey;
    }

    public setUrKey(urKey: number): void {
        this.urKey = urKey;
    }

    public getBenEmail(): string {
        return this.benEmail;
    }

    public setBenEmail(benEmail: string): void {
        this.benEmail = benEmail;
    }

    public getBenFullLPersonName(): string {
        return this.benFullLPersonName;
    }

    public setBenFullLPersonName(benFullLPersonName: string): void {
        this.benFullLPersonName = benFullLPersonName;
    }

    public getBenIdentityNumber(): string {
        return this.benIdentityNumber;
    }

    public setBenIdentityNumber(benIdentityNumber: string): void {
        this.benIdentityNumber = benIdentityNumber;
    }

    public getBenIdentityType(): string {
        return this.benIdentityType;
    }

    public setBenIdentityType(benIdentityType: string): void {
        this.benIdentityType = benIdentityType;
    }

    public getBenMobileNo1(): string {
        return this.benMobileNo1;
    }

    public setBenMobileNo1(benMobileNo1: string): void {
        this.benMobileNo1 = benMobileNo1;
    }

    public getCancellationDate(): Date {
        return this.cancellationDate;
    }

    public setCancellationDate(cancellationDate: Date): void {
        this.cancellationDate = cancellationDate;
    }

    public getClntKey(): number {
        return this.clntKey;
    }

    public setClntKey(clntKey: number): void {
        this.clntKey = clntKey;
    }

    public getConfirmationDate(): Date {
        return this.confirmationDate;
    }

    public setConfirmationDate(confirmationDate: Date): void {
        this.confirmationDate = confirmationDate;
    }

    public getCusEmail(): string {
        return this.cusEmail;
    }

    public setCusEmail(cusEmail: string): void {
        this.cusEmail = cusEmail;
    }

    public getCusFullLPersonName(): string {
        return this.cusFullLPersonName;
    }

    public setCusFullLPersonName(cusFullLPersonName: string): void {
        this.cusFullLPersonName = cusFullLPersonName;
    }

    public getCusIdentityNumber(): string {
        return this.cusIdentityNumber;
    }

    public setCusIdentityNumber(cusIdentityNumber: string): void {
        this.cusIdentityNumber = cusIdentityNumber;
    }

    public getCusIdentityType(): string {
        return this.cusIdentityType;
    }

    public setCusIdentityType(cusIdentityType: string): void {
        this.cusIdentityType = cusIdentityType;
    }

    public getCusMobileNo1(): string {
        return this.cusMobileNo1;
    }

    public setCusMobileNo1(cusMobileNo1: string): void {
        this.cusMobileNo1 = cusMobileNo1;
    }

    public getGuaEmail(): string {
        return this.guaEmail;
    }

    public setGuaEmail(guaEmail: string): void {
        this.guaEmail = guaEmail;
    }

    public getGuaFullLPersonName(): string {
        return this.guaFullLPersonName;
    }

    public setGuaFullLPersonName(guaFullLPersonName: string): void {
        this.guaFullLPersonName = guaFullLPersonName;
    }

    public getGuaIdentityNumber(): string {
        return this.guaIdentityNumber;
    }

    public setGuaIdentityNumber(guaIdentityNumber: string): void {
        this.guaIdentityNumber = guaIdentityNumber;
    }

    public getGuaIdentityType(): string {
        return this.guaIdentityType;
    }

    public setGuaIdentityType(guaIdentityType: string): void {
        this.guaIdentityType = guaIdentityType;
    }

    public getGuaMobileNo1(): string {
        return this.guaMobileNo1;
    }

    public setGuaMobileNo1(guaMobileNo1: string): void {
        this.guaMobileNo1 = guaMobileNo1;
    }

    public getSupEmail(): string {
        return this.supEmail;
    }

    public setSupEmail(supEmail: string): void {
        this.supEmail = supEmail;
    }

    public getSupFullLPersonName(): string {
        return this.supFullLPersonName;
    }

    public setSupFullLPersonName(supFullLPersonName: string): void {
        this.supFullLPersonName = supFullLPersonName;
    }

    public getSupIdentityNumber(): string {
        return this.supIdentityNumber;
    }

    public setSupIdentityNumber(supIdentityNumber: string): void {
        this.supIdentityNumber = supIdentityNumber;
    }

    public getSupIdentityType(): string {
        return this.supIdentityType;
    }

    public setSupIdentityType(supIdentityType: string): void {
        this.supIdentityType = supIdentityType;
    }

    public getSupMobileNo1(): string {
        return this.supMobileNo1;
    }

    public setSupMobileNo1(supMobileNo1: string): void {
        this.supMobileNo1 = supMobileNo1;
    }

    public getUrAssClassDescription(): string {
        return this.urAssClassDescription;
    }

    public setUrAssClassDescription(urAssClassDescription: string): void {
        this.urAssClassDescription = urAssClassDescription;
    }

    public getUrAssetClass(): string {
        return this.urAssetClass;
    }

    public setUrAssetClass(urAssetClass: string): void {
        this.urAssetClass = urAssetClass;
    }

    public getUrDecimalPalcesOption(): string {
        return this.urDecimalPalcesOption;
    }

    public setUrDecimalPalcesOption(urDecimalPalcesOption: string): void {
        this.urDecimalPalcesOption = urDecimalPalcesOption;
    }

    public getUrDownPaymentAmt(): number {
        return this.urDownPaymentAmt;
    }

    public setUrDownPaymentAmt(urDownPaymentAmt: number): void {
        this.urDownPaymentAmt = urDownPaymentAmt;
    }

    public getUrDownPaymentPercentage(): number {
        return this.urDownPaymentPercentage;
    }

    public setUrDownPaymentPercentage(urDownPaymentPercentage: number): void {
        this.urDownPaymentPercentage = urDownPaymentPercentage;
    }

    public getUrFinancePurpose(): string {
        return this.urFinancePurpose;
    }

    public setUrFinancePurpose(urFinancePurpose: string): void {
        this.urFinancePurpose = urFinancePurpose;
    }

    public getUrFinanceType(): string {
        return this.urFinanceType;
    }

    public setUrFinanceType(urFinanceType: string): void {
        this.urFinanceType = urFinanceType;
    }

    public getUrFirstRepaymentAmount(): number {
        return this.urFirstRepaymentAmount;
    }

    public setUrFirstRepaymentAmount(urFirstRepaymentAmount: number): void {
        this.urFirstRepaymentAmount = urFirstRepaymentAmount;
    }

    public getUrFirstRepaymentDate(): Date {
        return this.urFirstRepaymentDate;
    }

    public setUrFirstRepaymentDate(urFirstRepaymentDate: Date): void {
        this.urFirstRepaymentDate = urFirstRepaymentDate;
    }

    public getUrGraceDays(): number {
        return this.urGraceDays;
    }

    public setUrGraceDays(urGraceDays: number): void {
        this.urGraceDays = urGraceDays;
    }

    public getUrMasterFinanceConcept(): string {
        return this.urMasterFinanceConcept;
    }

    public setUrMasterFinanceConcept(urMasterFinanceConcept: string): void {
        this.urMasterFinanceConcept = urMasterFinanceConcept;
    }

    public getUrPrincipal(): number {
        return this.urPrincipal;
    }

    public setUrPrincipal(urPrincipal: number): void {
        this.urPrincipal = urPrincipal;
    }

    public getUrProfitRate(): number {
        return this.urProfitRate;
    }

    public setUrProfitRate(urProfitRate: number): void {
        this.urProfitRate = urProfitRate;
    }

    public getUrReleaseDate(): Date {
        return this.urReleaseDate;
    }

    public setUrReleaseDate(urReleaseDate: Date): void {
        this.urReleaseDate = urReleaseDate;
    }

    public getUrRepaymentOption(): string {
        return this.urRepaymentOption;
    }

    public setUrRepaymentOption(urRepaymentOption: string): void {
        this.urRepaymentOption = urRepaymentOption;
    }

    public getUrSector(): string {
        return this.urSector;
    }

    public setUrSector(urSector: string): void {
        this.urSector = urSector;
    }

    public getUrSggestedInstAmt(): number {
        return this.urSggestedInstAmt;
    }

    public setUrSggestedInstAmt(urSggestedInstAmt: number): void {
        this.urSggestedInstAmt = urSggestedInstAmt;
    }

    public getUrShowroom(): string {
        return this.urShowroom;
    }

    public setUrShowroom(urShowroom: string): void {
        this.urShowroom = urShowroom;
    }

    public getUrStatus(): string {
        return this.urStatus;
    }

    public setUrStatus(urStatus: string): void {
        this.urStatus = urStatus;
    }

    public getUrSuggestedFirstInstDate(): Date {
        return this.urSuggestedFirstInstDate;
    }

    public setUrSuggestedFirstInstDate(urSuggestedFirstInstDate: Date): void {
        this.urSuggestedFirstInstDate = urSuggestedFirstInstDate;
    }

    public getUrSuggestedLastInstAmt(): number {
        return this.urSuggestedLastInstAmt;
    }

    public setUrSuggestedLastInstAmt(urSuggestedLastInstAmt: number): void {
        this.urSuggestedLastInstAmt = urSuggestedLastInstAmt;
    }

    public getUrSuggestedLastInstAmt3(): number {
        return this.urSuggestedLastInstAmt3;
    }

    public setUrSuggestedLastInstAmt3(urSuggestedLastInstAmt3: number): void {
        this.urSuggestedLastInstAmt3 = urSuggestedLastInstAmt3;
    }

    public getUrTenureNo(): number {
        return this.urTenureNo;
    }

    public setUrTenureNo(urTenureNo: number): void {
        this.urTenureNo = urTenureNo;
    }

    public getUrTenurePeriodicity(): string {
        return this.urTenurePeriodicity;
    }

    public setUrTenurePeriodicity(urTenurePeriodicity: string): void {
        this.urTenurePeriodicity = urTenurePeriodicity;
    }

    public getUrUtilization(): string {
        return this.urUtilization;
    }

    public setUrUtilization(urUtilization: string): void {
        this.urUtilization = urUtilization;
    }

    public getWcrCode(): string {
        return this.wcrCode;
    }

    public setWcrCode(wcrCode: string): void {
        this.wcrCode = wcrCode;
    }

    public getWcrForeignName(): string {
        return this.wcrForeignName;
    }

    public setWcrForeignName(wcrForeignName: string): void {
        this.wcrForeignName = wcrForeignName;
    }

    public getWcrKey(): number {
        return this.wcrKey;
    }

    public setWcrKey(wcrKey: number): void {
        this.wcrKey = wcrKey;
    }

    public getWcrLocalName(): string {
        return this.wcrLocalName;
    }

    public setWcrLocalName(wcrLocalName: string): void {
        this.wcrLocalName = wcrLocalName;
    }

    public getWppBenfKey(): number {
        return this.wppBenfKey;
    }

    public setWppBenfKey(wppBenfKey: number): void {
        this.wppBenfKey = wppBenfKey;
    }

    public getWppCusKey(): number {
        return this.wppCusKey;
    }

    public setWppCusKey(wppCusKey: number): void {
        this.wppCusKey = wppCusKey;
    }

    public getWppGuaKey(): number {
        return this.wppGuaKey;
    }

    public setWppGuaKey(wppGuaKey: number): void {
        this.wppGuaKey = wppGuaKey;
    }

    public getWppSupKey(): number {
        return this.wppSupKey;
    }

    public setWppSupKey(wppSupKey: number): void {
        this.wppSupKey = wppSupKey;
    }

    public getUrPortalCode(): string {
        return this.urPortalCode;
    }

    public setUrPortalCode(urPortalCode: string): void {
        this.urPortalCode = urPortalCode;
    }

    public getUrIntegrationCode(): string {
        return this.urIntegrationCode;
    }

    public setUrIntegrationCode(urIntegrationCode: string): void {
        this.urIntegrationCode = urIntegrationCode;
    }

    



}