/**
 * Flambe - Rapid game development
 * TypeScript port
 */

export enum LogLevel {
    INFO = 0,
    WARN = 1,
    ERROR = 2
}

export interface LogHandler {
    log(level: LogLevel, message: string, args?: any[]): void;
}

export class Logger {
    constructor(private handler: LogHandler | null) {
    }

    public info(message?: string, args?: any[]): void {
        if (this.handler) {
            this.handler.log(LogLevel.INFO, message || "", args);
        }
    }

    public warn(message?: string, args?: any[]): void {
        if (this.handler) {
            this.handler.log(LogLevel.WARN, message || "", args);
        }
    }

    public error(message?: string, args?: any[]): void {
        if (this.handler) {
            this.handler.log(LogLevel.ERROR, message || "", args);
        }
    }
}

class ConsoleLogHandler implements LogHandler {
    constructor(private tag: string) {
    }

    log(level: LogLevel, message: string, args?: any[]): void {
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
    public static info(message?: string, args?: any[]): void {
        this.logger.info(message, args);
    }

    public static warn(message?: string, args?: any[]): void {
        this.logger.warn(message, args);
    }

    public static error(message?: string, args?: any[]): void {
        this.logger.error(message, args);
    }

    private static logger = new Logger(new ConsoleLogHandler("Flambe"));
}

export { Log, ConsoleLogHandler };
