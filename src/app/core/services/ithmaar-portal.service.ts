import { Observable, of } from 'rxjs';
import { DatePipe, formatNumber } from '@angular/common';
import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { TransferDataService } from './transfer-data.service';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class IthmaarPortalService {
  constructor(
    private datePipe: DatePipe,
    private transferDataService: TransferDataService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  private arMonth: { [key: string]: string } = {
    Jan: 'يناير',
    Feb: 'فبراير',
    Mar: 'مارس',
    Apr: 'ابريل',
    May: 'مايو',
    Jun: 'يونيو',
    Jul: 'يوليو',
    Aug: 'أغسطس',
    Sep: 'سبتمبر',
    Oct: 'أكتوبر',
    Nov: 'نوفمبر',
    Dec: 'ديسمبر',
  };

  private arPeriod: { [key: string]: string } = {
    AM: 'ص',
    PM: 'م',
  };

  getDateFormat(value: Date | string | null | undefined): string {
    if (!value) {
      // Handle cases where the value is null or undefined
      return '';
    }

    // Ensure value is a Date object or a valid date string
    const date = new Date(value);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date value provided');
      return '';
    }

    // Use DatePipe to format the date
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  /* old code
    
     monthTranslate(monthName:string){
      let arMonth = {
        Jan:'يناير',
        Feb:'فبراير',
        Mar:'مارس',
        Apr:'ابريل',
        May:'مايو',
        Jun:'يونيو',
        Jul:'يوليو',
        Aug:'أغسطس',
        Sep:'سبتمبر',
        Oct:'أكتوبر',
        Nov:'نوفمبر',
        Dec:'ديسمبر',
      };
      return arMonth[monthName];
    
      }
    */
  monthTranslate(monthName: string): string {
    // Normalize the monthName to capitalize the first letter and make the rest lowercase
    const normalizedMonthName =
      monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase();

    // Return the Arabic month name or a default message if the month name is not found
    return this.arMonth[normalizedMonthName] || 'Unknown month';
  }

  /*    
    periodTranslate(periodName:string){
      let arPeriod = {
        AM:'ص',
        PM:'م',
      };
      return arPeriod[periodName];
    }
    */
  periodTranslate(periodName: string): string {
    // Normalize the periodName to uppercase to match the dictionary keys
    const normalizedPeriodName = periodName.toUpperCase();

    // Return the Arabic period name or a default message if the period name is not found
    return this.arPeriod[normalizedPeriodName] || 'Unknown period';
  }

  getDatePipeFormat(value: string): string {
    const options: any = { dateStyle: 'long' };
    let lang: string = this.localStorageService.getItem('currentLang');
    const pipe = new DatePipe('en-US');

    let formattedDate = pipe.transform(value, 'MMM d, y');
    if (formattedDate != null && formattedDate != undefined && lang === 'AR') {
      return new Intl.DateTimeFormat('ar-eg', options).format(
        new Date(formattedDate),
      );
      //value = this.monthTranslate(value.split(' ')[0]) + ' ' + value.substring(4);
    }
    return formattedDate || 'Invalid date';
  }

  getDateTimePipeFormat(value: string): string {
    const options: any = { dateStyle: 'long', timeStyle: 'medium' };
    let lang: string = this.localStorageService.getItem('currentLang');
    const pipe = new DatePipe('en-US');
    let formattedDate = pipe.transform(value, 'MMM d, y, h:mm:ss a');
    if (formattedDate != null && formattedDate != undefined && lang === 'AR') {
      // value = this.monthTranslate(value.split(' ')[0]) + ' ' + value.substring(4);
      // value = value.slice(0,-2) + this.periodTranslate(value.substring(value.length - 2));
      return new Intl.DateTimeFormat('ar-eg', options).format(new Date(value));
    }
    return formattedDate || 'Invalid date';
  }

  /* old code   
    filterLovGeneral(childOf,form,pageName): any[] {
      let whereClauseParams: any[] = [];  
      if (childOf != null) {
          let itemDetailsChildWhereClause: any[] = childOf[pageName];
          itemDetailsChildWhereClause.forEach(control => {
            whereClauseParams.push({ whereClauseValues: form[control]==undefined&&pageName=='attributePage'?
                                     this.sessionStorageService.getItem(control):form[control] });
          })   
      }
      
      return whereClauseParams;
    }

    */

  filterLovGeneral(
    childOf: { [key: string]: string[] },
    form: { [key: string]: any },
    pageName: string,
  ): any[] {
    const whereClauseParams: any[] = [];

    if (childOf && childOf[pageName]) {
      const itemDetailsChildWhereClause: string[] = childOf[pageName];

      itemDetailsChildWhereClause.forEach((control: string) => {
        const controlValue = form[control];

        // Assuming this.sessionStorageService.getItem(control) returns the value from session storage
        const value =
          controlValue === undefined && pageName === 'attributePage'
            ? this.sessionStorageService.getItem(control)
            : controlValue;

        whereClauseParams.push({ whereClauseValues: value });
      });
    } else {
      console.warn(`No data found for page: ${pageName}`);
    }

    return whereClauseParams;
  }

  /* old code 
    handleDynamicLov( controlName,probertyData , form,pageName) {
      
      if (probertyData[controlName]['parentTo'] !== null) { 
      
        let parentToControls: string[] = probertyData[controlName]['parentTo'][pageName];
        parentToControls.forEach(control => {
          this.handleFilterationOfDependentLov(control  , form);
        })
  
        }
  
      }
  handleFilterationOfDependentLov(controlName , form) {
   
        form.patchValue({
        [controlName]: ''
       })
   }
 
*/
  handleDynamicLov(
    controlName: string,
    probertyData: any,
    form: any,
    pageName: string,
  ): void {
    const controlData = probertyData[controlName];

    // Check if parentTo exists and is not null
    if (
      controlData &&
      controlData['parentTo'] &&
      controlData['parentTo'][pageName]
    ) {
      const parentToControls: string[] = controlData['parentTo'][pageName];

      parentToControls.forEach((control: string) => {
        this.handleFilterationOfDependentLov(control, form);
      });
    } else {
      console.warn(
        `No dependent controls found for ${controlName} on page ${pageName}`,
      );
    }
  }

  handleFilterationOfDependentLov(controlName: string, form: any): void {
    if (form && typeof form.patchValue === 'function') {
      form.patchValue({
        [controlName]: '',
      });
    } else {
      console.error(
        'Form object is invalid or does not have patchValue method.',
      );
    }
  }

  log(txt: any, msg?: any) {
    //console.log(txt , msg);
  }

  disablingArrows(id: string) {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Element with id ${id} not found.`);

    }

    // Event handler for keydown
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault();
      }
    };

    // Event handler for wheel
    const handleWheel = () => {
      element.blur();
    };

    // Add event listeners
    element.addEventListener('keydown', handleKeyDown);
    element.addEventListener('wheel', handleWheel);

    // Optionally, return a cleanup function to remove the event listeners later
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      element.removeEventListener('wheel', handleWheel);
    };

    /* old code ahmohsen 

  disablingArrows(id:string){
    document.getElementById(id).addEventListener('keydown', function(e) {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
          e.preventDefault();
      }
    });

      document.getElementById(id).addEventListener('wheel', function(e) {
        document.getElementById(id).blur()
    });
  }
    */
  }

  validateLovValue(lovValue: any, lovSourceData: any): Observable<boolean> {
    let result: boolean = false;
    let value = lovValue.target.value;
    lovSourceData.filter((value) => {
      if (
        value.local_name
          .toLowerCase()
          .includes(lovValue.target.value.toLowerCase())
      ) {
        this.transferDataService.lovMatchedObject = value;
        result = true;
      }
    });
    if (value == '' || value == null || value == undefined) {
      result = false;
    }
    return of(result);
  }
  numberWithCommas(value): string {
    let formattedNumber = formatNumber(value, this.locale, '1.0-2');
    this.log('<<<___>>>', formattedNumber);
    return formattedNumber;
  }
  numberWithCommas1(value) {
    this.log(
      'conversion __________ >> ',
      value.toLocaleString('en-us', { maximumFractionDigits: 0 }),
    );
    return of(value.toLocaleString('en-us', { maximumFractionDigits: 0 }));
  }
  numberWithCommas2(value) {
    var parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return of(parts.join('.'));
  }
}
