import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { StoreService } from 'src/app/services';
import { AddictionsService } from 'src/app/services/addictions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.scss'],
})
export class FailureComponent implements OnInit {
  userLogin: any;
  addictions: any;
  moduleData: any[];
  limit: number;
  private currentDate = moment();
  private index: number;

  constructor(private addictionService: AddictionsService, private storeService: StoreService, private userService: UserService, private readonly router: Router) { }

  ngOnInit() {
    this.addictionService.selectAddIndex$.subscribe(index => {
      this.index = index;
      this.addictions = this.addictionService.addictions[index];

      this.moduleData = this.addictions.appRules.failure.moduleData?.reverse().map(failure => {
        const failureData = moment(failure.date instanceof Date ? new Date(failure.date) : failure.date.toDate()).format("MM/DD/yyyy");

        return { ...failure, ...{ date: failureData } }
      });
    });
    this.userService.user$.pipe(take(1)).subscribe(user => this.userLogin = user.username)
  }

  public addFailures() {
    const failureObject = this.calculateFailureOutOfLimit(this.addictions.appRules.failure.moduleData);
    this.addictions.appRules.failure.moduleData = [...this.addictions.appRules.failure.moduleData.reverse(), failureObject];


    this.storeService.saveAddictions(this.addictionService.addictions, this.userLogin);

    this.addictionService.selectAddIndex$.next(this.index);
  }

  private calculateFailureOutOfLimit(moduleData: any[]): any {
    const limit = this.addictions.limit;
    var weekStart = this.currentDate.clone().startOf('isoWeek');
    var weekEnd = this.currentDate.clone().endOf('isoWeek');

    let timesThisWeek = 0;

    moduleData?.forEach(failure => {
      const failureData = moment(failure.date instanceof Date ? new Date(failure.date) : failure.date.toDate());
      var duration = moment.duration(failureData.diff(weekStart));
      var days = duration.asDays();

      if (days >= 0) {
        timesThisWeek++;
      }
    });

    if (timesThisWeek > limit) {
      return { date: new Date(), type: 1 };
    }

    return { date: new Date(), type: 0 };
  }
}
