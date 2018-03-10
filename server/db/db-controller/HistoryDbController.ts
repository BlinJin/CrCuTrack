// ******************************************************
//               COPYRIGHT (C) 2017 - 2018
// ******************************************************
//
//  Author    : Uladzimir Akulenka
//  Created   : 10.3.18 22.13
//

import {DBController, IOptionsDB} from "imx-db-adapter";
import {HistoryDay} from "../../domen/history";

export class HistoryDbController extends DBController<HistoryDay> {
	constructor(config: IOptionsDB) {
		super(config);
	}
}
