// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 4.3.18 2.50
//
import {isPresent} from "imx-lang";
import {CRYPTO_SYMBOL} from "../crypto-currency";
import {ITransaction} from "./ITransaction";
import {OPERATION_TYPE} from "./OperationType";

export class Transaction implements ITransaction {
	public currencySubject: CRYPTO_SYMBOL;
	public typeOperation: OPERATION_TYPE;
	public amount: number;
	public priceBTC?: number;
	public priceUSD?: number;
	public currencyObject: CRYPTO_SYMBOL;
	public priceObjectCurrency: number;

	constructor(transaction: ITransaction) {
		if (isPresent(transaction)) {
			this.currencySubject = transaction.currencySubject as CRYPTO_SYMBOL;
			this.typeOperation = transaction.typeOperation as OPERATION_TYPE;
			this.amount = transaction.amount;
			this.priceBTC = transaction.priceBTC;
			this.priceUSD = transaction.priceUSD;
			this.currencyObject = transaction.currencyObject as CRYPTO_SYMBOL;
			this.priceObjectCurrency = transaction.priceObjectCurrency;
		}
	}
}
