import {OAuthStartOptions} from '../types';
import {Request, Response} from 'express';
export default function createRequestStorageAccess({
  prefix,
}: OAuthStartOptions): (req: Request, res: Response) => void;
//# sourceMappingURL=create-request-storage-access.d.ts.map
