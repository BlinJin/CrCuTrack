// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 8.3.18 1.52
//

import {ISystemLogger, ModeLogger, SystemLogger} from "imx-logger";
import fetch from "node-fetch";
import {COINMARKETCAP_LIST_HISTORY_FUNC} from "./end-points";

const logger: ISystemLogger = new SystemLogger({
	pathModule: __filename,
	mode: ModeLogger.DEVELOP,
	section: "currency:history-parser"
});

export class HistoryParser {

	public async getHistory(): Promise<string> {
		const idCurrency: string = "bitcoin";
		const dateFrom: string = "20180301";
		const dateTo: string = "20180308";
		const urlToRequest: string = COINMARKETCAP_LIST_HISTORY_FUNC(idCurrency, dateFrom, dateTo);
		const response: any = await fetch(urlToRequest);
		return response;
	}
}

(async () => {
	const historyParser: HistoryParser = new HistoryParser();
	logger.info(await historyParser.getHistory());
})();
