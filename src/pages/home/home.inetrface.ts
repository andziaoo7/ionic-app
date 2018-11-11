// I've used type any only to those properties which didn't come from API or because google didn't provide ones

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IMapColor {
  rgb: string;
  alpha: number;
}

export interface IPicture {
  id: string;
  name: string;
  extension: any;
  extensionType: any;
}

export interface IOption {
  center: any;
  zoom: number;
  streetViewControl: boolean;
  fullscreenControl: boolean;
  mapTypeId: string;
}

export interface IVehicle {
  batteryLevelPct: number;
  color: string;
  description: string;
  discriminator: string;
  id: string;
  location: ILocation;
  locationDescription: string;
  mapColor: IMapColor;
  metadata: any;
  name: string;
  picture: IPicture;
  platesNumber: string;
  promotion: any;
  rangeKm: number;
  reservationEnd: null
  sideNumber: string;
  status: string;
  type: string;
}

export interface IVehicleResponse {
  objects: IVehicle[];
}

export interface IIcon {
  path: string;
  fillColor: string;
  fillOpacity: number;
  anchor: any;
  strokeWeight: number;
  scale: number;
  size: any;
}