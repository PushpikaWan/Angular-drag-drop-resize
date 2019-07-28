import { Component, OnInit } from '@angular/core';
import { DashboardControllingService } from '../services/dashboard-controlling.service';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrls: ['./dashboard-control.component.css']
})
export class DashboardControlComponent implements OnInit {

  constructor(private dashboardService: DashboardControllingService) { }

  ngOnInit() {
   
  }

  addPanel(){
    this.dashboardService.addItem();
  }


}
