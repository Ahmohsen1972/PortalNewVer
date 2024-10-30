export class Currency {
    //  private wcr_local_name!: string;
    //  private wcr_code!: string;
    //  private wcr_foreign_name!: string;
    //  private wcr_key!: number;
     // this for retrieving data from postgree
     private wcrKey!: number;
     private wcrCode!: string;
     private wcrLocalName!: string;
     private wcrForeignName!: string;
     private wcrRefreshDate!: Date;
     private wcrOriginalKey!: number;
     private clntKey!: number; 
     private versionNo!: number;



    // public getWcr_local_name(): string {
    //     return this.wcr_local_name;
    // }
    // public setWcr_local_name(value: string) {
    //     this.wcr_local_name = value;
    // }
    
    // public getWcr_code(): string {
    //     return this.wcr_code;
    // }
    // public setWCR_CODE(value: string) {
    //     this.wcr_code = value;
    // }
    
    // public getWcr_foreign_name(): string {
    //     return this.wcr_foreign_name;
    // }
    // public setWcr_foreign_name(value: string) {
    //     this.wcr_foreign_name = value;
    // }
    
    // public getWcr_key(): number {
    //     return this.wcr_key;
    // }
    // public setWcr_key(value: number) {
    //     this.wcr_key = value;
    // }
    
    public getWcrKey(): number {
        return this.wcrKey;
    }
    public setWcrKey(value: number) {
        this.wcrKey = value;
    }
 
    public getWcrCode(): string {
    
        return this.wcrCode;
    }
    public setWcrCode(value: string) {
    
        this.wcrCode = value;
    }
   
    public getWcrLocalName(): string {
        return this.wcrLocalName;
    }
    public setWcrLocalName(value: string) {
        this.wcrLocalName = value;
    }
    
    public getWcrForeignName(): string {
        return this.wcrForeignName;
    }
    public setWcrForeignName(value: string) {
        this.wcrForeignName = value;
    }
    
    public getWcrRefreshDate(): Date {
        return this.wcrRefreshDate;
    }
    public setWcrRefreshDate(value: Date) {
        this.wcrRefreshDate = value;
    }
    
    public getWcrOriginalKey(): number {
        return this.wcrOriginalKey;
    }
    public setWcrOriginalKey(value: number) {
        this.wcrOriginalKey = value;
    }
    public getClntKey(): number {
        return this.clntKey;
    }

    public setClntKey(clntKey: number): void {
        this.clntKey = clntKey;
    }

    public getVersionNo(): number {
        return this.versionNo;
    }

    public setVersionNo(versionNo: number): void {
        this.versionNo = versionNo;
    }

}

