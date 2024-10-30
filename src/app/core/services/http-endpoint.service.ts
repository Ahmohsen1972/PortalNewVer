import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';
import { IthmaarPortalService } from './ithmaar-portal.service';

@Injectable({
  providedIn: 'root',
})
export class HttpEndpointService {
  private staticParams?: any[];
  constructor(
    private http: HttpClient,
    private ithmaarPortalService: IthmaarPortalService,
    private localstorageservice: LocalStorageService,
    private sessionStorageService: SessionStorageService,
  ) {}

  create(appendedUrl: string, body: any, params?: any[]): Observable<any> {
    this.staticParams = [
      { lang: this.localstorageservice.getItem('currentLang') },
      { sys: 1 },
    ];
    if (params) params = params.concat(this.staticParams);
    else params = this.staticParams;
    let parameters: any;
    if (params != null)
      parameters = this.getObjectKeyValueAsRequestParameters(params);

    return this.http.post(`${environment.baseUrl}${appendedUrl}`, body, {
      params: parameters,
    });
  }

  update(appendedUrl: string, body: any): Observable<any> {
    this.staticParams = [
      { lang: this.localstorageservice.getItem('currentLang') },
      { sys: 1 },
    ];
    let params = this.getObjectKeyValueAsRequestParameters(this.staticParams);
    return this.http.put(`${environment.baseUrl}${appendedUrl}`, body, {
      params: params,
    });
  }

  getAll(appendedUrl: string): Observable<any> {
    this.staticParams = [
      { lang: this.localstorageservice.getItem('currentLang') },
      { sys: 1 },
    ];
    let params = this.getObjectKeyValueAsRequestParameters(this.staticParams);
    return this.http.get(`${environment.baseUrl}${appendedUrl}`, {
      params: params,
    });
  }
  getBy(
    appendedUrl: string,
    parametres: any[],
    paramType: string,
  ): Observable<any> {
    this.staticParams = [
      { lang: this.localstorageservice.getItem('currentLang') },
      { sys: 1 },
    ];
    let params: any;

    if (paramType == 'req') {
      parametres = parametres.concat(this.staticParams);
      params = this.getObjectKeyValueAsRequestParameters(parametres);
      return this.http.get(`${environment.baseUrl}${appendedUrl}`, {
        params: params,
      });
    } else {
      let dependentValues: any[] = this.checkDependentParamExist(parametres);
      let whereClauseValuesObject: Array<{ whereClauseValues: any }> = [];
      if (dependentValues != null) {
        //let whereClauseValuesObject : {[key : string] : any} [] = [] ;
        dependentValues.forEach((appendedValue) => {
          whereClauseValuesObject.push({ whereClauseValues: appendedValue });
        });
      }
      this.staticParams = this.staticParams.concat(whereClauseValuesObject);

      let reqParam = this.getObjectKeyValueAsRequestParameters(
        this.staticParams,
      );
      params = this.getObjectValuesAsPathParameters(parametres);

      return this.http.get(`${environment.baseUrl}${appendedUrl}${params}`, {
        params: reqParam,
      });
    }
  }

  getByForFiles(
    appendedUrl: string,
    parametres: any[],
    paramType: string,
  ): Observable<any> {
    let params: any;
    if (paramType == 'req') {
      params = this.getObjectKeyValueAsRequestParameters(parametres);
      return this.http.get(`${environment.baseUrl}${appendedUrl}`, {
        params: params,
      });
    } else {
      params = this.getObjectValuesAsPathParameters(parametres);
      return this.http.get(`${environment.baseUrl}${appendedUrl}${params}`, {
        responseType: 'blob',
      });
    }
  }

  delete(appendedUrl: string, parametres: any[], paramType: string) {
    this.staticParams = [
      { lang: this.localstorageservice.getItem('currentLang') },
      { sys: 1 },
    ];
    let params: any;

    if (paramType == 'req') {
      parametres = parametres.concat(this.staticParams);
      params = this.getObjectKeyValueAsRequestParameters(parametres);
      return this.http.delete(`${environment.baseUrl}${appendedUrl}`, {
        params: params,
      });
    } else {
      let param = this.getObjectKeyValueAsRequestParameters(this.staticParams);
      params = this.getObjectValuesAsPathParameters(parametres);
      return this.http.delete(`${environment.baseUrl}${appendedUrl}${params}`, {
        params: param,
      });
    }
  }
  softDelete(appendedUrl: string) {
    this.staticParams = [
      { lang: this.localstorageservice.getItem('currentLang') },
      { sys: 1 },
    ];
    let params = this.getObjectKeyValueAsRequestParameters(this.staticParams);

    return this.http.delete(`${environment.baseUrl}${appendedUrl}`, {
      params: params,
    });
  }
  getObjectKeyValueAsRequestParameters(parametres: any[]): HttpParams {
    let params = new HttpParams();
    for (let parameter of parametres) {
      for (let key in parameter) {
        params = params.append(key, parameter[key]);
      }
    }
    return params;
  }

  getObjectValuesAsPathParameters(parametres: any[]): string {
    let params = '';
    for (let parameter of parametres) {
      for (let key in parameter) {
        if (key !== 'whereClauseValues') {
          params = `${params}${'/'}${parameter[key]}`;
        }
      }
    }
    return params;
  }

  checkDependentParamExist(parametres: any[]): any[] {
    let dependentValue: any[] = [];
    for (let parameter of parametres) {
      for (let key in parameter) {
        if (key === 'whereClauseValues') {
          dependentValue.push(parameter[key]);
        }
      }
    }
    return dependentValue;
  }

  /* old code  
  createRequestFormat(modKey:string , prcKey , payload) : any{

    const metaDataObj = {
      modKey : modKey ,
      rolKey :  this.sessionStorageService.getItem('role_key'),
      prcKey : prcKey 
    }

    const RequestObj = {
      metaData : metaDataObj ,
      payload : payload
    };
    this.ithmaarPortalService.log("el request obj ", RequestObj)
    return RequestObj ;

  }
  */
  createRequestFormat(modKey: string, prcKey: string, payload: any): any {
    // Construct metadata object with module and process keys
    const metaDataObj = {
      modKey: modKey,
      rolKey: this.sessionStorageService.getItem('role_key'),
      prcKey: prcKey,
    };

    // Construct the request object with metadata and payload
    const requestObj = {
      metaData: metaDataObj,
      payload: payload,
    };

    // Log the request object for debugging purposes
    this.ithmaarPortalService.log('Request object:', requestObj);

    // Return the constructed request object
    return requestObj;
  }
}
