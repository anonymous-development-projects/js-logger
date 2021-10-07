import { LoggerError } from './utils/logger-error';
import { LOGGER_LEVELS } from './consts';

type LoggerLevels = 'error' | 'info' | 'warn' | 'debug';
type LoggerTypes =
  | 'error'
  | 'fatal'
  | 'fav'
  | 'info'
  | 'star'
  | 'success'
  | 'wait'
  | 'warn'
  | 'complete'
  | 'pending'
  | 'note'
  | 'start'
  | 'pause'
  | 'debug'
  | 'await'
  | 'watch'
  | 'log';

type WriteMethodOptions = {
  badge: string;
  label: string;
  color: string;
  logLevel: LoggerLevels;
};

export default class Logger {
  private errorHandler: (err: Error) => void = () => {};

  constructor(public showOutput: boolean = true) {
    (Object.keys(LOGGER_LEVELS) as Array<LoggerTypes>).forEach((loggerType: LoggerTypes) => {
      this[loggerType] = this[loggerType].bind(this);
    });
  }

  setErrorHandler(handler: (err: Error) => void): void {
    this.errorHandler = handler;
  }

  removeErrorHandler(): void {
    this.errorHandler = () => {};
  }

  error(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.error, ...args);
  }

  fatal(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.fatal, ...args);
  }

  fav(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.fav, ...args);
  }

  info(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.info, ...args);
  }

  star(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.star, ...args);
  }

  success(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.success, ...args);
  }

  wait(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.wait, ...args);
  }

  warn(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.warn, ...args);
  }

  complete(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.complete, ...args);
  }

  pending(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.pending, ...args);
  }

  note(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.note, ...args);
  }

  start(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.start, ...args);
  }

  pause(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.pause, ...args);
  }

  debug(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.debug, ...args);
  }

  await(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.await, ...args);
  }

  watch(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.watch, ...args);
  }

  log(...args: unknown[]): void {
    this.write(LOGGER_LEVELS.log, ...args);
  }

  // eslint-disable-next-line class-methods-use-this
  private parseArgs(...args: unknown[]) {
    return args.reduce((accumulator: unknown[], currentValue) => {
      if (currentValue instanceof Error && currentValue.stack) {
        const [...errorStack] = currentValue.stack.split('\n');
        if (currentValue.message) {
          accumulator.push(`${currentValue.name}:${currentValue.message}`);
        }
        accumulator.push(errorStack.map((l) => l.replace(/^/, '\n')).join(''));
      } else if (typeof currentValue === 'object') {
        accumulator.push(JSON.stringify(currentValue));
      } else {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
  }

  // eslint-disable-next-line class-methods-use-this
  private parseError(...args: unknown[]): Error {
    const error = args.find((arg) => arg instanceof Error) as Error;
    if (error) {
      return error;
    }

    return new LoggerError(
      args
        .reduce(
          (accumulator: unknown[], currentValue) => {
            if (typeof currentValue === 'string') {
              accumulator.push(currentValue);
            }
            return accumulator;
          },
          ['LoggerError'],
        )
        .join('; '),
    );
  }

  private write({ badge, label, color, logLevel }: WriteMethodOptions, ...args: unknown[]) {
    if (logLevel === 'error') {
      this.errorHandler(this.parseError(...args));
    }

    if (!this.showOutput) {
      return;
    }

    const parsedArgs = this.parseArgs(...args);
    const prefix = `${badge} ${label}`;
    const message = `%c${prefix}${''.padEnd(15 - prefix.length, ' ')}%c${parsedArgs.join(' ')}`;
    // eslint-disable-next-line no-console
    console.log(message, `color:${color || 'grey'};`, 'color:grey;');
  }
}
