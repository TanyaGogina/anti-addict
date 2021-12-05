import { Component, OnInit } from '@angular/core';
import { AddictionsService } from 'src/app/services/addictions.service';
import { GoogleChartInterface, Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  addictions: any;
  pollsPassed: any;
  failures: any[];
  mode: number;
  failuresCount: number;
  timeUsingApp: any;
  public barChart: GoogleChartInterface;

  public january: any[] = [];
  public february: any[] = [];
  public march: any[] = [];
  public april: any[] = [];
  public may: any[] = [];
  public june: any[] = [];
  public july: any[] = [];
  public august: any[] = [];
  public september: any[] = [];
  public october: any[] = [];
  public november: any[] = [];
  public decemeber: any[] = [];

  constructor(private addictionService: AddictionsService) { }

  ngOnInit() {
    this.addictionService.selectAddIndex$.subscribe(index => {
      this.addictions = this.addictionService.addictions[index];

      this.mode = this.addictions.appRules.statistics.mode;
      this.pollsPassed = this.addictions.appRules.poll.moduleData?.length;
      this.failures = this.addictions.appRules.failure.moduleData;
      this.failuresCount = this.failures?.length;
      const currentDate = new Date();
      const startDate = this.addictions.startDate.toDate();
      const diffTime = Math.abs(startDate.getTime() - currentDate.getTime());
      this.timeUsingApp = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.sortByMonth();
    });
  }

  public sortByMonth(): any {
    this.failures?.forEach(element => {
      switch (element.date.toDate().getMonth() + 1) {
        case 1:
          this.january.push(element.date);
          break;
        case 2:
          this.february.push(element.date);
          break;
        case 3:
          this.march.push(element.date);
          break;
        case 4:
          this.april.push(element.date);
          break;
        case 5:
          this.may.push(element.date);
          break;
        case 6:
          this.june.push(element.date);
          break;
        case 7:
          this.july.push(element.date);
          break;
        case 8:
          this.august.push(element.date);
          break;
        case 9:
          this.september.push(element.date);
          break;
        case 10:
          this.october.push(element.date);
          break;
        case 11:
          this.november.push(element.date);
          break;
        case 12:
          this.decemeber.push(element.date);
          break;
      }

      this.buildChart();
    });
  }

  private buildChart() {
    this.barChart = {
      chartType: 'ColumnChart',
      dataTable: [
        ['', ''],
        ['September', this.september?.length ? this.september?.length : 0],
        ['October', this.october?.length ? this.october?.length : 0],
        ['November', this.november?.length ? this.november?.length : 0],
        ['December', this.decemeber?.length ? this.decemeber?.length : 0]
      ],
      options: {
        height: 300,
        width: 300,
      }
    };
  }

}
