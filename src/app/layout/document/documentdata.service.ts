import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { AppConstant } from 'src/app/app.constant';


@Injectable({
  providedIn: 'root'
})
export class DocumentdataService {
    api_url: string;
    appendpoint: string;
    cpDefaultUrl: string;
    cpDefaultUpdateUrl: string;
    SERVER_URL_DOC:string;
    SERVER_URL_DOC_ADD:string;
    SERVER_URL_DOC_Del:string;

    constructor(private http: HttpClient,private CommonHttpService:CommonHttpService) {
        this.api_url = AppConstant.API_ENDPOINT1;
        this.appendpoint = this.api_url;
        this.SERVER_URL_DOC= this.appendpoint+ AppConstant.API_CONFIG.API_URL.SETTINGS.GETDOCUMENT;
        this. SERVER_URL_DOC_ADD= this.appendpoint+ AppConstant.API_CONFIG.API_URL.SETTINGS.INSERTDOCUMENT;
        this.SERVER_URL_DOC_Del= this.appendpoint+ AppConstant.API_CONFIG.API_URL.SETTINGS.DELETEDOCUMENT;

     }
  public getDocuments():Observable<any> {
    return this.http.get(this.SERVER_URL_DOC);
    }



    public addDocumnets(f) {
        console.log(f);
        console.log(JSON.stringify(f));
        let body = JSON.stringify(f);
        // let head = new HttpHeaders().set("Content-Type", "application/json");
        //added interceptors
        return this.http.post(this.SERVER_URL_DOC_ADD, body);

        }

        public deleteDocument(documentID) {
            let head = new HttpHeaders().set("Content-Type", "application/json");
            console.log('how it is getting ID?:' + documentID);

            return this.http.post(this.SERVER_URL_DOC_Del + documentID, { headers: head });
            }



            public editDocument(item:any):Promise<any> {
                console.log(item);

                return this.CommonHttpService.globalPostService(this. SERVER_URL_DOC_ADD,item).then(data=>{
                    return data;
                });
                }


}

