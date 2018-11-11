import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { FilterModalService } from '../../services/filter-modal.service';
import { HttpParams } from '@angular/common/http';
import { IFilter, IFilterResponse, IFilterTypeData, ISelectedData } from './filter-modal.interface';

@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {
  filters: IFilter[];
  selectedFilters: ISelectedData[] = []
  constructor(private view: ViewController,
              private filterModalService: FilterModalService) {
  }

  ionViewWillLoad() {
    this.filterModalService.getFilters().subscribe((data: IFilterResponse) => {
      this.filters = data.filters;
    })
  }

  onSelectedOption(filter: IFilter, option: IFilterTypeData) {
    const dataToPush: ISelectedData = {
      id: filter.id,
      isChecked: filter.checked,
      property: option.id
    };

    this.selectedFilters.push(dataToPush);
  }

  closeFilterModel() {
    this.view.dismiss();
  }

  onMapFilter() {
    let httpParams: HttpParams = new HttpParams();

    this.selectedFilters.forEach((filter: ISelectedData) => {
      if(filter.isChecked ) {
        httpParams = httpParams.append(filter.id, filter.property)
      }
    })

    this.filterModalService.getFilteredData(httpParams).subscribe((data: any[]) => {
      this.view.dismiss(data);
    })
  }
}
