import fs from 'fs/promises';
import path from 'path';

export class Logger {
  private logFile: string;

  constructor(logsDirectory: string) {
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, '-')
      .split('.')[0];
    this.logFile = path.join(logsDirectory, `${timestamp}.log`);
  }

  async init(): Promise<void> {
    const dir = path.dirname(this.logFile);
    await fs.mkdir(dir, { recursive: true });
  }

  async log(
    level: 'INFO' | 'WARN' | 'ERROR',
    message: string,
    data?: any
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data,
    };

    const logLine = JSON.stringify(logEntry) + '\n';

    // 콘솔 출력
    const consoleMessage = `[${level}] ${message}`;
    if (level === 'ERROR') {
      console.error(consoleMessage, data || '');
    } else if (level === 'WARN') {
      console.warn(consoleMessage, data || '');
    } else {
      console.log(consoleMessage, data || '');
    }

    // 파일 출력
    await fs.appendFile(this.logFile, logLine, 'utf-8');
  }

  async info(message: string, data?: any): Promise<void> {
    await this.log('INFO', message, data);
  }

  async warn(message: string, data?: any): Promise<void> {
    await this.log('WARN', message, data);
  }

  async error(message: string, data?: any): Promise<void> {
    await this.log('ERROR', message, data);
  }
}
