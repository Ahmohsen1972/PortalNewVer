export class Bank {

    private wbKey:number ;
    private wbCode:string;
    private wbLocalName:string;
    private wbForeignName:string ;
    private sbRefreshDate:Date ;
    private wbOriginalKey:number ;
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

    public getWbKey(): number {
        return this.wbKey;
    }
    public setWbKey(value: number) {
        this.wbKey = value;
    }

    public getWbCode(): string {
        return this.wbCode;
    }
    public setWbCode(value: string) {
        this.wbCode = value;
    }
    public getWbLocalName(): string {
        return this.wbLocalName;
    }
    public setWbLocalName(value: string) {
        this.wbLocalName = value;
    }
    public getWbForeignName(): string {
        return this.wbForeignName;
    }
    public setWbForeignName(value: string) {
        this.wbForeignName = value;
    }
    public getSbRefreshDate(): Date {
        return this.sbRefreshDate;
    }
    public setSbRefreshDate(value: Date) {
        this.sbRefreshDate = value;
    }
    public getWbOriginalKey(): number {
        return this.wbOriginalKey;
    }
    public setWbOriginalKey(value: number) {
        this.wbOriginalKey = value;
    }

}

