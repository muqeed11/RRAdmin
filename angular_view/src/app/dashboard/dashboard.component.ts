import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as Chart from 'chart.js';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@NgModule()
export class DashboardComponent implements OnInit {

  chart  = [];

  body :any = { "loginId" : "1600", "token":"testtoken" };

  constructor(private httpService: HttpClient,private authService:AuthService,private router:Router) { }

  ngOnInit() {

    const token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    //PIE Chart
    this.httpService.post('http://192.168.134.1:3000/dashboardGraphs/reportscount'+ token,this.body)
    // this.httpService.get('../../assets/testdata.json')
    // this.httpService.get('http://124.123.32.192:8090/report-count-by-type')
      .subscribe(res => {

        if(res['responseStatus'] == '99') {
          if (res['error'].name == 'TokenExpiredError') {
            window.alert('Session Expired , Please login again..!')
            this.authService.logout();
            this.router.navigate(['signin']);
          }
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

        },
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



  }


 }
