import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as Chart from 'chart.js';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {ErrorService} from "../error/error.service";
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@NgModule()
export class DashboardComponent implements OnInit {

  chart  = [];

  body :any = { userId : localStorage.getItem('userId') };

  constructor(private httpService: HttpClient,private authService:AuthService,
              private router:Router, private errorService:ErrorService) { }

              handleErrormessage(){
    console.log("error")
              }


  ngOnInit() {

    const token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    // console.log(token.decoded)
    //PIE Chart
    this.httpService.post('http://192.168.134.1:3000/dashboardGraphs/reportscount'+ token,this.body)
      // .map((response:Response) => response.json())
      // .catch((error:Response)=>{
      //   console.log(error)
      //   this.handleErrormessage()
      //   // return Observable.throw(error.json())
      // })
      .subscribe(res => {
        if(res['responseStatus'] == '99') {
          // if (res['error'].name == 'TokenExpiredError') {
                    //   window.alert('Session Expired , Please login again..!')
                    //   this.authService.logout();
                    //   this.router.navigate(['signin']);
                    // }
          this.authService.logout();
          window.alert(res['response']);
          this.router.navigate(['signin']);
        }

        let result = res['reportsbycount'];
        let responseStatus = res['responseStatus'];
        let reports:any =[];
        let number:any =[] ;
        for(let i of result)
        {
          reports.push(i['_id'])
          number.push(i['reportcount'])

        }

          this.chart = new Chart('canvas1',{
            type:'pie',
            data:{
              labels:reports,
              datasets:[
                {
                  data:number,
                  backgroundColor:[
                    'rgba(255, 99, 132,2)',
                    'rgba(54, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 192, 192, 1)',
                    'rgba(201, 196, 98, 1)',
                    'rgba(153, 201, 98, 1)',
                    'rgba(98, 201, 102, 1)',
                    'rgba(98, 201, 133, 1)',
                    'rgba(98, 185, 201, 1)',
                    'rgba(98, 136, 201, 1)',
                    'rgba(105, 98, 201, 1)',
                    'rgba(153, 98, 201, 1)',
                    'rgba(201, 98, 198, 1)',
                    'rgba(201, 98, 135, 1)'
                  ],
                }
              ]
            },
            options:{
              legend:{
                display:true
              },
              title:{
                text:'Pie Chart..!',
                display:true
              }

            }
          })

        }
      );

    //Bar Chart
    // this.httpService.get('../../assets/testuserbycity.json')

    this.httpService.post('http://192.168.134.1:3000/dashboardGraphs/usercount' + token,this.body)
      .subscribe(res => {
          let reports = res['usersbycity'];
          let responseStatus = res['responseStatus'];
        let cities:any =[];
        let number:any =[] ;
        for(let i of reports)
        {
          cities.push(i['_id'])
          number.push(i['citycount'])

        }
          this.chart = new Chart('canvas2',{
            // type:'horizontalBar',
            type:'bar',
            data:{
              labels:cities,
              datasets:[
                {
                  data:number,
                  backgroundColor:[
                    'rgba(255, 99, 132,2)',
                    'rgba(54, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 192, 192, 1)',
                    'rgba(201, 196, 98, 1)',
                    'rgba(153, 201, 98, 1)',
                    'rgba(98, 201, 102, 1)',
                    'rgba(98, 201, 133, 1)',
                    'rgba(98, 185, 201, 1)',
                    'rgba(98, 136, 201, 1)',
                    'rgba(105, 98, 201, 1)',
                    'rgba(153, 98, 201, 1)',
                    'rgba(201, 98, 198, 1)',
                    'rgba(201, 98, 135, 1)'
                  ],
                }
              ]
            },
            options:{
              legend:{
                display:false
              },
              title:{
                text:'Bar Chart..!',
                display:true
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }

            }
          })

        },
      );

    this.httpService.post('http://192.168.134.1:3000/dashboardGraphs/labCount' + token,this.body)
      .subscribe(res => {
          let reports = res['reportsbyLab'];
          let responseStatus = res['responseStatus'];
          let LabUsers:any =[];
          let number:any =[] ;
          for(let i of reports)
          {
            LabUsers.push(i['_id'])
            number.push(i['reportcount'])

          }
          this.chart = new Chart('canvas3',{
            // type:'horizontalBar',
            type:'bar',
            data:{
              labels:LabUsers,
              datasets:[
                {
                  data:number,
                  backgroundColor:[
                    'rgba(255, 99, 132,2)',
                    'rgba(54, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 192, 192, 1)',
                    'rgba(201, 196, 98, 1)',
                    'rgba(153, 201, 98, 1)',
                    'rgba(98, 201, 102, 1)',
                    'rgba(98, 201, 133, 1)',
                    'rgba(98, 185, 201, 1)',
                    'rgba(98, 136, 201, 1)',
                    'rgba(105, 98, 201, 1)',
                    'rgba(153, 98, 201, 1)',
                    'rgba(201, 98, 198, 1)',
                    'rgba(201, 98, 135, 1)'
                  ],
                }
              ]
            },
            options:{
              legend:{
                display:false
              },
              title:{
                text:'Bar Chart..!',
                display:true
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }

            }
          })

        },
      );
  }


 }
