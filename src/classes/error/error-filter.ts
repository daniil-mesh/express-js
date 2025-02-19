import { Dependency } from '../../enums/dependency.js';
import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { HttpError } from './http-error.js';
import { IFilter } from '../../interfaces/errors/filter.js';
import { ILogger } from '../../interfaces/loggers/logger.js';

@injectable()
export class ErrorFilter implements IFilter {
  constructor(@inject(Dependency.ILogger) private logger: ILogger) {}

  catch(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    let code: number = 500;
    if (err instanceof HttpError) {
      code = err.statusCode;
    }

    this.logger.error(err.message);
    res.status(code).send({ error: err.message });
  }
}
