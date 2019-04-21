import {ISystemLogger, ModeLogger, SystemLogger} from "lab-logger";
import * as express from "express";
import * as net from "net";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import {Stats} from "fs";
import {buildPath} from "lab-fs";
import {CurrencyWatcher} from "./controller/currency-watcher";

const syslog: ISystemLogger = new SystemLogger({
	pathModule: __filename,
	mode: ModeLogger.DEVELOP,
	section: "root:serverapp"
});

export class ServerApplication {
	private staticContent: string;
	private _proxy: express.Application;

	/**
	 * Constructor.
	 *
	 * @class Server
	 * @constructor
	 */
	constructor() {
		// create main controller
		// this.mainController = new ApplicationMainController();
		// create express application
		this._proxy = express();
		// configure application
		this.config();
		// add routes
		this.routes();
	}

	public get proxy(): express.Application {
		return this._proxy;
	}

	public async init(server: net.Server): Promise<void> {
		// await this.mainController.init();
		syslog.info("Init app.");
	}

	/**
	 * Configure application
	 *
	 * @class Server
	 * @method config
	 */
	private config(): void {
		this.staticContent = buildPath(__dirname, "../client/dist");
		// One minute: max-age=60
		// One hour: max-age=3600
		// One day: max-age=86400
		// One week: max-age=604800
		// One month: max-age=2628000
		// One year: max-age=31536000
		const CACHE_EXPIRED: number = 2628000;
		const STALE_WHILE_REVALIDATE: number = 604800;
		const setCache: (res: express.Response, path?: string, stat?: Stats) => void =
			(res: express.Response, path?: string, stat?: Stats) => {
				res.setHeader("Cache-Control", [
					"immutable",
					"stale-while-revalidate=" + STALE_WHILE_REVALIDATE,
					"max-age=" + CACHE_EXPIRED
				]);
			};

		this._proxy.use(compression());
		this._proxy.use(bodyParser.json());
		this._proxy.use(bodyParser.urlencoded({extended: false}));
		this._proxy.use(express.static(this.staticContent, {etag: false, lastModified: false, setHeaders: setCache}));

		// error handling
		this._proxy.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
			syslog.error(err);
			return res.status(500).send(err.message);
		});

		const watcher: CurrencyWatcher = new CurrencyWatcher();
		watcher.activateCurrencyWatcher();
	}

	/**
	 * Create and return Router.
	 *
	 * @class Server
	 * @method config
	 * @return void
	 */
	private routes(): void {
		// IndexRoute
		// use router middleware

		// const authRequestHandler: AuthRequestHandler = new AuthRequestHandler();
		// this._proxy.use((req: express.Request, res: express.Response, next: (err?: Error) => void) => {
		// 	syslog.info("%s - %s from %s", req.method, req.path, req.ip);
		// 	next();
		// });

		// this._proxy.use("/api", new AuthRoutesContainer(this.mainController, authRequestHandler).create());
		// this._proxy.use("/api", authRequestHandler.authRequest);
		// this._proxy.use("/api", new NetworkRoutesContainer(this.mainController, authRequestHandler).create());
		// this._proxy.use("/api", new DateTimeRoutesContainer(this.mainController, authRequestHandler).create());
		// this._proxy.use("/devices", new DeviceRoutesContainer(this.mainController).create());

		this._proxy.get("/*", (req: express.Request, res: express.Response, next: (err?: Error) => void) => {
			res.status(200).sendFile(buildPath(this.staticContent, "/index.html"), next);
		});

		// catch 404 and forward to error handler
		this._proxy.get("*", (req: express.Request, res: express.Response) => {
			return res.status(404).send();
		});
	}
}
