import {Routes} from './types';
import {AccessMode} from '../types';
import {Request, Response} from 'express';
export declare function redirectToAuth(
  {fallbackRoute, authRoute}: Routes,
  req: Request,
  res: Response,
): void;
export declare function clearSession(
  req: Request,
  res: Response,
  accessMode?: AccessMode,
): Promise<void>;
//# sourceMappingURL=utilities.d.ts.map
