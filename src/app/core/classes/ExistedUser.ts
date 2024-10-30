export class ExistedUser{


private clntKey!: number;
private idType!: string;
private idNumber!: string;
private mobileNo!: string;


public getClntKey(): number {
    return this.clntKey;
}

public setClntKey(clntKey: number): void {
    this.clntKey = clntKey;
}

public getIdType(): string {
    return this.idType;
}

public setIdType(idType: string): void {
    this.idType = idType;
}

public getIdNumber(): string {
    return this.idNumber;
}

public setIdNumber(idNumber: string): void {
    this.idNumber = idNumber;
}

public getMobileNo(): string {
    return this.mobileNo;
}

public setMobileNo(mobileNo: string): void {
    this.mobileNo = mobileNo;
}

}