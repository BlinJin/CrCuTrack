// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 10.3.18 22.13
//

import {DBController, IOptionsDB} from "lab-db-adapter";
import {CRYPTO_SYMBOL} from "../../domen/crypto-currency/CurrencySymbol";
import {HistoryDay} from "../../domen/history";
import {DbControllersFactory} from "./DbControllersFactory";
import {DBKey} from "./DBKey";
import * as moment from "moment";

export class HistoryDbController extends DBController<HistoryDay> {
	constructor(config: IOptionsDB) {
		super(config);
	}
}

const priceChecker = async (date: string, symbol: CRYPTO_SYMBOL ) => {
	const dbController: HistoryDbController
		= DbControllersFactory.getDbController(DBKey.HISTORY, symbol);
	const day = moment(new Date(date));
	console.log(day.toDate());
	console.log(day.format("MMM DD, YYYY"));
	const history: HistoryDay = await dbController.findOne({date: day.format("MMM DD, YYYY")});
	const maxDayPrice: number = history.open > history.close ? history.close : history.open;
	console.log(history, 390 / maxDayPrice + " " + symbol);
};

(async () => {
	const symbol: CRYPTO_SYMBOL = CRYPTO_SYMBOL.TRX;
	await priceChecker("12/7/2017", symbol);
	await priceChecker("3/10/2018", symbol);
})();



