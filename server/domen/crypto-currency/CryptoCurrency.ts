import {CRYPTO_SYMBOL} from "./CurrencySymbol";
import {ICryptoCurrency} from "./ICryptoCurrency";

export class CryptoCurrency implements ICryptoCurrency {

	public id: string;
	public name: string;
	public symbol: CRYPTO_SYMBOL;
	public rank: string;
	public priceUsd: string;
	public priceBtc: string;
	public volumeUsd24h: string;
	public marketCapUsd: string;
	public availableSupply: string;
	public totalSupply: string;
	public maxSupply: string;
	public percentChange1h: string;
	public percentChange24h: string;
	public percentСhange7d: string;
	public lastUpdated: string;

	constructor(rawData: any) {
		try {
			this.id = rawData.id;
			this.name = rawData.name;
			this.symbol = rawData.symbol;
			this.rank = rawData.rank;
			this.priceUsd = rawData.price_usd;
			this.priceBtc = rawData.price_btc;
			this.volumeUsd24h = rawData["24h_volume_usd"];
			this.marketCapUsd = rawData.market_cap_usd;
			this.availableSupply = rawData.available_supply;
			this.totalSupply = rawData.total_supply;
			this.maxSupply = rawData.max_supply;
			this.percentChange1h = rawData.percent_change_1h;
			this.percentChange24h = rawData.percent_change_24h;
			this.percentСhange7d = rawData.percent_change_7d;
			this.lastUpdated = rawData.last_updated;
		}
		catch (err) {
			console.error(err);
		}

	}
}
