import chalk from "chalk";
// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 6.3.18 1.19
//
import {CurrencyWatcher} from "./currency-watcher";
import {ISystemLogger, ModeLogger, SystemLogger} from "imx-logger";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Rx";
import {ICryptoCurrency} from "../domen/crypto-currency";

const logger: ISystemLogger = new SystemLogger({
	pathModule: __filename,
	mode: ModeLogger.DEVELOP,
	section: "currency:price-checker"
});

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

	private checkPriceRoute(mapCurrency: Map<string, ICryptoCurrency>): any {
		for (const [key, currency] of mapCurrency) {
			const symbolSourceCurrency: string = key;
			const priceUsdSourceCurrency: number = currency.priceUsd;
			const priceBtcSourceCurrency: number = currency.priceBtc;
			for (const [secKey, secCurrency] of mapCurrency) {
				const crossCourseBtc: number = priceBtcSourceCurrency / secCurrency.priceBtc;
				const crossCourseUsd: number = priceUsdSourceCurrency / secCurrency.priceUsd;
				logger.info(chalk.bold.green(symbolSourceCurrency) + "-> BTC -> "
					+ chalk.bold.blue(secKey) + ":" + crossCourseBtc);
				logger.info(chalk.bold.green(symbolSourceCurrency) + "-> USD -> "
					+ chalk.bold.blue(secKey) + ":" + crossCourseUsd);
			}
			logger.info(chalk.blue("------------------------------------------------"));
		}
		return;
	}
}

const priceChecker: PriceChecker = new PriceChecker();
priceChecker.activateChecking().subscribe((result: any) => {
	console.log(result);
});

setTimeout(() => {
	// priceChecker.deactivateChecking();
}, 10000);
