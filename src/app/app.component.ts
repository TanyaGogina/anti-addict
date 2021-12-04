import {Component, OnInit} from '@angular/core';
import {StoreService} from './services';
import {NavigationEnd, Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {filter} from "rxjs/operators";
import {MenuController, Platform} from "@ionic/angular";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    user$;
    isAuthPage: boolean = true;
    appPages = [
        {title: 'Reminder', url: '/reminder', icon: 'alarm', isEnabled: true},
        {title: 'Poll', url: '/poll', icon: 'checkbox', isEnabled: true},
        {title: 'Finance', url: '/finance', icon: 'cash', isEnabled: true},
        {title: 'Statistic', url: '/statistic', icon: 'podium', isEnabled: true},
        {title: 'Achievement', url: '/achievement', icon: 'trophy', isEnabled: true},
        {title: 'Failure', url: '/failure', icon: 'warning', isEnabled: true},
        {title: 'Content', url: '/content', icon: 'film', isEnabled: true},
    ];
    pageName: string = 'qwe';

    private pageNames: Record<string, string> = {
        ['/landing']: 'Landing page',
        ['/auth']: '',
        ['/achievement']: 'Achievements',
        ['/content']: 'Content',
        ['/failure']: 'Failures',
        ['/finance']: 'Finance',
        ['/poll']: 'Poll',
        ['/reminder']: 'Reminder',
        ['/statistic']: 'Statistics',
    }

    constructor(private readonly storeService: StoreService, private readonly router: Router, private readonly userService: UserService, public platform: Platform, private menu: MenuController) {
        this.pageName = this.pageNames[this.router.url];

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.pageName = this.pageNames[this.router.url]
            this.isAuthPage = this.router.url.includes('auth');
        })
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

        this.user$ = this.userService.user$;
    }

    toggleSidebar(): void {
        this.menu.toggle();
    }

    private manageLink(moduleTitle: string, isEnabled: boolean): void {
        const linkConfigs = this.appPages.find(page => page.title === moduleTitle);
        linkConfigs.isEnabled = isEnabled;
    }

    private logOut(): void {
        this.userService.user$.next(null)
        this.router.navigate(['auth'], {replaceUrl: true});
    }
}
