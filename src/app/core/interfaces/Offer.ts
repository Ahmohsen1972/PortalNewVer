import { Installment } from './Installment';

export class Offer {
  wroKey: number;

  urKey: number;

  wroOfferType: string;

  wroOfferDate: Date;

  wroStatus: string;

  wroFirstInstallmentDate: Date;

  wroFirstInstallmentAmount: number;

  wroLastInstallmentDate: Date;

  wroInstallmentsNo: number;

  wroDownPaymentAmount: number;

  notes: string;

  installments: Installment[];
  wroTotalContractAmt: number;
  wroProfitAmt: number;
}
