import {OAuthStartOptions, AccessMode, NextFunction} from '../types';
import {Request, Response} from 'express';
export declare const DEFAULT_ACCESS_MODE: AccessMode;
export declare const TOP_LEVEL_OAUTH_COOKIE_NAME = 'shopifyTopLevelOAuth';
export declare const TEST_COOKIE_NAME = 'shopifyTestCookie';
export declare const GRANTED_STORAGE_ACCESS_COOKIE_NAME =
  'shopify.granted_storage_access';
export default function createShopifyAuth(
  options: OAuthStartOptions,
): (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {default as Error} from './errors';
//# sourceMappingURL=index.d.ts.map
