// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 4.3.18 2.49
//
import {DBController, IOptionsDB} from "imx-db-adapter";
import {ITransaction} from "../../domen/operations";

export class TransactionDbController extends DBController<ITransaction> {
	constructor(config: IOptionsDB) {
		super(config);
	}
}
