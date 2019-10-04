import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Document } from './document';
import { DocumentdataService } from './documentdata.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
// import { DocumentdataService } from './documentdata.service';


@Component({
selector: 'app-document',
templateUrl: './document.component.html',
styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

constructor(private http: HttpClient,
    private modalService: NgbModal,
    private _data:DocumentdataService,
    private confirmationService: ConfirmationService,private act:ActivatedRoute,private messageService: MessageService) {
    this.documentsdata=this.act.snapshot.data['Docdata'];
}
updatedItem: number;
title = 'Documents';
closeResult: string;
selectedDesignationOption: string;
// name: string;
msg = 'Are You Sure!';
// description:string;

arrDoc: Document[]=[];
msgs: Message[] = [];
editId:number;
editName:string;
editDescription:string;

id: number;
organizationId: number;
name: string;
description: string;
isactive: boolean;
isgeneral:boolean;
createdby: number;
createddate: Date;
modifiedby: number;
modifieddate: Date;
loading:boolean=true;
documentsdata:any;
errormsg:string;


ngOnInit() {
   this.loading=true;
    this.getDocuments();
    // this.loading=false;
}

getDocuments(){

// this.arrDoc=this.documentsdata.Document;
// this.errormsg=this.documentsdata.errormsg;
// this.loading=false;
this._data.getDocuments().subscribe((data: Document[]) => {
    this.arrDoc = data;
    this.loading=false;
    console.log(this.arrDoc);
});
}

onSearch(value) {
    console.log(value);
    if (value != "") {
        this.arrDoc = this.arrDoc.filter(x => x.name.startsWith(value));
    } else {
        this._data.getDocuments().subscribe(
            (data: Document[]) => {
                this.arrDoc = data;
            },
            function(error) {
                alert(error);
            },
            function() {}
        );
    }
}

// Add modal
openAdd(content, passedTitle) {
this.selectedDesignationOption = passedTitle;
this.name = '';
this.description = '';
this.modalService.open(content);
}

// Edit modal popup
openEdit(content, passedTitle, i,arr) {
console.log(arr.id);
this.id=arr.id;
this.selectedDesignationOption = passedTitle;
// console.log(i);
this.name = this.arrDoc[i].name;
this.description = this.arrDoc[i].description;
// console.log('updating');
this.updatedItem = i;
this.modalService.open(content);
}

onDocDelete(id:number) {
    this._data.deleteDocument(id).subscribe(
           (data: any)=> {
            //    alert('successfully deleted');
             this.ngOnInit();
           }
           );

        }

onFormSubmit(f) {
if (this.selectedDesignationOption == 'Add') {
    console.log(this.id);
this._data.addDocumnets(f.value).subscribe((data: any) => {
console.log(f.value);
this.msgs=[];
this.msgs.push({ severity: 'success', summary: 'success', detail: 'record added' });
this.getDocuments();
});
}
else {
    console.log(f.value);
    console.log(f.value.name);
    var req ={
    id : this.id,
    description : f.value.description,
    name:f.value.name
    };
    console.log(req);
    this._data.editDocument(req)
    .then(res => {
    if (res) {
        this.msgs=[];
        this.msgs.push({ severity: 'success', summary: 'success', detail: 'record updated' });
        this.getDocuments();
    }
    else {
        this.msgs.push({ severity: 'error', summary: 'error', detail:'failed' });
    }
    }, error => {
    });

    }


this.modalService.dismissAll();
}
confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
        message: "Are you sure that you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {

            this.onDocDelete(id);
            // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        },
        reject: () => {
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}
}
