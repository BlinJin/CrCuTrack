
import * as Bluebird from "bluebird";
import {ISystemLogger, ModeLogger, SystemLogger} from "lab-logger";

import {Server, ServerOptions} from "./Server";
import {ServerApplication} from "./ServerApplication";

global.Promise = Bluebird;

const port: any = process.env.PORT || 80;
const host: string = process.env.HOST || "0.0.0.0";

const config: ServerOptions = new ServerOptions({
    port,
    host
});

const syslog: ISystemLogger = new SystemLogger({
    pathModule: __filename,
    mode: ModeLogger.DEVELOP,
    section: "root:bootstrap"
});

const main = async (args: Array<string>, argc: number): Promise<number> => {
    try {
        await Server.bootstrap(new ServerApplication(), config);
        syslog.info(`Server Bootstrap Done`);
        return 0;
    } catch (err) {
        syslog.error(err);
        process.exit(1);
    }
};

main(process.argv, process.argv.length).then(() => {
    syslog.info("CC Tracker started");
}).catch(err => syslog.info(err));
