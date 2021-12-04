import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user$: BehaviorSubject<any> = new BehaviorSubject({
        username: 'tanyagogina',
        password: 'qwerty',
        name: 'Tanya',
        age: 23
    });
}
