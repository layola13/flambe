/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export declare enum LogLevel {
    INFO = 0,
    WARN = 1,
    ERROR = 2
}
export interface LogHandler {
    log(level: LogLevel, message: string, args?: any[]): void;
}
export declare class Logger {
    private handler;
    constructor(handler: LogHandler | null);
    info(message?: string, args?: any[]): void;
    warn(message?: string, args?: any[]): void;
    error(message?: string, args?: any[]): void;
}
declare class ConsoleLogHandler implements LogHandler {
    private tag;
    constructor(tag: string);
    log(level: LogLevel, message: string, args?: any[]): void;
}
declare class Log {
    static info(message?: string, args?: any[]): void;
    static warn(message?: string, args?: any[]): void;
    static error(message?: string, args?: any[]): void;
    private static logger;
}
export { Log, ConsoleLogHandler };
//# sourceMappingURL=Log.d.ts.map