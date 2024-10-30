export class Employer{
    private weKey!: number;
    private weCode!: string;
    private weLocalName!: string;
    private weForeignName!: string;

    private clntKey!: number; 
    private versionNo!: number;


    
    public getWeKey(): number {
        return this.weKey;
    }
    public setWeKey(value: number) {
        this.weKey = value;
    }
    public getWeCode(): string {
        return this.weCode;
    }
    public setWeCode(value: string) {
        this.weCode = value;
    }
    public getWeLocalName(): string {
        return this.weLocalName;
    }
    public setWeLocalName(value: string) {
        this.weLocalName = value;
    }
    public getWeForeignName(): string {
        return this.weForeignName;
    }
    public setWeForeignName(value: string) {
        this.weForeignName = value;
    }

    public getClntKey(): number {
        return this.clntKey;
    }

    public setClntKey(clntKey: number): void {
        this.clntKey = clntKey;
    }

    public getVersionNo(): number {
        return this.versionNo;
    }

    public setVersionNo(versionNo: number): void {
        this.versionNo = versionNo;
    }


    
}