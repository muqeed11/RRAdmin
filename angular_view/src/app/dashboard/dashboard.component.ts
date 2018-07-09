import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as Chart from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@NgModule()
export class DashboardComponent implements OnInit {

  chart  = [];

  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    // this.httpService.get('http://dummy.restapiexample.com/api/v1/employee/243',
    //PIE Chart
    this.httpService.get('../../assets/testdata.json')
    // this.httpService.get('http://124.123.32.192:8090/report-count-by-type')
      .subscribe(res => {
          let reports = Object.keys(res)
        let num1 = Object.values(res)
        //   console.log(reports)
        // console.log(num1)
          this.chart = new Chart('canvas1',{
            type:'pie',
            data:{
              labels:reports,
              datasets:[
                {
                  data:num1,
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
    this.httpService.get('../../assets/testuserbycity.json')
      .subscribe(res => {
          let reports = Object.keys(res)
          let num1 = Object.values(res)
          // console.log(reports)
          // console.log(num1)
          this.chart = new Chart('canvas2',{
            // type:'horizontalBar',
            type:'bar',
            data:{
              labels:reports,
              datasets:[
                {
                  data:num1,
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
