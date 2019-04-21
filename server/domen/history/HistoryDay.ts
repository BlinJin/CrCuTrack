// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 9.3.18 0.19
//
import {isPresent} from "lab-lang";
import {CRYPTO_SYMBOL} from "../crypto-currency/CurrencySymbol";

export class HistoryDay {
	public id: string;
	public name: string;
	public symbol: CRYPTO_SYMBOL;
	public date: any;
	public open: any;
	public close: any;
	public volume: any;
	public marketCup: any;

	constructor(dayHistory: any) {
		if (isPresent(dayHistory)) {
			this.id = dayHistory.id;
			this.name = dayHistory.name;
			this.symbol = dayHistory.symbol;
			this.date = dayHistory.date;
			this.open = parseFloat(dayHistory.open);
			this.close = parseFloat(dayHistory.close);
			this.volume = parseFloat(dayHistory.volume.replace(/,/g, ""));
			this.marketCup = parseFloat(dayHistory.marketCup.replace(/,/g, ""));
		}
	}
}