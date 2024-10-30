export class RepaymentParam{
    private principal: number ;
	private profitRate: number ;
	private downpaymentRatio: number ;
	private tenure: number ;
	private curKey: number ;
    private rpmKey: number ;
    private valueDate: Date ;
    private graceDays: number ;
    private valueDateString!: string;

    public getPrincipal(): number {
        return this.principal;
    }

    public setPrincipal(principal: number): void {
        this.principal = principal;
    }

    public getProfitRate(): number {
        return this.profitRate;
    }

    public setProfitRate(profitRate: number): void {
        this.profitRate = profitRate;
    }

    public getDownpaymentRatio(): number {
        return this.downpaymentRatio;
    }

    public setDownpaymentRatio(downpaymentRatio: number): void {
        this.downpaymentRatio = downpaymentRatio;
    }

    public getTenure(): number {
        return this.tenure;
    }

    public setTenure(tenure: number): void {
        this.tenure = tenure;
    }

    public getCurKey(): number {
        return this.curKey;
    }

    public setCurKey(curKey: number): void {
        this.curKey = curKey;
    }

    public getRpmKey(): number {
        return this.rpmKey;
    }

    public setRpmKey(rpmKey: number): void {
        this.rpmKey = rpmKey;
    }

    public getValueDate(): Date {
        return this.valueDate;
    }

    public setValueDate(valueDate: Date): void {
        this.valueDate = valueDate;
    }

    public getGraceDays(): number {
        return this.graceDays;
    }

    public setGraceDays(graceDays: number): void {
        this.graceDays = graceDays;
    }

    public getValueDateString(): string {
        return this.valueDateString;
    }

    public setValueDateString(graceDays: string): void {
        this.valueDateString = graceDays;
    }

}