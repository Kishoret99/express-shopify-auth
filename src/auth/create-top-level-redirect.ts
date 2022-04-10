import querystring from 'querystring';

import redirectionPage from './redirection-page';
import {Request, Response} from 'express';

export default function createTopLevelRedirect(apiKey: string, path: string) {
  return function topLevelRedirect(req: Request, res: Response) {
    const {query} = req;
    const {shop, host} = query;
    const params: any = {shop};
    const queryString = querystring.stringify(params);

    res.send(
      redirectionPage({
        origin: shop,
        redirectTo: `https://${req.hostname}${path}?${queryString}`,
        apiKey,
        host,
      }),
    );
  };
}
