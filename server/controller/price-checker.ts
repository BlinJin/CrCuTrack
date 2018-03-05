import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Rx";
import {ICryptoCurrency} from "../domen/crypto-currency";
// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 6.3.18 1.19
//
import {CurrencyWatcher} from "./currency-watcher";

export class PriceChecker {
	public refuseChecking: Subject<void> = new Subject<void>();
	private currencyWatcher: CurrencyWatcher = new CurrencyWatcher();

	public activateChecking(): Observable<any> {
		this.refuseChecking.next();
		return this.currencyWatcher
			.activateCurrencyWatcher().switchMap((currencyList: Map<string, ICryptoCurrency>) => {
				return Observable.of(this.checkPriceRoute(currencyList));
			}).takeUntil(this.refuseChecking);
	}

	public deactivateChecking() {
		this.refuseChecking.next();
	}

	private checkPriceRoute(mapCurrency: Map<string, ICryptoCurrency>): number {
		let sum: number = 0;
		for (const [key, currency] of mapCurrency) {
			sum += parseFloat(currency.priceUsd);
		}
		return sum;
	}


}

const priceChecker: PriceChecker = new PriceChecker();
priceChecker.activateChecking().subscribe((result: any) => {
	console.log(result);
});

setTimeout(() => {
	priceChecker.deactivateChecking();
}, 10000);
