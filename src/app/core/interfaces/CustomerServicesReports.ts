import { IthmaarPortalEntity } from './IthmaarPortalEntity';

export class CustomerServicesReportsPgVwDTO extends IthmaarPortalEntity {
  // constructor(parameters) {

  // }

  csrKey: number;
  urKey: number;
  asiKey: number;
  csrCode: string;
  csrDate: Date;
  csrFees: number;
  csrActualFees: number;
  cusKey: number;
  cusName: string;
  settledAmount: number;
  cslKey: number;
  cslCode: string;
  cslLocalName: string;
  fees: number;
  firstTimeFees: string;
  prcKey: number;
  prcName: string;
  comments: string;
  tmpPrcKey: number;
  clntKey: number;
  originalKey: number;
  fileName: string;
  applicationCode: string;
  urPortalCode: string;
  sectionStatus: string;
  fileCreationDate: Date;
  downloadable: string;
  filePath: string;
  requestReference: string;
  referenceKey: number;
  createdBy: number;
  csrApplicationCode: string;
}
