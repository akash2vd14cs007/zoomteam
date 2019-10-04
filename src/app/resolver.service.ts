import { Injectable } from '@angular/core';
import { DocResolved } from './layout/document/document';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DocumentdataService } from './layout/document/documentdata.service';
import { Observable, of } from 'rxjs';

import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<DocResolved>{
  constructor(private _userdata:DocumentdataService) { }
  resolve(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>
  {
          return this._userdata.getDocuments().pipe(
        // map(x => ({ data: x,errorMessage:'' })),
        map(x =>({Document: x,errorMessage:''})),
        catchError(err=>{
          console.log(err);
          return of({ Document: null,errorMessage:"somthing went wrong" });
        })
      );


  }
}
