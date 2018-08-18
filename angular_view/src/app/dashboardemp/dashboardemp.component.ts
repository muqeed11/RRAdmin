import {Component, NgModule, OnInit, TemplateRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as Chart from "chart.js";

@Component({
  selector: 'app-dashboardemp',
  templateUrl: './dashboardemp.component.html',
  styleUrls: ['./dashboardemp.component.css']
})

@NgModule()
export class DashboardempComponent implements OnInit {

  constructor(private http:HttpClient) { }

  chart=[]

  ngOnInit() {

    const token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
      .subscribe(
        (res)=> {
          let empid=[]
          let empsal=[]
          for(var i=0;i<50;i++)
          {
            if(res[i].employee_salary>0) {
              empid.push(res[i].id)
              empsal.push(res[i].employee_salary)
            }
          }
          console.log(empid)
          console.log(empsal);
          this.chart = new Chart('canvas3', {
            type: 'line',
            data: {
              labels: empid,
              datasets: [
                {
                  label:'Employee ID and Salary Data',
                  data: empsal,
                  backgroundColor: [
                    'red'

                  ],
                  borderColor:['blue'],
                  fill: false
                }
              ],
              options: {
                responsive: true,
                legend: {
                  display: false
                },
                title: {
                  text: 'Line Chart..!',
                  display: true
                },
                scales: {
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString:'Employee IDs'
                    }
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString:'Employee Salaries',
                      stacked: true
                    }
                  }]
                }

              }
            }
          });


        }
      );
  }

  buttonclicked(template: TemplateRef<any>) {

  }
}
