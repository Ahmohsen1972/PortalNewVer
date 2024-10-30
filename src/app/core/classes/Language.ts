export class Language{
    private langKey:number;
    private langLocalName:string;
    private langIsDefault:string;
    private langForeignName:string;
    private langdisplayOrder:number;
    private langDir:string;
    private langsShortName:string;
    private sysKey:number;
    private clntKey:number

    public getLangKey():number{
        return this.langKey
    }

    public setLangKey(value:number){
      this.langKey=value
    }

    public getLangLocalName():string{
        return this.langLocalName
    }
    public setLangLocalName(value:string){
        this.langLocalName=value
    }
    public getLangIsDefaualt():string{
        return this.langIsDefault
    }
    public setLangIsDefault(value:string){
        this.langIsDefault=value
    }
    public getLangForeignName():string{
        return this.langForeignName
    }
    public setLangForeignName(value:string){
         this.langForeignName=value
    }
    public getLangdisplayOrder():number{
        return this.langdisplayOrder
    }
    public setLangdisplayOrder(value:number){
        this.langdisplayOrder=value
    }
    public getLangDir():string{
        return this.langDir
    }
    public setLangDir(value:string){
        this.langDir=value
    }
    public getLangsShortName():string{
        return this.langsShortName
    }
    public setLangsShortName(value:string){
        this.langsShortName=value
    }
    public getSysKey():number{
      return this.sysKey
    }
    public setSysKey(value:number){
      this.sysKey=value 
    }
    public getClntKey():number{
        return this.clntKey
    }
    public setClntKey(value:number){
        this.clntKey=value
    }

}