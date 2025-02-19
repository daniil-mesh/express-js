import { NextFunction, Request, Response } from 'express';

export interface IFilter {
  catch(err: Error, req: Request, res: Response, next: NextFunction): void;
}
