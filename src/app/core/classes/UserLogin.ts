export class UserLogin {

  private userName!: string;
  private password!: string;
  private isBusinessUser!: string;


  public getUserName(): string {
    return this.userName;
  }
  public setUserName(value: string) {
    this.userName = value;
  }

  public getPassword(): string {
    return this.password;
  }
  public setPassword(value: string) {
    this.password = value;
  }

  public getIsBusinessUser(): string {
    return this.isBusinessUser;
  }
  public setIsBusinessUser(value: string) {
    this.isBusinessUser = value;
  }

}