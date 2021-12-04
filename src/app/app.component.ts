import {Component, OnInit} from '@angular/core';
import {StoreService} from './services';
import {NavigationEnd, Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {filter, take} from "rxjs/operators";
import {MenuController, Platform} from "@ionic/angular";
import {AddictionsService} from "./services/addictions.service";

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
    selectedIndex = 0;

    private pageNames: Record<string, string> = {
        ['/landing']: 'AddictBreak',
        ['/auth']: '',
        ['/achievement']: 'Achievements',
        ['/content']: 'Content',
        ['/failure']: 'Failures',
        ['/finance']: 'Finance',
        ['/poll']: 'Poll',
        ['/reminder']: 'Reminder',
        ['/statistic']: 'Statistics',
        ['/config']: 'Addiction configuration'
    }

    constructor(private readonly storeService: StoreService, private readonly router: Router, private readonly userService: UserService, public platform: Platform, private menu: MenuController, public readonly addictionsService: AddictionsService) {
        this.pageName = this.pageNames[this.router.url];

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.pageName = this.pageNames[this.router.url]
            this.isAuthPage = this.router.url.includes('auth');
        })
    }

    ngOnInit(): void {
        this.userService.user$.pipe(filter(user => !!user)).subscribe(user => {
            this.storeService.getAddictions(user.username).pipe(take(1)).subscribe(res => {
                const addictions = res[res.length - 1]?.add;
                this.addictionsService.addictions = addictions || [];

                if (addictions.length) this.addictionsService.selectAddIndex$.next(0);
            })
        });

        this.user$ = this.userService.user$;
        this.addictionsService.selectAddIndex$.subscribe(index => {
            const addiction = this.addictionsService.addictions[index];

            this.manageLink('Reminder', addiction.appRules.reminder.isEnabled);
            this.manageLink('Poll', addiction.appRules.poll.isEnabled);
            this.manageLink('Finance', addiction.appRules.finance.isEnabled);
            this.manageLink('Statistic', addiction.appRules.statistics.isEnabled);
            this.manageLink('Achievement', addiction.appRules.achievements.isEnabled);
            this.manageLink('Failure', addiction.appRules.failure.isEnabled);
            this.manageLink('Content', addiction.appRules.content.isEnabled);
        })
    }

    toggleSidebar(): void {
        this.menu.toggle();
    }

    logOut(): void {
        this.userService.user$.next(null)
        this.router.navigate(['auth'], {replaceUrl: true});
    }

    onAddChange(): void {
        this.addictionsService.selectAddIndex$.next(this.selectedIndex);
    }

    private manageLink(moduleTitle: string, isEnabled: boolean): void {
        const linkConfigs = this.appPages.find(page => page.title === moduleTitle);
        linkConfigs.isEnabled = isEnabled;
    }


}
