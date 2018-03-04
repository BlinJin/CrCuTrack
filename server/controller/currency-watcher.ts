import {ISystemLogger, ModeLogger, SystemLogger} from "imx-logger";
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

	public activateCurrencyWatcher() {
		this.refuseCurrencyWatcher.next();
		const timerRequest = Observable.interval(1000);
		timerRequest.switchMap(() => Observable.fromPromise(fetch(COINMARKETCAP_LIST_CURRENCIES)))
			.takeUntil(this.refuseCurrencyWatcher)
			.subscribe((result: any) => {
			result.json().then((json: any) => {
				const cryptoCurrency: Array<ICryptoCurrency> = json.slice(0, 30)
					.map((elem: any) => new CryptoCurrency(elem));
				this.display(cryptoCurrency);
			});
		});
	}

	public deactivateCurrerncyWatcher() {
		this.refuseCurrencyWatcher.next();
	}

	private display(cryptos: Array<ICryptoCurrency>) {
		logger.info(util.inspect(cryptos.map((currency: ICryptoCurrency) =>
			`${currency.symbol} = ${currency.priceUsd}`),
			{colors: true, showHidden: false, depth: 3}));
	}

}

// const watcher: CurrencyWatcher = new CurrencyWatcher();
// watcher.activateCurrencyWatcher();
//
// setTimeout(() => {
// 	watcher.deactivateCurrerncyWatcher();
// }, 5000);