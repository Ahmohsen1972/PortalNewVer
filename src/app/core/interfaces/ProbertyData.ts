export interface ProbertyData {
  maKey: number;

  // maAllignament: string; //maDbColumnName: string;

  // maDependentAttributes: string;

  //maDisplaySequence:number;

  // maForeignName: string;

  //maFormat: string;

  // maHashelp: string;

  //maLocalName: string;
  //maTechnicalName: string;

  // maViewName: string;
  // sysKey:number;

  // apsKey:number;
  // prcName: string;

  //rolLocalName: string;
  //ahdHelp: string;

  //ahdTooltip: string;

  maDataType: string;

  maMaxVal: number;

  maMinVal: number;

  maPageConttrolName: string;

  maSourceType: string;

  modKey: number;

  prcKey: number;

  rolKey: number;

  apsRequired: string;

  apsEnabled: string;

  apsVisible: string;

  langKey: number;

  ahdCaption: string;

  ilmKey: number;

  lovKey: number;

  langShortName: string;

  parentTo: { [key: string]: string[] };

  childOf: string;

  wacKey: number;
}
