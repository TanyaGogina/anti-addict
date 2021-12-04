import {Component, OnInit} from '@angular/core';
import {AddictionsService} from "../../services/addictions.service";
import {FormControl, FormGroup} from "@angular/forms";
import {take} from "rxjs/operators";
import {UserService} from "../../services/user.service";
import {StoreService} from "../../services";
import {Router} from "@angular/router";

@Component({
    selector: 'app-edit-addiction',
    templateUrl: './edit-addiction.component.html',
    styleUrls: ['./edit-addiction.component.scss'],
})
export class EditAddictionComponent implements OnInit {
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

    addictionIndex: number;
    userLogin: string;

    constructor(private addService: AddictionsService, private userService: UserService, private fsService: StoreService, private router: Router) {
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

    ngOnInit() {
        this.addService.selectAddIndex$.subscribe(index => {
            this.addictionIndex = index;
            const addiction = this.addService.addictions[index];
            this.appConfigFormGroup.patchValue(addiction.appRules);
        })
    }

    save(): void {
        const addictionToUpdate = this.addService.addictions[this.addictionIndex];
        addictionToUpdate.appRules = this.appConfigFormGroup.value;

        this.addService.selectAddIndex$.next(this.addictionIndex);
        this.fsService.saveAddictions(this.addService.addictions, this.userLogin).then();

        this.router.navigate(['landing']);
    }
}
