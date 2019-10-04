import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Member } from './dashboard';
import _ from "lodash";
import { Department } from './department';
import { DashboarddataService } from './dashboarddata.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    arrlogin: Member;
    arrdept: Department;
    arr1:Member[]=[];
    msgs: Message[] = [];

    public data: Object[];
    public initialPage: Object;

    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    xpandStatus=true;
    constructor(private _data:DashboarddataService,private messageService: MessageService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    getMember()
    {
    this._data.getMember().subscribe(
    (data:Member)=>{
    // this.arrlogin=data["memberDetails"];
    this.arrlogin = data["memberDetails"];
                var result = this.arrlogin["associatedDepartments"][0];
                this.arrdept = result;

    console.log(this.arrlogin);
    },

    function(error){
        //  this.msgs=[];
        //   this.msgs.push({ severity: 'error', summary: 'error', detail: 'Internal Server Error:404' });
        alert('Internal server error :500');
    }
    );
    }

    // getDepartment()
    // {
    // this._data.getDept().subscribe(
    // (data:Member)=>{
    //     this.arrdept= data["memberDetails"]["associatedDepartments"];
    // console.log(this.arrdept);


    // }
    // );
    // }



ngOnInit()
{

this.getMember();
// this.getDepartment();
}





    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}

