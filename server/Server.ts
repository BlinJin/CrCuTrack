import * as http from "http";
import * as net from "net";
import {ISystemLogger, ModeLogger, SystemLogger} from "imx-logger";
import * as os from "os";
import {ServerApplication} from "./ServerApplication";
import ErrnoException = NodeJS.ErrnoException;

http.globalAgent.maxSockets = 50;

export interface IServerOptions {
    port: number;
    host: string;
}

export class ServerOptions {
    public port: number;
    public host: string;

    constructor(options: IServerOptions = {port: 80, host: "localhost"}) {
        this.port = options.port;
        this.host = options.host;
    }
}

export interface IServerAddress {
    port: number;
    family: string;
    address: string;
}

const syslog: ISystemLogger = new SystemLogger({
    pathModule: __filename,
    mode: ModeLogger.DEVELOP,
    section: "root:server"
});

export class Server {
    public static async bootstrap(app: ServerApplication): Promise<Server>;
    public static async bootstrap(app: ServerApplication, config: ServerOptions): Promise<Server>;
    public static async bootstrap(app: ServerApplication, config?: ServerOptions): Promise<Server> {
        const server: Server = new Server();

        server.provider = http.createServer(app.proxy as any);
        server.provider.on("error", (error: ErrnoException) => server.errorHandler(error));
        server.provider.on("listening", () => server.lookupHandler());
        server.provider.ref();

        await app.init(server.provider);

        return server.configure(config);
    }

    private provider: net.Server;
    private config: ServerOptions;

    protected constructor() {
    }

    public address(): IServerAddress {
        return this.provider.address();
    }

    private configure(config: ServerOptions = new ServerOptions({} as IServerOptions)): this {
        this.config = config;
        this.provider.listen(this.config.port, this.config.host);
        return this;
    }

    private errorHandler(error: ErrnoException): void {
        if (error.syscall !== "listen") {
            throw error;
        }

        switch (error.errno) {
            case os.constants.errno.EACCES:
                syslog.error(new Error(`Opening ${this.config.port} requires elevated privileges`));
                process.exit(1);
                break;
            case os.constants.errno.EADDRINUSE:
                syslog.error(new Error(`${this.config.port} is already in use`));
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private lookupHandler(): void {
        const addressObject: IServerAddress = this.provider.address();
        syslog.info(`${process.pid} listening on  http://${addressObject.address}:` +
            `${addressObject.port} in ${process.platform}.`);
    }
}
