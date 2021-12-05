import {Component, OnInit} from '@angular/core';
import {AddictionsService} from "../../../services/addictions.service";
import {UserService} from "../../../services/user.service";
import {StoreService} from "../../../services";

@Component({
    selector: 'app-poll',
    templateUrl: './poll.component.html',
    styleUrls: ['./poll.component.scss'],
})
export class PollComponent implements OnInit {
    fightQuestionsFn = () => [
        {
            questions: 'Do you often fill your addiction in larger amounts or over a longer period of time than you intended?',
            answer: null
        },
        {
            questions: 'Have you for a while now wanted to cut back on addiction or made unsuccessful attempts to do so?',
            answer: null
        },
        {
            questions: 'Do you spend a great deal of time finding, using, or recovering from your addiction?',
            answer: null
        },
        {
            questions: 'Do you have strong urges or powerful cravings to being addicted?',
            answer: null
        },
        {
            questions: 'Has your addiction resulted in your inability to meet your obligations at work, home, or school?',
            answer: null
        },
    ];

    progressQuestionsFn = () => [
        {
            questions: 'Do you feel better?',
            answer: null
        },
        {
            questions: 'Do you need extra help?',
            answer: null
        },
        {
            questions: 'Are you motivated to what you are doing?',
            answer: null
        },
        {
            questions: 'Do you see life improvements?',
            answer: null
        },
        {
            questions: 'Have you failed your addiction fight, starting from last poll?',
            answer: null
        },
    ];

    currentPoll = [];
    selectedSubject = '';
    subjects = [];
    subjectsText = '';

    isInitMode = true;
    username = '';
    addictionIndex: number;

    constructor(private addService: AddictionsService, private userService: UserService, private storeService: StoreService) {
    }

    ngOnInit() {
        this.addService.selectAddIndex$.subscribe(index => {
            const addiction = this.addService.addictions[index];
            this.subjects = addiction.appRules.poll.subject;
            this.subjectsText = this.subjects.join(', ');
            this.addictionIndex = index;
        });

        this.userService.user$.subscribe(user => this.username = user.username)
    }

    startPoll(): void {
        this.isInitMode = false;
        this.managePoll();
    }

    competePoll(): void {
        this.isInitMode = true;
        const addictionToUpdate = this.addService.addictions[this.addictionIndex];
        addictionToUpdate.appRules.poll.moduleData = [...addictionToUpdate.appRules.poll.moduleData, new Date().toDateString()];

        // if progress poll check failure. if failure yes - save failure ++

        this.addService.selectAddIndex$.next(this.addictionIndex);
        this.storeService.saveAddictions(this.addService.addictions, this.username).then();
    }

    isSaveEnabled(): boolean {
        return this.currentPoll.every(q => q.answer === false || q.answer === true);
    }

    private randomIntFromInterval(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    private managePoll(): void {
        if (this.subjects.length === 2) {
            const random = this.randomIntFromInterval(1, 2);

            if (random === 1) {
                this.currentPoll = this.fightQuestionsFn();
                this.selectedSubject = 'fighting';
            } else {
                this.currentPoll = this.progressQuestionsFn();
                this.selectedSubject = 'progress';
            }

        } else {
            if (this.subjects[0] === 'fighting') {
                this.currentPoll = this.fightQuestionsFn();
                this.selectedSubject = 'fighting';
            } else {
                this.currentPoll = this.progressQuestionsFn();
                this.selectedSubject = 'progress';
            }
        }
    }
}
