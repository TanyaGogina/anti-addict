import {Component, OnInit} from '@angular/core';
import {AddictionsService} from "../../../services/addictions.service";

@Component({
    selector: 'app-finance',
    templateUrl: './finance.component.html',
    styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {
    alreadySavedMoney: number = 0;
    savedForThisMonthMoney: number = 0;
    savedForThisWeekMoney: number = 0;
    currencyOfUser: string = '₴';

    prognosesEnabled: boolean = false;

    dayToCar: string;
    moneyInMonth: number;
    moneyInYear: number;
    moneyIn10Years: number;
    carPrice: number;

    carPriceInUah = 300000;

    constructor(private addService: AddictionsService) {
    }

    ngOnInit() {
        this.addService.selectAddIndex$.subscribe(index => {
            // finance
            const addiction = this.addService.addictions[index];
            const startDate = addiction.startDate.toDate();
            const pricePerMonth = addiction.price;
            const pricePerWeek = pricePerMonth / 4;
            const currentDate = new Date();

            const diffTime = Math.abs(startDate.getTime() - currentDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const savedMonths = diffDays / 30;

            this.alreadySavedMoney = Math.round(savedMonths * addiction.price);

            const currentDay = currentDate.getDay() + 1;

            this.savedForThisWeekMoney = Math.round(pricePerWeek / 7 * currentDay);

            const monthStart = new Date(new Date().setDate(0));
            const diffTime2 = Math.abs(monthStart.getTime() - currentDate.getTime());
            const diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));

            this.savedForThisMonthMoney = Math.round(pricePerMonth / 30 * diffDays2);

            if (diffDays <= 1) {
                this.alreadySavedMoney = 0;
                this.savedForThisWeekMoney = 0;
                this.savedForThisMonthMoney = 0;
            }

            const curr = addiction.appRules.finance.currency;

            switch (curr) {
                case 'UAH':
                    this.currencyOfUser = '₴';
                    this.carPrice = this.carPriceInUah;
                    break;
                case 'USD':
                    this.currencyOfUser = '$';
                    this.carPrice = this.carPriceInUah * 27;
                    break;
                case 'EUR':
                    this.currencyOfUser = '€';
                    this.carPrice = this.carPriceInUah * 32;
                    break;
                default :
                    this.currencyOfUser = '₴';
                    this.carPrice = this.carPriceInUah;
            }

            this.prognosesEnabled = addiction.appRules.finance.isPrognosticationsEnabled;

            // predictions
            if (this.prognosesEnabled) {
                this.moneyInMonth = pricePerMonth + this.alreadySavedMoney;
                this.moneyInYear = pricePerMonth * 12 + this.alreadySavedMoney;
                this.moneyIn10Years = pricePerMonth * 12 * 10 + this.alreadySavedMoney

                const moneyLeft = this.carPrice - this.alreadySavedMoney;
               this.dayToCar = (moneyLeft / (pricePerMonth * 12)).toFixed(2);
            }
        })
    }

}
