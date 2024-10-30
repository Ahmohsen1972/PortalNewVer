export class FinancialObligation {
    private wfoKey!: number;
    private urKey!: number;
    private wcrKey!: number;
    private wfoAmount!: number;
    private wfoDesc!: string;
    private wfoMonthlyAmount!: number;

    public getWfoKey(): number {
        return this.wfoKey;
    }

    public setWfoKey(wfoKey: number): void {
        this.wfoKey = wfoKey;
    }

    public getUrKey(): number {
        return this.urKey;
    }
    public getWcrKey(): number {
        return this.wcrKey;
    }

    public setWcrKey(wcrKey: number): void {
        this.wcrKey = wcrKey;
    }
    public setUrKey(urKey: number): void {
        this.urKey = urKey;
    }

    public getWfoAmount(): number {
        return this.wfoAmount;
    }

    public setWfoAmount(wfoAmount: number): void {
        this.wfoAmount = wfoAmount;
    }

    public getWfoDesc(): string {
        return this.wfoDesc;
    }

    public setWfoDesc(wfoDesc: string): void {
        this.wfoDesc = wfoDesc;
    }

    public getWfoMonthlyAmount(): number {
        return this.wfoMonthlyAmount;
    }

    public setWfoMonthlyAmount(wfoMonthlyAmount: number): void {
        this.wfoMonthlyAmount = wfoMonthlyAmount;
    }

}

