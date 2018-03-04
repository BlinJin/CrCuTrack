import {readFile} from "imx-fs";
import {isBlank} from "imx-lang";
import {DBController, QueryDB} from "imx-db-adapter";
import {IConfigLogger, ISystemLogger, ModeLogger, SystemLogger} from "imx-logger";
import * as util from "util";
import {CurrencyWallet} from "../../domen/crypto-currency/CurrencyWallet";
import {ITransaction, Transaction} from "../../domen/operations";
import {DbControllersFactory} from "../db-controller/DbControllersFactory";
import {DBKey} from "../db-controller/DBKey";

const CONFIG_LOGGER: IConfigLogger = {
	pathModule: __filename,
	mode: ModeLogger.DEVELOP,
	section: "db:script-init"
};

const logger: ISystemLogger = new SystemLogger(CONFIG_LOGGER);

const initCurrencyWallet = async (): Promise<void> => {
	try {
		const readData: any = await readFile("transactions.json");
		if (isBlank(readData)) {
			throw new Error("Cannot read transactions.json.");
		}
		const walletCurrencies: Array<ITransaction> = JSON.parse(readData);
		const controller: DBController<ITransaction> =
			DbControllersFactory.getDbController(DBKey.TRANSACTION);
		await controller.drop();
		const walletCurrenciesInsert: Array<Promise<void>> = walletCurrencies
			.map(async (elem: ITransaction) => {
				const query: QueryDB<ITransaction> = elem;
				await controller.insert(elem);
				logger.info(`${util.inspect(elem, 
					{colors: true, depth: 4, showHidden: true})} ${elem.amount}  inserted`);
			});
		await Promise.all(walletCurrenciesInsert);
		logger.info("Check inserted items");
		const query: QueryDB<CurrencyWallet> = {};
		const foundElements: Array<ITransaction> = await controller.find(query);
		const foundElementsDisplay: Array<Promise<void>> = foundElements.map((elem: ITransaction) => {
			return new Promise<void>((resolve, reject) => {
				logger.info(`${util.inspect(elem,
					{colors: true, depth: 4, showHidden: true})} ${elem.amount}  read`);
				return resolve();
			});
		});
		await Promise.all(foundElementsDisplay);
	} catch (err) {
		logger.error(err);
		throw err;
	}
};

initCurrencyWallet();
