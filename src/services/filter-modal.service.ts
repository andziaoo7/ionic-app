import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { FilterTypes } from '../pages/filter-modal/filterTypes.enum';
import { pick } from 'lodash';
import { IFilterResponse, IFilterTypeData, IFilter } from '../pages/filter-modal/filter-modal.interface';

@Injectable()
export class FilterModalService {
  readonly filterType = FilterTypes;
  constructor(private http: HttpClient) { }

  getFilters(): Observable<IFilterResponse> {
    return this.http.get<any>(environment.apiUrl + 'map/filters').pipe(
      tap((data: IFilterResponse) => {
        const allowedTypes: FilterTypes[] = [
          this.filterType.VEHICLE_MODEL,
          this.filterType.VEHICLE_TYPE,
        ];
        
        // extract from current filters only the needed ones
        const filteredObj: Object = pick(data.filters, allowedTypes);

        data.filters = filteredObj;
        data.filters = this.createArray(data.filters);
      }
    ));
  }

  getFilteredData(filterParams: HttpParams): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'map', {params: filterParams});
  }

  private createArray(filters: Object): IFilter[] {
    const filtersArray: Array<Object> = Object.keys(filters).map(i => filters[i]);
    const vehicleModel: IFilterTypeData[] = this.createFiltersDataArray(filtersArray[0]);
    const vehicleType: IFilterTypeData[] = this.createFiltersDataArray(filtersArray[1]);

    return this.convertedFilters(vehicleModel, vehicleType);
  }

  private createFiltersDataArray(filtersData: Object): IFilterTypeData[] {
    var arrayData: IFilterTypeData[] = [];

    for(var i in filtersData) {
      var obj: any = {};

      obj['id'] = i;
      obj['name'] = filtersData[i];
      arrayData.push(obj);
    }

    return arrayData;
  }

  private convertedFilters(vehicleModel, vehicleType): IFilter[] {
    return [
      {
        id: 'vehicleType',
        name: 'Type',
        data: vehicleType,
        checked: false,
        objectType: 'VEHICLE',
        selectedFilter: '',
      },
      {
        id: 'vehicleModel', 
        name: 'Vehicle',
        data: vehicleModel,
        checked: false,
        objectType: 'VEHICLE',
        selectedFilter: '',
      }
    ]
  }
}