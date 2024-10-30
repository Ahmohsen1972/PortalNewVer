export class TermCondition {
private wtcKey:number ;
private wtcLocalName:string;
private wtcForeignName:string;
private clntKey!: number; 
private versionNo!: number;
private wtcType : string ;

public getWtcKey(): number {
    return this.wtcKey;
}
public setWtcKey(value: number) {
    this.wtcKey = value;
}

public getWtcLocalName(): string {
    return this.wtcLocalName;
}
public setWtcLocalName(value: string) {
    this.wtcLocalName = value;
}
public getWtcForeignName(): string {
    return this.wtcForeignName;
}
public setWtcForeignName(value: string) {
    this.wtcForeignName = value;
}
public getWtcType(): string {
    return this.wtcType;
}
public setWtcType(value: string) {
    this.wtcType = value;
}

public setClntKey(value: number) {
    this.clntKey = value;
}
public getClntKey(): number {
    return this.clntKey;
}

public setVersionNo(value: number) {
    this.versionNo = value;
}
public getversionNo(): number {
    return this.versionNo;
}

}