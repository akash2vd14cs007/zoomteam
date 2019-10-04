
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from 'src/app/app.constant';

@Injectable({
providedIn: 'root'
})
export class SearchdataService {
    api_url: string;
    appendpoint: string;
    cpDefaultUrl: string;
    cpDefaultUpdateUrl: string;
    SERVER_URL_Search: string;

    constructor(private http: HttpClient) {
        this.api_url = AppConstant.API_ENDPOINT2;
        this.appendpoint = this.api_url;
        this.SERVER_URL_Search= this.appendpoint+ AppConstant.API_CONFIG.API_URL.MEMBERS.SEARCH;


     }

public getSearch(value):Observable<any> {
return this.http.get(this. SERVER_URL_Search+value);
}
}
