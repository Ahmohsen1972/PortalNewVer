export class OnlinePaymentsStatusesPgVwDTO {
  public opsKey?: number;
  public opsDate?: Date;
  public opsOnlineStatus?: string;
  public opsOnlineFailureReason?: string;
  public wrfKey?: number;
  public opsPaymentDetail?: any;
  public opsPaymentMethodDetail?: any;
  public opsMigrationStatus?: string;
  public originalStlKey?: number;
  public originalStlCode?: string;
  public opsMigrationFailureReason?: string;
  public wrfType?: string;
  public wrfAmt?: string;
  public wrfOrigStlKey?: string;
  public wrfOrigStlCode?: string;
  public urKey?: number;
  public csrKey?: number;
  public opsPaymentTime?: Date;
}
