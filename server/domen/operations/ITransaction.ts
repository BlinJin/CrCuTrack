// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 4.3.18 3.02
//

import {CRYPTO_SYMBOL} from "../crypto-currency";
import {OPERATION_TYPE} from "./OperationType";

export interface ITransaction {
	currencySubject: CRYPTO_SYMBOL;
	typeOperation: OPERATION_TYPE;
	amount: number;
	priceBTC?: number;
	priceUSD?: number;
	currencyObject: CRYPTO_SYMBOL;
	priceObjectCurrency: number;
	wallet?: string;
	description?: string;
	date: string;
}
