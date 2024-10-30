import { IthmaarPortalEntity } from './IthmaarPortalEntity';

export class IdentityUpdates extends IthmaarPortalEntity {
  ppiKey: number;
  wppKey: number;
  ppiNewExpiryDate: string;
  ppiNewLocalStreetAddress: string;
  ppiNewForeignStreetAddress: string;
  ppiMigrationStatus: string;
  ppiDocType: string;
  ppiUploadedFileName: string;
  wppIdentityNumber: string;
  currentexpirydate: string;
  currentlocaladdress: string;
  currentforeignaddress: string;
  ppiFilePath: string;
  clntKey: number;
  prcKey: number;
  prcName: string;
}
