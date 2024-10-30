import { Data } from '@angular/router';

export class RequestOffer {
    private wroKey!: number;
    private urKey!: number;
    private wroOfferType!: string;
    private wroOfferDate!: Date;
    private wroStatus!: string;
    private wroFirstInstallmentDate!: Date;
    private wroFirstInstallmentAmount!: number;
    private wroLastInstallmentDate!: Data;
    private wroInstallmentsNo!: number;
    private wroDownPaymentAmount!: number;
    private notes!: string;

    public getWroKey(): number {
        return this.wroKey;
    }

    public setWroKey(wroKey: number): void {
        this.wroKey = wroKey;
    }

    public getUrKey(): number {
        return this.urKey;
    }

    public setUrKey(urKey: number): void {
        this.urKey = urKey;
    }

    public getWroOfferType(): string {
        return this.wroOfferType;
    }

    public setWroOfferType(wroOfferType: string): void {
        this.wroOfferType = wroOfferType;
    }

    public getWroOfferDate(): Date {
        return this.wroOfferDate;
    }

    public setWroOfferDate(wroOfferDate: Date): void {
        this.wroOfferDate = wroOfferDate;
    }

    public getWroStatus(): string {
        return this.wroStatus;
    }

    public setWroStatus(wroStatus: string): void {
        this.wroStatus = wroStatus;
    }

    public getWroFirstInstallmentDate(): Date {
        return this.wroFirstInstallmentDate;
    }

    public setWroFirstInstallmentDate(wroFirstInstallmentDate: Date): void {
        this.wroFirstInstallmentDate = wroFirstInstallmentDate;
    }

    public getWroFirstInstallmentAmount(): number {
        return this.wroFirstInstallmentAmount;
    }

    public setWroFirstInstallmentAmount(wroFirstInstallmentAmount: number): void {
        this.wroFirstInstallmentAmount = wroFirstInstallmentAmount;
    }

    public getWroLastInstallmentDate(): Data {
        return this.wroLastInstallmentDate;
    }

    public setWroLastInstallmentDate(wroLastInstallmentDate: Data): void {
        this.wroLastInstallmentDate = wroLastInstallmentDate;
    }

    public getWroInstallmentsNo(): number {
        return this.wroInstallmentsNo;
    }

    public setWroInstallmentsNo(wroInstallmentsNo: number): void {
        this.wroInstallmentsNo = wroInstallmentsNo;
    }

    public getWroDownPaymentAmount(): number {
        return this.wroDownPaymentAmount;
    }

    public setWroDownPaymentAmount(wroDownPaymentAmount: number): void {
        this.wroDownPaymentAmount = wroDownPaymentAmount;
    }
    public getNotes(): string {
        return this.notes;
    }

    public setNotes(notes: string): void {
        this.notes = notes;
    }

}
