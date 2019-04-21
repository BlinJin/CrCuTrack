import chalk from "chalk";
import {ISystemLogger, ModeLogger, SystemLogger} from "lab-logger";
import fetch from "node-fetch";
import * as util from "util";
import {CryptoCurrency, ICryptoCurrency} from "../domen/crypto-currency/index";
import {Observable, Subject} from "rxjs";
import {COINMARKETCAP_LIST_CURRENCIES} from "./end-points";

const logger: ISystemLogger = new SystemLogger({
	pathModule: __filename,
	mode: ModeLogger.DEVELOP,
	section: "currency:watcher"
});

export class CurrencyWatcher {
	public refuseCurrencyWatcher: Subject<void> = new Subject<void>();

	public activateCurrencyWatcher(): Observable<Map<string, ICryptoCurrency>> {
		this.refuseCurrencyWatcher.next();
		const interval: number = 2000;
		const timerRequest = Observable.interval(interval);
		return timerRequest.switchMap(() => Observable.fromPromise(
			fetch(COINMARKETCAP_LIST_CURRENCIES)
				.then((result) => result.json())
				.then((json: any) => {
					return json.slice(0, 30)
						.map((elem: any) => new CryptoCurrency(elem));
				})
			)
			.map((list: Array<ICryptoCurrency>) => {
				const map: Map<string, ICryptoCurrency> = new Map<string, ICryptoCurrency>();
				list.forEach((elem) => {
					map.set(elem.symbol, elem);
				});
				return map;
			})
			.takeUntil(this.refuseCurrencyWatcher));
	}

	public deactivateCurrerncyWatcher() {
		this.refuseCurrencyWatcher.next();
	}

	public display(cryptosMap: Map<string, ICryptoCurrency>) {
		let final: string = "\n";
		let symbolToId: string = "\n";
		for (const [key, value] of cryptosMap) {
			final += `${key} - ${value.priceBtc} B, ${value.priceUsd} USD ` + "\n";
			symbolToId += `${value.symbol} - ${value.id}` + "\n";
		}

		logger.info(chalk.magenta(final));
	}

}

const watcher: CurrencyWatcher = new CurrencyWatcher();
watcher.activateCurrencyWatcher().subscribe((result: any) => {
		watcher.display(result);
});

setTimeout(() => {
	watcher.deactivateCurrerncyWatcher();
}, 5000);