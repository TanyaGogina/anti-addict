import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AddictionsService} from "../../../services/addictions.service";
import {StoreService} from "../../../services";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
    // SMOKING
    smokingLinks = [
        {
            link: 'https://my.clevelandclinic.org/health/articles/17488-smoking',
            title: 'Smoking: Effects, Risks, Addiction, Quitting, Treatment',
            restriction: false
        },
        {
            link: 'https://www.healthline.com/health/smoking/effects-on-body',
            title: 'The Effects of Smoking on the Body',
            restriction: false
        },
        {
            link: 'https://www.medicalnewstoday.com/articles/10566#brain',
            title: 'Why is smoking bad for you?',
            restriction: false
        }, {
            link: 'https://www.shutterstock.com/search/smoking+lungs',
            title: 'Smoke lungs',
            restriction: true
        }
    ];
    smokingVideos = [
        {
            link: 'https://www.youtube.com/watch?v=Y18Vz51Nkos',
            title: 'How do cigarettes affect the body? - Krishna Sudhir',
            restriction: false
        },
        {
            link: 'https://www.youtube.com/watch?v=TfLCYRenA8Y',
            title: 'Why Give Up Smoking?',
            restriction: false
        }, {
            link: 'https://www.youtube.com/watch?v=uirINayrSJs',
            title: 'Smokers lungs versus healthy lungs',
            restriction: true
        }
    ];
    // ALCOHOLISM
    alcoholismLinks = [];
    alcoholismVideos = [];
    // NARCOTIC
    narcoticLinks = [];
    narcoticVideos = [];
    // CUSTOM
    customLinks = [];
    customVideos = [];

    textLinks = [];
    videoLinks = [];

    addictionIndex: number;
    addictionName: string = '';
    restriction = false;

    constructor(private userService: UserService, private addictionService: AddictionsService, storeService: StoreService) {
    }

    ngOnInit() {
        this.addictionService.selectAddIndex$.subscribe(index => {
            this.addictionIndex = index;
            const addiction = this.addictionService.addictions[index];
            const addictionName = addiction.name;
            this.restriction = addiction.appRules.content.contentRestriction;

            switch (addictionName) {
                case 'Smoking':
                    this.textLinks = this.smokingLinks;
                    this.videoLinks = this.smokingVideos;
                    this.addictionName = 'Smoking';
                    break;
                case 'Alcoholism':
                    this.textLinks = this.alcoholismLinks;
                    this.videoLinks = this.alcoholismVideos;
                    this.addictionName = 'Alcoholism';
                    break;
                case 'Narcotic':
                    this.textLinks = this.narcoticLinks;
                    this.videoLinks = this.narcoticVideos;
                    this.addictionName = 'Narcotic';
                    break;
            }
        })
    }

}
