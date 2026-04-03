import { API_CONFIG } from '../config';

/**
 * Logger Service for structured logging across the application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  stackTrace?: string;
}

class LoggerService {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  /**
   * Check if logging level is enabled
   */
  private isLevelEnabled(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };

    const configLevel = API_CONFIG.logLevel as LogLevel;
    return levels[level] >= levels[configLevel];
  }

  /**
   * Format log entry
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
  }

  /**
   * Print log to console based on level
   */
  private printLog(entry: LogEntry): void {
    const isDevelopment = API_CONFIG.appEnv === 'development';

    if (!isDevelopment && entry.level !== 'error') {
      return; // Only log errors in production
    }

    const style = this.getLogStyle(entry.level);
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;

    switch (entry.level) {
      case 'debug':
        console.debug(`%c${prefix} ${entry.message}`, style, entry.data);
        break;
      case 'info':
        console.info(`%c${prefix} ${entry.message}`, style, entry.data);
        break;
      case 'warn':
        console.warn(`%c${prefix} ${entry.message}`, style, entry.data);
        break;
      case 'error':
        console.error(`%c${prefix} ${entry.message}`, style, entry.data);
        break;
    }
  }

  /**
   * Get console style for log level
   */
  private getLogStyle(level: LogLevel): string {
    const styles: Record<LogLevel, string> = {
      debug: 'color: #999; font-weight: bold;',
      info: 'color: #0066cc; font-weight: bold;',
      warn: 'color: #ff9900; font-weight: bold;',
      error: 'color: #cc0000; font-weight: bold;',
    };
    return styles[level];
  }

  /**
   * Debug log
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(message: string, data?: any): void {
    if (this.isLevelEnabled('debug')) {
      const entry = this.formatLog('debug', message, data);
      this.logs.push(entry);
      this.printLog(entry);
      this.maintainLogSize();
    }
  }

  /**
   * Info log
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(message: string, data?: any): void {
    if (this.isLevelEnabled('info')) {
      const entry = this.formatLog('info', message, data);
      this.logs.push(entry);
      this.printLog(entry);
      this.maintainLogSize();
    }
  }

  /**
   * Warning log
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(message: string, data?: any): void {
    if (this.isLevelEnabled('warn')) {
      const entry = this.formatLog('warn', message, data);
      this.logs.push(entry);
      this.printLog(entry);
      this.maintainLogSize();
    }
  }

  /**
   * Error log
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, data?: any, error?: Error): void {
    if (this.isLevelEnabled('error')) {
      const entry = this.formatLog('error', message, data);
      if (error) {
        entry.stackTrace = error.stack;
      }
      this.logs.push(entry);
      this.printLog(entry);
      this.maintainLogSize();

      // Send to error tracking service in production
      if (API_CONFIG.enableErrorTracking && API_CONFIG.appEnv === 'production') {
        this.sendToErrorTracker(entry);
      }
    }
  }

  /**
   * Maintain log size in memory
   */
  private maintainLogSize(): void {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  /**
   * Send error to external tracking service (e.g., Sentry)
   */  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private sendToErrorTracker(_entry: LogEntry): void {
    // TODO: Implement error tracking service integration
    // Example: Sentry, LogRocket, etc.
    try {
      // fetch('/api/logs', { method: 'POST', body: JSON.stringify(entry) });
    } catch (error) {
      console.error('Failed to send error to tracker', error);
    }
  }

  /**
   * Get all stored logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Clear stored logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Download logs as file
   */
  downloadLogs(): void {
    const logsJson = this.exportLogs();
    const blob = new Blob([logsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `giguard-logs-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

// Export singleton instance
export const loggerService = new LoggerService();
export default loggerService;
