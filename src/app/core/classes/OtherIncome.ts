export class OtherIncome{

    private woiKey : number ;
    private wcrKey : number ;
    private wcrCode : string ;
    private wcrLocalName : string ;
    private wcrForeignName : string ;
    private woiNetIncomes : number ;
    private woiSource : string ;
    private wppKey : number ;

    public getWoiKey(): number {
        return this.woiKey;
    }

    public setWoiKey(woiKey: number): void {
        this.woiKey = woiKey;
    }

    public getWcrKey(): number {
        return this.wcrKey;
    }

    public setWcrKey(wcrKey: number): void {
        this.wcrKey = wcrKey;
    }

    public getWcrCode(): string {
        return this.wcrCode;
    }

    public setWcrCode(wcrCode: string): void {
        this.wcrCode = wcrCode;
    }

    public getWcrLocalName(): string {
        return this.wcrLocalName;
    }

    public setWcrLocalName(wcrLocalName: string): void {
        this.wcrLocalName = wcrLocalName;
    }

    public getWcrForeignName(): string {
        return this.wcrForeignName;
    }

    public setWcrForeignName(wcrForeignName: string): void {
        this.wcrForeignName = wcrForeignName;
    }

    public getWoiNetIncomes(): number {
        return this.woiNetIncomes;
    }

    public setWoiNetIncomes(woiNetIncomes: number): void {
        this.woiNetIncomes = woiNetIncomes;
    }

    public getWoiSource(): string {
        return this.woiSource;
    }

    public setWoiSource(woiSource: string): void {
        this.woiSource = woiSource;
    }

    public getWppKey(): number {
        return this.wppKey;
    }

    public setWppKey(wppKey: number): void {
        this.wppKey = wppKey;
    }



}