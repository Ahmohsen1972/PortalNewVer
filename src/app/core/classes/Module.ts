export class Module {
    menuId: number;
    clntId: number;
    usrKey: number;
    private description!: string;
    public getdescription(): string {
        return this.description;
    }
    public setdescription(value: string) {
        this.description = value;
    }
    pmnDescription: string;
    parentMenuId: number;
    pageParam: string;
    pageParam2: string;
    displaySeq: number;
    meunType: number;
    viewName: string;
    displayed: string;
    pagePath: string;
    hrefId: string
    children: [
        {
            menuId: number;
            clntId: number;
            usrKey: number;
            description: string;
            pmnDescription: string;
            parentMenuId: number;
            pageParam: string;
            pageParam2: string;
            displaySeq: number;
            meunType: number;
            viewName: string;
            displayed: string;
            pagePath: string;
            hrefId: string
        }
    ]

}