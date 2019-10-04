import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class DashboarddataService {
    api_url: string;
    appendpoint: string;
    cpDefaultUrl: string;
    cpDefaultUpdateUrl: string;
    SERVER_URL_Mem: string;

    constructor(private http: HttpClient) {
        this.api_url = AppConstant.API_ENDPOINT2;
        this.appendpoint = this.api_url;
        this.SERVER_URL_Mem= this.appendpoint+ AppConstant.API_CONFIG.API_URL.MEMBERS.GETMEMBER;


     }


    public getMember():Observable <any> {
      return this.http.get(this.SERVER_URL_Mem);
      }

  public getDept() {
    return this.http.get(this.SERVER_URL_Mem);
  }

}
