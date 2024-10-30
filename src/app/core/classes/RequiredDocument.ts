export class RequiredDocument {
    private wrdKey!: number;
    private wrdLocalName!: string;
    private wrdForeignName!: string;
    private versionNo!: number;
    private clntKey :number;
    private wrdIsForBp :string;
    private wrdIntegrationCode :string;

    public getClntKey(): number {
        return this.clntKey;
    }

    public setClntKey(clntKey:number): void {
        this.clntKey = clntKey;
    }

    public getVersionNo(): number {
        return this.versionNo;
    }

    public setVersionNo(versionNo: number): void {
        this.versionNo = versionNo;
    }


    public getWrdKey(): number {
        return this.wrdKey;
    }

    public setWrdKey(wrdKey: number): void {
        this.wrdKey = wrdKey;
    }

    public getWrdLocalName(): string {
        return this.wrdLocalName;
    }

    public setWrdLocalName(wrdLocalName: string): void {
        this.wrdLocalName = wrdLocalName;
    }

    public getWrdIsForBp(): string {
        return this.wrdIsForBp;
    }

    public setWrdIsForBp(wrdIsForBp: string): void {
        this.wrdIsForBp = wrdIsForBp;
    }

    public getWrdForeignName(): string {
        return this.wrdForeignName;
    }

    public setWrdForeignName(wrdForeignName: string): void {
        this.wrdForeignName = wrdForeignName;
    }
    public getWrdIntegrationCode(): string {
        return this.wrdIntegrationCode;
    }

    public setWrdIntegrationCode(wrdIntegrationCode: string): void {
        this.wrdIntegrationCode = wrdIntegrationCode;
    }

    

}