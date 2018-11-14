import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { FilterModalService } from '../../services/filter-modal.service';
import { HttpParams } from '@angular/common/http';
import { IFilter, IFilterResponse, IFilterTypeData, ISelectedData } from './filter-modal.interface';
import { findIndex } from 'lodash';

@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {
  filters: IFilter[];
  selectedFilters: ISelectedData[] = [];
  option: any;
  constructor(private view: ViewController,
              private filterModalService: FilterModalService) {
  }

  ionViewWillLoad() {
    const cachedFilters: string = sessionStorage.getItem('filters');

    if(cachedFilters) {
      this.filters = JSON.parse(cachedFilters);
    } else {
      this.filterModalService.getFilters().subscribe((data: IFilterResponse) => {
        this.filters = data.filters;
      })
    }
  }

  onSelectedOption(filter: IFilter, option: IFilterTypeData) {
    if(this.selectedFilters.length) {
      this.selectedFilters.map(data => {
        if (data.id === filter.id) {
          const index: number = findIndex(this.selectedFilters, data);

          this.selectedFilters.splice(index, 1);
        }})
    }
  
    const dataToPush: ISelectedData = {
      id: filter.id,
      isChecked: filter.checked,
      property: option.id,
      objectType: filter.objectType,
    };

    filter.selectedFilter = option.id;
    this.selectedFilters.push(dataToPush);
  }

  closeFilterModel() {
    this.view.dismiss();
  }

  onMapFilter() {
    let httpParams: HttpParams = new HttpParams();

    this.selectedFilters.forEach((filter: ISelectedData) => {
      if(filter.isChecked ) {
        httpParams = httpParams.append('objectType', filter.objectType);
        httpParams = httpParams.append(filter.id, filter.property)
      }
    });

    this.filterModalService.getFilteredData(httpParams).subscribe((data: any) => {
      sessionStorage.setItem('filters', JSON.stringify(this.filters));
      this.view.dismiss(data.objects);
    })
  }
}
