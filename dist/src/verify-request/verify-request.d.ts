import {Options} from './types';
export default function verifyRequest(
  givenOptions?: Options,
): import('compose-middleware').RequestHandler<
  import('express').Request<
    import('express-serve-static-core').ParamsDictionary,
    any,
    any,
    import('qs').ParsedQs,
    Record<string, any>
  >,
  import('express').Response<any, Record<string, any>>,
  any
>;
//# sourceMappingURL=verify-request.d.ts.map
