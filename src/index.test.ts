describe('Logger', () => {
  let consoleLogMock: unknown;

  beforeEach(async () => {
    consoleLogMock = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    window.localStorage.clear();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    consoleLogMock.mockRestore();
  });

  test('Logger is disabled', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    consoleLogMock.mockImplementationOnce(() => {});
    const Logger = (await import('./index')).default;
    const logger = new Logger(false);

    logger.info('test');

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
  });

  test('Logger Info', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    consoleLogMock.mockImplementationOnce(() => {});
    const Logger = (await import('./index')).default;
    const logger = new Logger();

    logger.info('test');

    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });

  test('Logger Error', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    consoleLogMock.mockImplementationOnce(() => {});
    const Logger = (await import('./index')).default;
    const logger = new Logger();
    const handlerMock = jest.fn(() => {});
    logger.setErrorHandler(handlerMock);

    logger.error('error');

    expect(handlerMock).toHaveBeenCalledTimes(1);
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });

  test('Logger Error enable/disable handler', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    consoleLogMock.mockImplementation(() => {});
    const Logger = (await import('./index')).default;
    const logger = new Logger();
    const handlerMock = jest.fn(() => {});
    logger.setErrorHandler(handlerMock);

    logger.error('error');

    expect(handlerMock).toHaveBeenCalledTimes(1);
    expect(consoleLogMock).toHaveBeenCalledTimes(1);

    logger.removeErrorHandler();
    logger.removeErrorHandler();

    logger.error('error');

    expect(handlerMock).toHaveBeenCalledTimes(1);
    expect(consoleLogMock).toHaveBeenCalledTimes(2);
  });

  test('Logger Fatal', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    consoleLogMock.mockImplementationOnce(() => {});
    const Logger = (await import('./index')).default;
    const logger = new Logger();
    const handlerMock = jest.fn(() => {});
    logger.setErrorHandler(handlerMock);

    logger.fatal('fatal');

    expect(handlerMock).toHaveBeenCalledTimes(1);
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });

  test('Logger Checking This context', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    consoleLogMock.mockImplementationOnce(() => {});
    const Logger = (await import('./index')).default;
    const logger = new Logger();

    const loggerInfo = logger.info;
    loggerInfo('info');

    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });
});
