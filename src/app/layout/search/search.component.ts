import { Component, OnInit, OnDestroy } from '@angular/core';
import { Search } from './search';
import { SearchdataService } from 'src/app/services/appservices/searchdata.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
selector: 'app-search',
templateUrl: './search.component.html',
styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy {
arr: Search;
memberArr:Search;
value:string;
public queryparams: any;
private _subscriptions = new Subscription();
constructor(private _data:SearchdataService,private act: ActivatedRoute, private _router: Router) {
      this._subscriptions.add(
       this._router.routerState.root.queryParams.subscribe(
          (params: Params) => {
            this.queryparams = params['MemberSearch'];
                this.getSearch();
                        }
                     )
         );
}

ngOnInit() {
this.getSearch();
console.log(this.queryparams);
}

getSearch(){
this._data.getSearch(this.queryparams).subscribe(
(data:Search)=>{
this.arr=data;
this.memberArr=this.arr[0];
console.log(this.memberArr);
console.log(this.arr);

}
);
}
ngOnDestroy(){
    this._subscriptions.unsubscribe();
}

}
