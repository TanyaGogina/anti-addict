import { Component, OnInit } from '@angular/core';
import {AddictionsService} from "../../services/addictions.service";

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss'],
})
export class AchievementComponent implements OnInit {
  achievements: any[] = [];

  constructor(private addService: AddictionsService) { }

  ngOnInit() {
    this.addService.selectAddIndex$.subscribe(index => {
      const addiction = this.addService.addictions[index];
      const startDate = new Date(addiction.startDate);
      const currentDate = new Date();

      this.achievements = [];
      this.achievements.push({title: 'On the way to recovery', date: startDate})

      const diffTime = Math.abs(startDate.getTime() - currentDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 7) this.achievements.push({title: 'Not so hard 😉', date: new Date(addiction.startDate).setDate(startDate.getDate() + 7)})

      debugger
    })
  }

}
