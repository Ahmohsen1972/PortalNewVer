export class Address{
    
    private waKey : number ;
    private wcKey : number ;
    private waLocalStreetAddress : string ;
    private waForeignStreetAddress : string ;
    private waOriginalKey : number ;
    public waPrimary : string ;
    private waRefreshDate : Date ;
    private wcLocalName : string ;
    private wcForeignName : string ;
    private wppKey : number ;

    public getWaKey(): number {
        return this.waKey;
    }

    public setWaKey(waKey: number): void {
        this.waKey = waKey;
    }

    public getWcKey(): number {
        return this.wcKey;
    }

    public setWcKey(wcKey: number): void {
        this.wcKey = wcKey;
    }

    public getWaLocalStreetAddress(): string {
        return this.waLocalStreetAddress;
    }

    public setWaLocalStreetAddress(waLocalStreetAddress: string): void {
        this.waLocalStreetAddress = waLocalStreetAddress;
    }

    public getWaForeignStreetAddress(): string {
        return this.waForeignStreetAddress;
    }

    public setWaForeignStreetAddress(waForeignStreetAddress: string): void {
        this.waForeignStreetAddress = waForeignStreetAddress;
    }

    public getWaOriginalKey(): number {
        return this.waOriginalKey;
    }

    public setWaOriginalKey(waOriginalKey: number): void {
        this.waOriginalKey = waOriginalKey;
    }

    public getWaPrimary(): string {
        return this.waPrimary;
    }

    public setWaPrimary(waPrimary: string): void {
        this.waPrimary = waPrimary;
    }

    public getWaRefreshDate(): Date {
        return this.waRefreshDate;
    }

    public setWaRefreshDate(waRefreshDate: Date): void {
        this.waRefreshDate = waRefreshDate;
    }

    public getWcLocalName(): string {
        return this.wcLocalName;
    }

    public setWcLocalName(wcLocalName: string): void {
        this.wcLocalName = wcLocalName;
    }

    public getWcForeignName(): string {
        return this.wcForeignName;
    }

    public setWcForeignName(wcForeignName: string): void {
        this.wcForeignName = wcForeignName;
    }

    public getWppKey(): number {
        return this.wppKey;
    }

    public setWppKey(wppKey: number): void {
        this.wppKey = wppKey;
    }


}