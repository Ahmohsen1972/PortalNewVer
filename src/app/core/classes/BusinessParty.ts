import { User } from './User';
import { BankAccount } from './BankAccount';

export class BusinessParty {
    private wppKey!: number;
    private wppIdentityType!: string;
    private wppIdentityNumber!: string;
    private mainPersonName!: string;
    private mainMobileNo1!: string;
    private wppMaritalStatus!: string;
    private wcKey!: number;
    private wppKeyParent!: number;
    private wppBirthDate!: Date;
    private wppTitle!: string;
    private wppSex!: string;
    private clntKey!: number;
    private wppEmploymentType!: string;
    private wppFFirstName!: string;
    private wppFLastName!: string;
    private wppFMiddleName!: string;
    private wppFThirdName!: string;
    private wppLFirstName!: string;
    private wppLLastName!: string;
    private wppLMiddleName!: string;
    private wppLThirdName!: string;
    private wppNetMonthlyIncome!: number;
    private wppPhoto!: string;
    private wppRefreshDate!: Date;
    private mainMobileNo2! : string ;
    private versionNo! : number ;
    private applicationUser!: User;
    private bankAccount! : BankAccount;

    private wppPersonType! : string ;
    
    
    public getWppPersonType(): string {
        return this.wppPersonType;
    }

    public setWppPersonType(wppPersonType: string): void {
        this.wppPersonType = wppPersonType;
    }
    public getClntKey(): number {
        return this.clntKey;
    }

    public setClntKey(clntKey: number): void {
        this.clntKey = clntKey;
    }
    public getWppEmploymentType(): string {
        return this.wppEmploymentType;
    }

    public setWppEmploymentType(wppEmploymentType: string): void {
        this.wppEmploymentType = wppEmploymentType;
    }

    public getWppFFirstName(): string {
        return this.wppFFirstName;
    }

    public setWppFFirstName(wppFFirstName: string): void {
        this.wppFFirstName = wppFFirstName;
    }

    public getWppFLastName(): string {
        return this.wppFLastName;
    }

    public setWppFLastName(wppFLastName: string): void {
        this.wppFLastName = wppFLastName;
    }

    public getWppFMiddleName(): string {
        return this.wppFMiddleName;
    }

    public setWppFMiddleName(wppFMiddleName: string): void {
        this.wppFMiddleName = wppFMiddleName;
    }

    public getWppFThirdName(): string {
        return this.wppFThirdName;
    }

    public setWppFThirdName(wppFThirdName: string): void {
        this.wppFThirdName = wppFThirdName;
    }

    public getWppLFirstName(): string {
        return this.wppLFirstName;
    }

    public setWppLFirstName(wppLFirstName: string): void {
        this.wppLFirstName = wppLFirstName;
    }

    public getWppLLastName(): string {
        return this.wppLLastName;
    }

    public setWppLLastName(wppLLastName: string): void {
        this.wppLLastName = wppLLastName;
    }

    public getWppLMiddleName(): string {
        return this.wppLMiddleName;
    }

    public setWppLMiddleName(wppLMiddleName: string): void {
        this.wppLMiddleName = wppLMiddleName;
    }

    public getWppLThirdName(): string {
        return this.wppLThirdName;
    }

    public setWppLThirdName(wppLThirdName: string): void {
        this.wppLThirdName = wppLThirdName;
    }

    public getWppNetMonthlyIncome(): number {
        return this.wppNetMonthlyIncome;
    }

    public setWppNetMonthlyIncome(wppNetMonthlyIncome: number): void {
        this.wppNetMonthlyIncome = wppNetMonthlyIncome;
    }

    public getWppPhoto(): string {
        return this.wppPhoto;
    }

    public setWppPhoto(wppPhoto: string): void {
        this.wppPhoto = wppPhoto;
    }

    public getWppRefreshDate(): Date {
        return this.wppRefreshDate;
    }

    public setWppRefreshDate(wppRefreshDate: Date): void {
        this.wppRefreshDate = wppRefreshDate;
    }

    public getMainMobileNo2(): string {
        return this.mainMobileNo2;
    }

    public setMainMobileNo2(mainMobileNo2: string): void {
        this.mainMobileNo2 = mainMobileNo2;
    }

    public getWppKey(): number {
        return this.wppKey;
    }

    public setWppKey(wppKey: number): void {
        this.wppKey = wppKey;
    }

    public getWppIdentityType(): string {
        return this.wppIdentityType;
    }

    public setWppIdentityType(wppIdentityType: string): void {
        this.wppIdentityType = wppIdentityType;
    }

    public getWppIdentityNumber(): string {
        return this.wppIdentityNumber;
    }

    public setWppIdentityNumber(wppIdentityNumber: string): void {
        this.wppIdentityNumber = wppIdentityNumber;
    }

    public getMainPersonName(): string {
        return this.mainPersonName;
    }

    public setMainPersonName(mainPersonName: string): void {
        this.mainPersonName = mainPersonName;
    }

    public getMainMobileNo1(): string {
        return this.mainMobileNo1;
    }

    public setMainMobileNo1(mainMobileNo1: string): void {
        this.mainMobileNo1 = mainMobileNo1;
    }

    public getWppMaritalStatus(): string {
        return this.wppMaritalStatus;
    }

    public setWppMaritalStatus(wppMaritalStatus: string): void {
        this.wppMaritalStatus = wppMaritalStatus;
    }

    public getWcKey(): number {
        return this.wcKey;
    }

    public setWcKey(wcKey: number): void {
        this.wcKey = wcKey;
    }

    public getWppKeyParent(): number {
        return this.wppKeyParent;
    }

    public setWppKeyParent(wppKeyParent: number): void {
        this.wppKeyParent = wppKeyParent;
    }

    public getWppBirthDate(): Date {
        return this.wppBirthDate;
    }

    public setWppBirthDate(wppBirthDate: Date): void {
        this.wppBirthDate = wppBirthDate;
    }

    public getWppTitle(): string {
        return this.wppTitle;
    }

    public setWppTitle(wppTitle: string): void {
        this.wppTitle = wppTitle;
    }

    public getWppSex(): string {
        return this.wppSex;
    }

    public setWppSex(wppSex: string): void {
        this.wppSex = wppSex;
    }


    public getVersionNo(): number {
        return this.versionNo;
    }

    public setVersionNo(versionNo: number): void {
        this.versionNo = versionNo;
    }


    public getApplicationUser(): User {
        return this.applicationUser;
    }

    public setApplicationUser(applicationUser: User): void {
        this.applicationUser = applicationUser;
    }
    public getBankAccount(): BankAccount {
        return this.bankAccount;
    }

    public setBankAccount(bankAccount: BankAccount): void {
        this.bankAccount = bankAccount;
    }


}