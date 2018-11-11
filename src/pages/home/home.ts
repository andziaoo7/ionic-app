import { Component, ViewChild, ElementRef } from '@angular/core';
import { Modal, NavController, ModalController } from 'ionic-angular';
import { HomeService } from '../../services/home.service';
import { IOption, IIcon, IVehicle, IVehicleResponse } from './home.inetrface';

declare var google: any;
declare var MarkerClusterer:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('carMap') carMapRef: ElementRef;
  vehicles: IVehicle[];
  map: any;
  markers: any[] = [];
  constructor(public navCtrl: NavController,
              private homeService: HomeService,
              private modal: ModalController) {
  }

  ionViewDidLoad() {
    this.homeService.getVehicles().subscribe((data: IVehicleResponse) => {
      this.vehicles = data.objects;
      this.showMap();
      this.getMarkers(this.vehicles);
    });
  }

  openFilterModal() {
    const filterModal: Modal = this.modal.create('FilterModalPage');

    filterModal.present();
    // on closed modal update data, type any since any data isn't coming from API
    filterModal.onWillDismiss((filteredData: any[]) => {
      if(filteredData) {
        this.getMarkers(filteredData);
      }
    })
  }

  private showMap() {
    // default location
    const location: any = new google.maps.LatLng(51.1079, 17.0385);

    // map options
    const options: IOption  = {
      center: location,
      zoom: 10,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeId: 'roadmap',
    }

    
     this.map = new google.maps.Map(this.carMapRef.nativeElement, options);
  }

  private getMarkers(vehicles: IVehicle[]) {
    const vehiclesLength: number = vehicles.length;
  
    for (let i = 0; i < vehiclesLength; i++) {
       this.addMarkersToMap(vehicles[i]);
    }

    // creating clustering on map
    const markerCluster: any = new MarkerClusterer(this.map, this.markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }

  private addMarkersToMap(vehicle: IVehicle) {
    // TODO set different path for POI icon
    var icon: IIcon = {
      path: "M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z",
      fillColor: this.setMarkerColor(vehicle),
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: 0.05,
      size: new google.maps.Size(20, 32),
    }

    const position: any = new google.maps.LatLng(vehicle.location.latitude, vehicle.location.longitude);
    const vehicleMarker: any = new google.maps.Marker({
      position: position, 
      title: vehicle.name,
      icon: icon,
    });

    vehicleMarker.setMap(this.map);
    this.markers.push(vehicleMarker);
  }

  private setMarkerColor(vehicle: IVehicle): string {
    if(vehicle.batteryLevelPct <= 30) {
      return '#e53935';
    } else if(vehicle.batteryLevelPct > 30 && vehicle.batteryLevelPct <= 60) {
      return '#FB8C00';
    } else if(vehicle.batteryLevelPct > 60 && vehicle.batteryLevelPct <= 90) {
      return '#FDD835';
    } else {
      return '#66BB6A';
    }
  }
}
