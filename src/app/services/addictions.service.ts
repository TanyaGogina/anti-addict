import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AddictionsService {
    addictions: any[] = [];
    selectedAddictionIndex: number;

    selectAddIndex$: ReplaySubject<number> = new ReplaySubject<number>(1);
}
