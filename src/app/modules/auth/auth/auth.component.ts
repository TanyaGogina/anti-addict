import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    isRegistration: boolean = false;
    userForm: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        name: new FormControl(''),
        age: new FormControl('')
    })

    constructor(private readonly userService: UserService, private readonly router: Router) {
    }

    changeMode(): void {
        this.isRegistration = !this.isRegistration;
        this.userForm.reset();
    }

    login(): void {
        const userData = this.userForm.value;

        if (!userData.name) userData.name = 'Tanya';
        if (!userData.age) userData.age = 23;

        this.userService.user$.next(userData);

        this.router.navigate(['landing'], { replaceUrl: true });
    }
}
