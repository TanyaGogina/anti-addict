import { Component, OnInit } from '@angular/core';
import {AddictionsService} from "../../../services/addictions.service";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  timeToNotification: string;
  frequency: number;
  pollReminderAvailable: boolean;
  pollSubjects: string;

  constructor(private addService: AddictionsService) { }

  ngOnInit() {
    this.addService.selectAddIndex$.subscribe(index => {
      const addiction = this.addService.addictions[index];
      const setDate = new Date(addiction.appRules.reminder.time);

      this.timeToNotification = `${setDate.getHours()}:${setDate.getMinutes()}`
      this.frequency = addiction.appRules.reminder.frequency;

      this.pollReminderAvailable = addiction.appRules.poll.isEnabled && addiction.appRules.poll.pollNotificationEnabled;

      this.pollSubjects = addiction.appRules.poll.subject.join(', ');
    });
  }
}
