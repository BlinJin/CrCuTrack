
import {DBController, IOptionsDB} from "lab-db-adapter";
import {CurrencyWallet} from "../../domen/crypto-currency/CurrencyWallet";

export class CurrencyWalletDbController extends DBController<CurrencyWallet> {
    constructor(config: IOptionsDB) {
        super(config);
    }
}
