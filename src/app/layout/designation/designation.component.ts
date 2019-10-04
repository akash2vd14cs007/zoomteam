import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Designation } from "./designation";

import { DesignationdataService } from "src/app/layout/designation/designationdata.service";
import { HttpClient } from "@angular/common/http";
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ConfirmationService } from "primeng/api";
import { Pagerinfo } from './pagerinfo';
@Component({
    selector: "app-designation",
    templateUrl: "./designation.component.html",
    styleUrls: ["./designation.component.scss"]
})
export class DesignationComponent implements OnInit {
    constructor(
        private http: HttpClient,
        private modalService: NgbModal,
        private _data: DesignationdataService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    updatedItem: number;
    title = "Designations";
    msgs: Message[] = [];
    closeResult: string;
    selectedDesignationOption: string;
    name: string;
    msg = "Are You Sure!";
    description: string;
    id: number;
    arrDesig: Designation[] = [];
    editId: number;
    editName: string;
    editDescription: string;
    item: string;
    loading:boolean=true;
    page:Pagerinfo;
    pageVariable:boolean=false;
    totalItem:number;
    totalPages:number;
    all_desigs:any;
    des: Designation[];
    desig: Designation[];
    Page:1;
    Categoryid:number=0;

    getDesig() {
        this._data.getDesignations().subscribe((data: Designation[]) => {
            this.arrDesig = data;
            this.loading=false;
            console.log(this.arrDesig);
        });
    }

    ngOnInit() {
        this.loading=true;
        this.getDesig();
        this.getPageInfo();
    }
    getPageInfo(){
        this._data.getDesignations().subscribe(

            (data: Designation[]) => {
              this.arrDesig = data;

              this.page=data['pagerInfo'];
              this.totalItem=this.page.totalItems;
              this.totalPages=this.page.totalPages;
             // this.totalPages=this.totalPages-4;

              console.log(this.page.totalItems)
              console.log(this.page);

              // this.artcle = _.toArray(this.arr);
              console.log(this.arrDesig);
              this.all_desigs = this.arrDesig['designation'];
              console.log(this.all_desigs);
              this.desig = this.des;

              // console.log(this.article);
            },
            function (error) {

            },
            function () { }
          );

    }
    loadPage(number:number) {

        console.log(this.page);
        number=this.Page;
        console.log("number"+number);
        if (number != 0) {
            this._data.getPageByNumber(this.page,this.Categoryid).subscribe(
              (data:Designation[])=>
                {
                  console.log(data);


                  this.arrDesig=data;
                  this.all_desigs= this.arrDesig['designation'];
                });
          }

      }
    onSearch(value) {
        console.log(value);
        if (value != "") {
            this.arrDesig = this.arrDesig.filter(x => x.name.startsWith(value));
        } else {
            this._data.getDesignations().subscribe(
                (data: Designation[]) => {
                    this.arrDesig = data;
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
        this.name = "";
        this.description = "";
        this.modalService.open(content);
    }

    // Edit modal popup
    openEdit(content, passedTitle, i, arr) {
        console.log(arr.id);
        this.id = arr.id;
        this.selectedDesignationOption = passedTitle;
        // console.log(i);
        this.name = this.arrDesig[i].name;
        this.description = this.arrDesig[i].description;
        // console.log('updating');
        this.updatedItem = i;

        this.modalService.open(content);
    }

    // delete
    onDesigDelete(id: number) {
        this._data.deleteDesignation(id).subscribe((data: any) => {
            // alert('successfully deleted');
            this.ngOnInit();
        });
    }

    onFormSubmit(f) {
        if (this.selectedDesignationOption == "Add") {
            console.log(this.id);
            this._data.addDesignation(f.value).subscribe((data: any) => {
                console.log(f.value);
                this.msgs=[];
                this.msgs.push({ severity: 'success', summary: 'success', detail:'record added' });
                this.getDesig();
            });
        } else {
            console.log(f.value);
            console.log(f.value.name);
            var req = {
                id: this.id,
                description: f.value.Description,
                name: f.value.Name
            };
            console.log(req);
            this._data.editDesignation(req).then(
                res => {
                    if (res) {
                        this.msgs=[];

                        this.msgs.push({ severity: 'success', summary: 'success', detail:'record updated' });

                        this.getDesig();
                    } else {

                    }
                },
                error => {}
            );
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
                this.onDesigDelete(id);
                // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
            },
            reject: () => {
                // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });
    }
}
