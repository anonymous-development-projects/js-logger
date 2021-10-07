export class LoggerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoggerError';
  }
}
