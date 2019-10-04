import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/app.constant';


@Injectable({
  providedIn: 'root'
})
export class DesignationdataService {
    // appSettings: any = appSettings;
    api_url: string;
    appendpoint: string;
    cpDefaultUrl: string;
    cpDefaultUpdateUrl: string;
    SERVER_URL_ADD: string;
    SERVER_URL: string;
    SERVER_URL_DESG_DEL: string;
    Concat:string;
    PAGINATION:string;



    constructor(private http: HttpClient,private CommonHttpService:CommonHttpService) {
        this.api_url = AppConstant.API_ENDPOINT1;
        this.appendpoint = this.api_url;
        this.SERVER_URL= this.appendpoint+ AppConstant.API_CONFIG.API_URL.SETTINGS.GETDESIGNATION;
        this.SERVER_URL_ADD= this.appendpoint+ AppConstant.API_CONFIG.API_URL.SETTINGS.INSERTDESIGNATION;
        this.SERVER_URL_DESG_DEL= this.appendpoint+ AppConstant.API_CONFIG.API_URL.SETTINGS.DELETEDESIGNATION;

     }

    // private mobUrl = 'api/desig';



    public getDesignations() :Observable<any>{
        return this.http.get(this.SERVER_URL);
        }


        public addDesignation(f) {
            console.log(f);
            console.log(JSON.stringify(f));
            let body = JSON.stringify(f);
            // let head = new HttpHeaders().set("Content-Type", "application/json");
            //added interceptors
            return this.http.post(this.SERVER_URL_ADD, body);

            }


          public editDesignation(item:any):Promise<any> {
                console.log(item);

                return this.CommonHttpService.globalPostService(this.SERVER_URL_ADD,item).then(data=>{
                    return data;
                });
                }




            public deleteDesignation(designationID) {
                let head = new HttpHeaders().set("Content-Type", "application/json");
                console.log('how it is getting ID?:' + designationID);
                return this.http.post(this.SERVER_URL_DESG_DEL+designationID, { headers: head });
                }

                public getPageByNumber(designationID,CatId) {
                    //  console.log((this.Edit_Fetch_URL + ArticleId));
                    if(CatId==0){
                      this.Concat="categ="+"&Page="+designationID;
                    console.log("Concat"+this.Concat)
                      return this.http.get(this.PAGINATION + this.Concat);
                      }else{
                          this.Concat="categ="+CatId+"&Page="+designationID;
                    console.log("Concat"+this.Concat)
                      return this.http.get(this.PAGINATION + this.Concat);
                      }
                    }
}
