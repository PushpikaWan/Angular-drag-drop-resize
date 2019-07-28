import { Component, OnInit } from '@angular/core';
import { DashboardControllingService } from '../services/dashboard-controlling.service';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrls: ['./dashboard-control.component.css']
})
export class DashboardControlComponent implements OnInit {

  availableColumns: number = 0 ;
  selectedColumn: number = 0;

  constructor(private dashboardService: DashboardControllingService) { }

  ngOnInit() {
    this.dashboardService.dashboardComponentListChanged.subscribe(
      (items: Object[]) => {
    console.log("button clicked",items);
        this.availableColumns = items.length;
        console.log("button clicked",items);
      }
    );
  }

  ngOnDestroy(): void {
    this.dashboardService.dashboardComponentListChanged.unsubscribe();
  }

  addVerticalPanel(){
    this.dashboardService.addVerticalItem(this.selectedColumn);
  }

  addHorizontalPanel(){
    this.dashboardService.addHorizontalItem();
  }

  selectChangeHandler (event: any) {
    this.selectedColumn = event.target.value;
  }

  counter(i: number) {
    return new Array(i);
  }

}
