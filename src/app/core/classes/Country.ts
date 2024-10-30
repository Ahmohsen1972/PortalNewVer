export class Country {
    private wcKey!: number;
    private wcLocalName!: string;
    private wcForeignName!: string;
    private wcRefreshDate!: Date;
    private wcOriginalKey!: number;
    private wcrKey!: number;
    private wcrCode!: string;
    private wcrLocalName!: string;
    private wcrForeignName!: string;
    private clntKey :number;
    private versionNo : number;

    public getClntKey() :number {
        return this.clntKey;
    }

    public setClntKey(clntKey :number): void {
        this.clntKey = clntKey;
    }

    public getVersionNo(): number {
        return this.versionNo;
    }

    public setVersionNo(versionNo: number): void {
        this.versionNo = versionNo;
    }


    // public getWc_local_name(): string {
    //     return this.wc_local_name;
    // }
    // public setWclocal_name(value: string) {
    //     this.wc_local_name = value;
    // }

    // public getWc_foreign_name(): string {
    //     return this.wc_foreign_name;
    // }
    // public setWc_foreign_name(value: string) {
    //     this.wc_foreign_name = value;
    // }


    // public getWc_original_key(): number {
    //     return this.wc_original_key;
    // }
    // public setWc_original_key(value: number) {
    //     this.wc_original_key = value;
    // }

    // public getWcr_key(): number {
    //     return this.wcr_key;
    // }
    // public setWcr_key(value: number) {
    //     this.wcr_key = value;
    // }

    public getWcKey(): number {
        return this.wcKey;
    }
    public setWcKey(value: number) {
        this.wcKey = value;
    }
    public getWcLocalName(): string {
        return this.wcLocalName;
    }
    public setWcLocalName(value: string) {
        this.wcLocalName = value;
    }
    public getWcForeignName(): string {
        return this.wcForeignName;
    }
    public setWcForeignName(value: string) {
        this.wcForeignName = value;
    }
    public getWcRefreshDate(): Date {
        return this.wcRefreshDate;
    }
    public setWcRefreshDate(value: Date) {
        this.wcRefreshDate = value;
    }
    
    public getWcOriginalKey(): number {
        return this.wcOriginalKey;
    }
    public setWcOriginalKey(value: number) {
        this.wcOriginalKey = value;
    }
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

    /////////////////////////////////////////////////////////////////////////////
    
}