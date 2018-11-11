import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { IVehicleResponse } from '../pages/home/home.inetrface';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  getVehicles(): Observable<IVehicleResponse> {
    return this.http.get<IVehicleResponse>(environment.apiUrl + 'map?objectType=VEHICLE');
    
  }

  
}