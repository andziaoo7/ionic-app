export interface IFilterResponse {
  filters: any;
}

export interface IFilterTypeData {
  id: string;
  name: string;
}

export interface IFilter {
  id: string;
  name: string;
  data: IFilterTypeData[];
  checked: boolean;
}

export interface ISelectedData {
  id: string;
  isChecked: boolean;
  property: string;
}