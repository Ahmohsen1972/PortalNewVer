export class Payment{

    private wrfKey : number ;
    private urKey : number ;
    private wrfType : string ;
    private wrfAmt : number ;
    private wrfGateway : string ;
    private wrfStatus : string ;
    private wrfPaymentDate : Date ;


    public getWrfKey(): number {
        return this.wrfKey;
    }

    public setWrfKey(wrfKey: number): void {
        this.wrfKey = wrfKey;
    }

    public getUrKey(): number {
        return this.urKey;
    }

    public setUrKey(urKey: number): void {
        this.urKey = urKey;
    }

    public getWrfType(): string {
        return this.wrfType;
    }

    public setWrfType(wrfType: string): void {
        this.wrfType = wrfType;
    }

    public getWrfAmt(): number {
        return this.wrfAmt;
    }

    public setWrfAmt(wrfAmt: number): void {
        this.wrfAmt = wrfAmt;
    }

    public getWrfGateway(): string {
        return this.wrfGateway;
    }

    public setWrfGateway(wrfGateway: string): void {
        this.wrfGateway = wrfGateway;
    }

    public getWrfStatus(): string {
        return this.wrfStatus;
    }

    public setWrfStatus(wrfStatus: string): void {
        this.wrfStatus = wrfStatus;
    }

    public getWrfPaymentDate(): Date {
        return this.wrfPaymentDate;
    }

    public setWrfPaymentDate(wrfPaymentDate: Date): void {
        this.wrfPaymentDate = wrfPaymentDate;
    }

    
    

}