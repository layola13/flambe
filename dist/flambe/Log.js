/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
})(LogLevel || (LogLevel = {}));
export class Logger {
    constructor(handler) {
        this.handler = handler;
    }
    info(message, args) {
        if (this.handler) {
            this.handler.log(LogLevel.INFO, message || "", args);
        }
    }
    warn(message, args) {
        if (this.handler) {
            this.handler.log(LogLevel.WARN, message || "", args);
        }
    }
    error(message, args) {
        if (this.handler) {
            this.handler.log(LogLevel.ERROR, message || "", args);
        }
    }
}
class ConsoleLogHandler {
    constructor(tag) {
        this.tag = tag;
    }
    log(level, message, args) {
        const prefix = `[${this.tag}]`;
        const fullMessage = args && args.length > 0
            ? `${prefix} ${message} ${JSON.stringify(args)}`
            : `${prefix} ${message}`;
        switch (level) {
            case LogLevel.INFO:
                console.log(fullMessage);
                break;
            case LogLevel.WARN:
                console.warn(fullMessage);
                break;
            case LogLevel.ERROR:
                console.error(fullMessage);
                break;
        }
    }
}
// Global logging functions
class Log {
    static info(message, args) {
        this.logger.info(message, args);
    }
    static warn(message, args) {
        this.logger.warn(message, args);
    }
    static error(message, args) {
        this.logger.error(message, args);
    }
}
Log.logger = new Logger(new ConsoleLogHandler("Flambe"));
export { Log, ConsoleLogHandler };
//# sourceMappingURL=Log.js.map