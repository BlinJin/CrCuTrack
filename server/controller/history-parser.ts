// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 8.3.18 1.52
//

import {isPresent} from "imx-lang";
import {ISystemLogger, ModeLogger, SystemLogger} from "imx-logger";
import fetch from "node-fetch";
import * as util from "util";
import * as zlib from "zlib";
import {Gunzip} from "zlib";
import {DbControllersFactory} from "../db/db-controller/DbControllersFactory";
import {DBKey} from "../db/db-controller/DBKey";
import {HistoryDbController} from "../db/db-controller/HistoryDbController";
import {CRYPTO_SYMBOL, getCurrencyIDBySymbol} from "../domen/crypto-currency/CurrencySymbol";
import {HistoryDay} from "../domen/history/HistoryDay";
import {COINMARKETCAP_LIST_HISTORY_FUNC} from "./end-points";

const logger: ISystemLogger = new SystemLogger({
	pathModule: __filename,
	mode: ModeLogger.DEVELOP,
	section: "currency:history-parser"
});

const headerTable: Array<string> = ["date", "open", "high", "low", "close", "volume", "marketCup"];
const constDateFrom: string = "20130310"
const constDateTo: string = "20180310"

export class HistoryParser {

	private symbolCurrency: CRYPTO_SYMBOL;

	public async getHistory(symbol: CRYPTO_SYMBOL): Promise<string> {
		this.symbolCurrency = symbol;
		const idCurrency: string = getCurrencyIDBySymbol(symbol);
		const dateFrom: string = constDateFrom;
		const dateTo: string = constDateTo;
		const urlToRequest: string = COINMARKETCAP_LIST_HISTORY_FUNC(idCurrency, dateFrom, dateTo);
		const response: any = await fetch(urlToRequest);
		return response.buffer();
	}

	public findTable(source: string): string {
		const index1: number = source.indexOf("table-responsive");
		const index2: number = source.indexOf("<thead>", index1);
		const index3: number = source.indexOf("</tbody>", index2);
		const trimmedText: string = source.substr(index2, index3 - index2 + "</tbody>".length);
		return trimmedText;
	}

	public parseRaws(source: string): Array<HistoryDay> {
		let positionFromToFind: number = 0;
		const results: Array<any> = [];
		while (this.isExistRaw(source, positionFromToFind)) {
			const index1: number = source.indexOf("<tr class=\"text-right\">", positionFromToFind);
			const index2: number = source.indexOf("</tr>", index1);
			const raw: string = source.substr(index1, index2 - index1 + "</tr>".length);
			positionFromToFind = index2 + "</tr>".length;
			results.push(this.parseCell(raw));
		}
		return results;
	}

	public parseCell(raw: string): HistoryDay {
		let positionFromToFind: number = 0;
		const results: any = {};
		let index: number = 0;
		while (this.isExistCell(raw, positionFromToFind)) {
			const index1: number = raw.indexOf("td", positionFromToFind);
			const index2: number = raw.indexOf(">", index1);
			const index3: number = raw.indexOf("</td>", index2);
			const cellVal: string = raw.substr(index2 + 1, index3 - index2 - 1);
			positionFromToFind = index3 + "</td>".length;
			results[headerTable[index]] = cellVal;
			index++;
		}
		results["symbol"] = this.symbolCurrency;
		results["name"] = this.symbolCurrency;
		results["id"] = this.symbolCurrency;
		return new HistoryDay(results);
	}

	public isExistCell(raw: string, currentIndex: number): boolean {
		return raw.indexOf("td", currentIndex) !== -1;
	}

	public isExistRaw(table: string, currentIndex: number): boolean {
		return table.indexOf("<tr class=\"text-right\">", currentIndex) !== -1;
	}
}

const generateSymbolHistory = async (symbol: CRYPTO_SYMBOL) => {
	console.time(symbol);
	const historyParser: HistoryParser = new HistoryParser();
	const historyPage: string = await historyParser.getHistory(symbol);
	const tableWithData: string = historyParser.findTable(historyPage.toString());
	const result: Array<HistoryDay> = historyParser.parseRaws(tableWithData);
	const dbHistoryController: HistoryDbController =
		DbControllersFactory.getDbController(DBKey.HISTORY, symbol);
	// result.forEach((elem: HistoryDay) => {
	// 	dbHistoryController.insert(result);
	// 	// logger.info(util.inspect(elem,
	// 	// 	{colors: true, depth: 4, showHidden: true}));
	// });
	dbHistoryController.insert(result);
	console.timeEnd(symbol);
}

(async () => {
	try {

		const currencyHistoryFunctions: any = [];
		for (const currency in CRYPTO_SYMBOL) {
			const idCurrency: string = getCurrencyIDBySymbol(currency as CRYPTO_SYMBOL);
			if (isPresent(idCurrency)) {
				currencyHistoryFunctions.push(generateSymbolHistory(currency as CRYPTO_SYMBOL));
			}
			else {
				logger.warn(`Doesn't exist ${currency}`);
			}
		}
		await Promise.all(currencyHistoryFunctions);
	}
	catch (err) {
		logger.error(err);
	}
})();
