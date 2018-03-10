// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 4.3.18 2.43
//
export enum CRYPTO_SYMBOL {
	BTC = "BTC",
	ETH = "ETH",
	XRP = "XRP",
	BCH = "BCH",
	LTC = "LTC",
	NEO = "NEO",
	ADA = "ADA",
	XLM = "XLM",
	EOS = "EOS",
	XMR = "XMR",
	MIOTA = "MIOTA",
	DASH = "DASH",
	XEM = "XEM",
	TRX = "TRX",
	ETC = "ETC",
	USDT = "USDT",
	VEN = "VEN",
	NANO = "NANO",
	LSK = "LSK",
	QTUM = "QTUM",
	BTG = "BTG",
	OMG = "OMG",
	ICX = "ICX",
	ZEC = "ZEC",
	DGD = "DGD",
	BNB = "BNB",
	STEEM = "STEEM",
	STRAT = "STRAT",
	BCN = "BCN",
	PPT = "PPT",
	WAVES = "WAVES",
	SC = "SC",
	RHOC = "RHOC",
	MKR = "MKR",
	DOGE = "DOGE",
	BTS = "BTS",
	SNT = "SNT",
	DCR = "DCR",
	AE = "AE",
	REP = "REP",
	KMD = "KMD",
	WTC = "WTC",
	VERI = "VERI",
	ZRX = "ZRX",
	ETN = "ETN",
	ARK = "ARK",
	ARDR = "ARDR",
	HSR = "HSR",
	BTM = "BTM",
	ETHOS = "ETHOS",
	BAT = "BAT",
	SYS = "SYS",
	GAS = "GAS",
	GNT = "GNT",
	PIVX = "PIVX",
	DRGN = "DRGN",
	DGB = "DGB",
	CNX = "CNX",
	KCS = "KCS",
	ELF = "ELF",
	MONA = "MONA",
	FCT = "FCT",
	R = "R",
	ZIL = "ZIL",
	AION = "AION",
	LRC = "LRC",
	FUN = "FUN",
	QASH = "QASH",
	NAS = "NAS",
	GBYTE = "GBYTE",
	PART = "PART",
	RDD = "RDD",
	KNC = "KNC",
	SALT = "SALT",
	IOST = "IOST",
	GXS = "GXS",
	DENT = "DENT",
	NEBL = "NEBL",
	XZC = "XZC",
	POWR = "POWR",
	LINK = "LINK",
	POLY = "POLY",
	KIN = "KIN",
	ENG = "ENG",
	ICN = "ICN",
	DCN = "DCN",
	BNT = "BNT",
	NXT = "NXT",
	BTX = "BTX",
	SMART = "SMART",
	REQ = "REQ",
	CND = "CND",
	PLR = "PLR",
	BLOCK = "BLOCK",
	PAY = "PAY",
	MAID = "MAID",
	NXS = "NXS",
	AGI = "AGI",
	VTC = "VTC"
}

export function getCurrencyIDBySymbol(symbol: CRYPTO_SYMBOL): string {
	switch (symbol) {
		case CRYPTO_SYMBOL.BTC: {
			return "bitcoin";
		}
		case CRYPTO_SYMBOL.ETH: {
			return "ethereum";
		}
		case CRYPTO_SYMBOL.XRP: {
			return "ripple";
		}
		case CRYPTO_SYMBOL.BCH: {
			return "bitcoin-cash";
		}
		case CRYPTO_SYMBOL.LTC: {
			return "litecoin";
		}
		case CRYPTO_SYMBOL.NEO: {
			return "neo";
		}
		case CRYPTO_SYMBOL.ADA: {
			return "cardano";
		}
		case CRYPTO_SYMBOL.XLM: {
			return "stellar";
		}
		case CRYPTO_SYMBOL.EOS: {
			return "eos";
		}
		case CRYPTO_SYMBOL.XMR: {
			return "monero";
		}
		case CRYPTO_SYMBOL.DASH: {
			return "dash";
		}
		case CRYPTO_SYMBOL.MIOTA: {
			return "iota";
		}
		case CRYPTO_SYMBOL.XEM: {
			return "nem";
		}
		case CRYPTO_SYMBOL.TRX: {
			return "tron";
		}
		case CRYPTO_SYMBOL.USDT: {
			return "tether";
		}
		case CRYPTO_SYMBOL.ETC: {
			return "ethereum-classic";
		}
		case CRYPTO_SYMBOL.VEN: {
			return "vechain";
		}
		case CRYPTO_SYMBOL.LSK: {
			return "lisk";
		}
		case CRYPTO_SYMBOL.LSK: {
			return "lisk";
		}
		case CRYPTO_SYMBOL.NANO: {
			return "nano";
		}
		case CRYPTO_SYMBOL.OMG: {
			return "omisego";
		}
		case CRYPTO_SYMBOL.BTG: {
			return "bitcoin-gold";
		}
		case CRYPTO_SYMBOL.QTUM: {
			return "qtum";
		}
		case CRYPTO_SYMBOL.ZEC: {
			return "zcash";
		}
		case CRYPTO_SYMBOL.ICX: {
			return "icon";
		}
		case CRYPTO_SYMBOL.BNB: {
			return "binance-coin";
		}
		case CRYPTO_SYMBOL.DGD: {
			return "digixdao";
		}
		case CRYPTO_SYMBOL.STEEM: {
			return "steem";
		}
		case CRYPTO_SYMBOL.BCN: {
			return "bytecoin-bcn";
		}
		case CRYPTO_SYMBOL.PPT: {
			return "populous";
		}
		case CRYPTO_SYMBOL.WAVES: {
			return "waves";
		}
		default:
			return null;
	}
}
