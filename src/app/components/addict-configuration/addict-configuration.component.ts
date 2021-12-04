import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddictionsService} from "../../services/addictions.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {take, takeUntil} from "rxjs/operators";
import {StoreService} from "../../services";

export enum Addiction {
    Smoking = 1,
    Alcoholism,
    Narcotics,
    Custom
}

@Component({
    selector: 'app-addict-configuration',
    templateUrl: './addict-configuration.component.html',
    styleUrls: ['./addict-configuration.component.scss'],
})
export class AddictConfigurationComponent {
    stepNumber: number = 1;
    addictionType: Addiction;
    addictions = Addiction;

    addictionDescriptions: Record<Addiction, Function> = {
        [Addiction.Smoking]: () => new FormGroup({
            goal: new FormControl('', Validators.required),
            startDate: new FormControl(new Date()),
            limit: new FormControl(0, Validators.required),
            price: new FormControl('', Validators.required),
            name: new FormControl('Smoking'),
            type: new FormControl(Addiction.Smoking)
        }),
        [Addiction.Alcoholism]: () => new FormGroup({
            goal: new FormControl('', Validators.required),
            startDate: new FormControl(new Date()),
            limit: new FormControl(0, Validators.required),
            price: new FormControl('', Validators.required),
            name: new FormControl('Alcoholism'),
            type: new FormControl(Addiction.Alcoholism)
        }),
        [Addiction.Narcotics]: () => new FormGroup({
            goal: new FormControl('', Validators.required),
            startDate: new FormControl(new Date()),
            limit: new FormControl(0, Validators.required),
            price: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            type: new FormControl(Addiction.Narcotics)
        }),
        [Addiction.Custom]: () => new FormGroup({
            goal: new FormControl('', Validators.required),
            startDate: new FormControl(new Date()),
            limit: new FormControl(0, Validators.required),
            price: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            description: new FormControl(''),
            type: new FormControl(Addiction.Custom)
        })
    }

    appConfigFormGroup: FormGroup = new FormGroup({
        achievements: new FormGroup({
            isEnabled: new FormControl(false),
            moduleData: new FormControl(['On the way to recovery'])
        }),
        content: new FormGroup({
            isEnabled: new FormControl(false),
            contentRestriction: new FormControl(false),
            textContentEnabled: new FormControl(false),
            videoContentEnabled: new FormControl(false),
            moduleData: new FormControl([])
        }),
        failure: new FormGroup({
            isEnabled: new FormControl(false),
            moduleData: new FormControl([])
        }),
        finance: new FormGroup({
            isEnabled: new FormControl(false),
            moduleData: new FormControl([]),
            currency: new FormControl(''),
            isPrognosticationsEnabled: new FormControl(false),
        }),
        poll: new FormGroup({
            isEnabled: new FormControl(false),
            moduleData: new FormControl([]),
            pollNotificationEnabled: new FormControl(false),
            subject: new FormControl(['progress'])
        }),
        reminder: new FormGroup({
            isEnabled: new FormControl(false),
            moduleData: new FormControl([]),
            frequency: new FormControl(''),
            time: new FormControl(''),
        }),
        statistics: new FormGroup({
            isEnabled: new FormControl(false),
            moduleData: new FormControl([]),
            mode: new FormControl(0)
        })
    })

    addictionForm: FormGroup;
    userLogin: string;


    constructor(private readonly addService: AddictionsService, private readonly router: Router, private userService: UserService, private fsService: StoreService) {
        this.appConfigFormGroup.get('content').get('isEnabled').valueChanges.subscribe(value => {
            if (!value) {
                this.appConfigFormGroup.get('content').get('contentRestriction').setValue(false);
                this.appConfigFormGroup.get('content').get('textContentEnabled').setValue(false);
                this.appConfigFormGroup.get('content').get('videoContentEnabled').setValue(false);
            }
        });

        this.appConfigFormGroup.get('finance').get('isEnabled').valueChanges.subscribe(value => {
            if (!value) {
                this.appConfigFormGroup.get('finance').get('currency').setValue('');
                this.appConfigFormGroup.get('finance').get('isPrognosticationsEnabled').setValue(false);
            }
        });

        this.appConfigFormGroup.get('poll').get('isEnabled').valueChanges.subscribe(value => {
            if (!value) {
                this.appConfigFormGroup.get('poll').get('subject').setValue(['progress']);
                this.appConfigFormGroup.get('poll').get('pollNotificationEnabled').setValue(false);
            }
        });

        this.appConfigFormGroup.get('reminder').get('isEnabled').valueChanges.subscribe(value => {
            if (!value) {
                this.appConfigFormGroup.get('reminder').get('frequency').setValue('');
                this.appConfigFormGroup.get('reminder').get('time').setValue('');
            }
        });

        this.appConfigFormGroup.get('statistics').get('isEnabled').valueChanges.subscribe(value => {
            if (!value) {
                this.appConfigFormGroup.get('mode').get('frequency').setValue(0);
            }
        });

        this.userService.user$.pipe(take(1)).subscribe(user => this.userLogin = user.username)
    }

    isDisabledAddictionType(type: Addiction): boolean {
        if (type === Addiction.Custom) return false;

        return this.addService.addictions.some(add => add.type === type);
    }

    save(): void {
        const addictionRules = {
            ...this.addictionForm.value,
            appRules: {
                ...this.appConfigFormGroup.value
            }
        };

        this.addService.addictions.push(addictionRules);
        this.addService.selectAddIndex$.next(this.addService.addictions.findIndex(a => a.name === addictionRules.name));

        this.fsService.saveAddictions(this.addService.addictions, this.userLogin).then();

        this.router.navigate(['landing']);
    }


    clearAddictionForm(): void {
        this.addictionForm = this.addictionDescriptions[this.addictionType]();
    }
}
