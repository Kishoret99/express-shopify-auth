import {Request, Response} from 'express';
export declare type AccessMode = 'online' | 'offline';
export interface AuthConfig {
  myShopifyDomain?: string;
  accessMode?: 'online' | 'offline';
  afterAuth?(req: Request, res: Response): void;
}
export interface OAuthStartOptions extends AuthConfig {
  prefix?: string;
}
export interface NextFunction {
  (): any;
}
//# sourceMappingURL=types.d.ts.map
