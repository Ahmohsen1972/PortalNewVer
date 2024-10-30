export class User {

    private usrKey!: number;
    private usrLoginName!: string;
    private usrPasswordHash!: string;
    private usrLocalName!: string;
    private usrForeignName!: string;
    private usrImageURL!: string;
    private usrIsBusinessUser!: string;
    private resetKey!: string;
    private resetDate!: string;
    private usrEmail!: string;
    private usrActivated!: string;
    private usrActivationKey!: string;
    private clntKey!: number;
    private wppIdentityType!: string;
    private wppIdentityNumber!: string;
    private wppMaritalStatus!: string;
    private wcKey!: number;
    private wppKeyParent!: number;
    private wppBirthDate!: string;
    private wppTitle!: string;
    private wppSex!: string;
    private wciMobileNo1!: string;
    private wppEmploymentType!: string;
    private wppKey!: number;
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
    private wppRefreshDate!: string;
    private wppOriginalKey : number ; 
    private mainMobileNo : string ;
    private wppPersonType : string ;
    private applicationCode : string ;
    private migStatus : string ;
    
    
    private idExpiryDate : string ;
    
    
    
    
    public getIdExpiryDates(): string {
        return this.idExpiryDate;
    }

    public setIdExpiryDate(idExpiryDate: string): void {
        this.idExpiryDate = idExpiryDate;
    }





    public getMigStatus(): string {
        return this.migStatus;
    }

    public setMigStatus(migStatus: string): void {
        this.migStatus = migStatus;
    }
    
  

    public getApplicationCode(): string {
        return this.applicationCode;
    }

    public setApplicationCode(applicationCode: string): void {
        this.applicationCode = applicationCode;
    }

   

    public getClntKey(): number {
        return this.clntKey;
    }

    public setClntKey(clntKey: number): void {
        this.clntKey = clntKey;
    }



    public getWppKey(): number {
        return this.wppKey;
    }

    public setWppKey(wppKey: number): void {
        this.wppKey = wppKey;
    }


    public getWppEmploymentType(): string {
        return this.wppEmploymentType;
    }

    public getWciMobileNo1(): string {
        return this.wciMobileNo1;
    }
    public setWciMobileNo1(wciMobileNo1: string): void {
        this.wciMobileNo1 = wciMobileNo1;
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

    public getWppRefreshDate(): string {
        return this.wppRefreshDate;
    }

    public setWppRefreshDate(wppRefreshDate: string): void {
        this.wppRefreshDate = wppRefreshDate;
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

    public getWppBirthDate(): string {
        return this.wppBirthDate;
    }

    public setWppBirthDate(wppBirthDate: string): void {
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




    public getLoginName(): string {
        return this.usrLoginName;
    }

    public setLoginName(loginName: string): void {
        this.usrLoginName = loginName;
    }

    public getPasswordHash(): string {
        return this.usrPasswordHash;
    }

    public setPasswordHash(passwordHash: string): void {
        this.usrPasswordHash = passwordHash;
    }



    public getActivated(): string {
        return this.usrActivated;
    }

    public setActivated(activated: string): void {
        this.usrActivated = activated;
    }


    public getWppOriginalKey(): number {
        return this.wppOriginalKey;
    }

    public setWppOriginalKey(wppOriginalKey: number): void {
        this.wppOriginalKey = wppOriginalKey;
    }

    public getEmail(): string {
        return this.usrEmail;
    }

    public setEmail(email: string): void {
        this.usrEmail = email;
    }

    public getMainMobileNo(): string {
        return this.mainMobileNo;
    }

    public setMainMobileNo(mainMobileNo: string): void {
        this.mainMobileNo = mainMobileNo;
    }

    public getWppPersonType(): string {
        return this.wppPersonType;
    }

    public setWppPersonType(wppPersonType: string): void {
        this.wppPersonType = wppPersonType;
    }

    





    



}


