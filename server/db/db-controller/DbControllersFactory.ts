import {CurrencyWalletDbController} from "./CurrencyWalletDbController";
import {DBKey} from "./DBKey";
import {DBController, IOptionsDB} from "imx-db-adapter";
import {buildPath} from "imx-fs";
import {TransactionDbController} from "./TransactionDbController";

const pathToDb: string = buildPath(__dirname, "../store");

export class DbControllersFactory {

	public static getDbController(key: DBKey): DBController<any> {
		if (!(key in DBKey)) {
			throw new Error("Invalid Db Key controller");
		}

		switch (key) {
		    case DBKey.CURRENCY_WALLET: {
			    const config: IOptionsDB = {filename: buildPath(pathToDb, "currency-wallet.db")};
			    return new CurrencyWalletDbController(config);
		        }
			case DBKey.TRANSACTION: {
				const config: IOptionsDB = {filename: buildPath(pathToDb, "transaction.db")};
				return new TransactionDbController(config);
			}
		    default:
		        throw new Error(`Doesn't exist db controller for db key ${key}`);
		}
	}
}
