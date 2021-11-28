import {Component, OnInit} from '@angular/core';
import {StoreService} from './services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    {title: 'Reminder', url: '/reminder', icon: 'alarm', isEnabled: true},
    {title: 'Poll', url: '/poll', icon: 'checkbox', isEnabled: true},
    {title: 'Finance', url: '/finance', icon: 'cash', isEnabled: true},
    {title: 'Statistic', url: '/statistic', icon: 'podium', isEnabled: true},
    {title: 'Achievement', url: '/achievement', icon: 'trophy', isEnabled: true},
    {title: 'Failure', url: '/failure', icon: 'warning', isEnabled: true},
    {title: 'Content', url: '/content', icon: 'film', isEnabled: true},
  ];

  constructor(private readonly storeService: StoreService) {
  }

  ngOnInit(): void {
    this.storeService.getAppRules().subscribe(res => {
      this.manageLink('Reminder', res[0].reminder.isEnabled);
      this.manageLink('Poll', res[0].poll.isEnabled);
      this.manageLink('Finance', res[0].finance.isEnabled);
      this.manageLink('Statistic', res[0].statistics.isEnabled);
      this.manageLink('Achievement', res[0].achievements.isEnabled);
      this.manageLink('Failure', res[0].failure.isEnabled);
      this.manageLink('Content', res[0].content.isEnabled);
    });
  }

  private manageLink(moduleTitle: string, isEnabled: boolean): void {
    const linkConfigs = this.appPages.find(page => page.title === moduleTitle);
    linkConfigs.isEnabled = isEnabled;
  }
}
