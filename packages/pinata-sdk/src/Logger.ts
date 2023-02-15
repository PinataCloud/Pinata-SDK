import pino from "pino";
export default class LoggerService {
    private static instance: any;
    pinoClient;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {
        this.pinoClient = pino({browser: {asObject: true}, level: "silent"});
    }
    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }
    public attachToConsole() {
        this.pinoClient.level = "info";
    }
}