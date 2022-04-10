import {AccessMode, NextFunction} from '../types';
import {Routes} from './types';
import {Request, Response} from 'express';
export declare function loginAgainIfDifferentShop(
  routes: Routes,
  accessMode?: AccessMode,
): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=login-again-if-different-shop.d.ts.map
