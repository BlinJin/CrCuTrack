export const COINMARKETCAP_LIST_CURRENCIES =
	"https://api.coinmarketcap.com/v1/ticker/";
export const COINMARKETCAP_LIST_HISTORY_FUNC = (idCurrency: string, dateFrom: string, dateTo: string): string => {
	return `https://coinmarketcap.com/currencies/${idCurrency}/historical-data/?start=${dateFrom}&end=${dateTo}`;
}
