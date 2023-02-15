export default class LoggerService {
    private static instance;
    pinoClient: any;
    private constructor();
    static getInstance(): LoggerService;
    attachToConsole(): void;
}
