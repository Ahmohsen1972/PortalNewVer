export class Attachment{

    private wadKey : number ;
    private wrdKey : number ;
    private urKey : number ;
    private wadOriginality : string ;
    private wadName : string ;
    private wadSubmissionDate : Date ;
    private expiryDate : Date ;
    private wrdLocalName : string ;
    private wrdForeginName : string ;
    private wadDocType: string ;
    private wadTrxLevel: string ;
    

    public getWadKey(): number {
        return this.wadKey;
    }

    public setWadKey(wadKey: number): void {
        this.wadKey = wadKey;
    }

    public getWrdKey(): number {
        return this.wrdKey;
    }

    public setWrdKey(wrdKey: number): void {
        this.wrdKey = wrdKey;
    }

    public getUrKey(): number {
        return this.urKey;
    }

    public setUrKey(urKey: number): void {
        this.urKey = urKey;
    }

    public getWadOriginality(): string {
        return this.wadOriginality;
    }

    public setWadOriginality(wadOriginality: string): void {
        this.wadOriginality = wadOriginality;
    }

    public getWadName(): string {
        return this.wadName;
    }

    public setWadName(wadName: string): void {
        this.wadName = wadName;
    }

    public getWadSubmissionDate(): Date {
        return this.wadSubmissionDate;
    }

    public setWadSubmissionDate(wadSubmissionDate: Date): void {
        this.wadSubmissionDate = wadSubmissionDate;
    }

    public getExpiryDate(): Date {
        return this.expiryDate;
    }

    public setExpiryDate(expiryDate: Date): void {
        this.expiryDate = expiryDate;
    }

    public getWrdLocalName(): string {
        return this.wrdLocalName;
    }

    public setWrdLocalName(wrdLocalName: string): void {
        this.wrdLocalName = wrdLocalName;
    }

    public getWrdForeginName(): string {
        return this.wrdForeginName;
    }

    public setWrdForeginName(wrdForeginName: string): void {
        this.wrdForeginName = wrdForeginName;
    }

}