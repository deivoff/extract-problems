import { ROUTES } from './types'

type PathParams<
  Path extends string,
  /** first condition: we check if Param is in the first path: /[param]/...rest */
> = Path extends `[${infer Param}]${infer Rest}`
  ? Param | PathParams<Rest>
  : /** second condition: we check if Param is only path: [param] */
  Path extends `[${infer Param}]`
  ? Param
  : /** third condition: we check if Param is between paths: ..._prefix/[param]/...postfix */
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  Path extends `${infer _Prefix}[${infer Param}]${infer Postfix}`
  ? Param | PathParams<Postfix>
  : /** if we don't have a match return never */
    never;

type PathArgs<Path extends string> = {
  [K in PathParams<Path>]: string | number;
};

type Routes = typeof ROUTES;
/**
 * This util function can help as write more stable and readable path of routes in our app.
 * We can leave from path declaration from:
 *
 * ```
 * const url = `/ss/${dd}/${ff}/subscribe`;
 * ```
 *
 * to:
 *
 * ```
 * const url = createRouteUrl('name of page', {
 *     dd: 123,
 *     ff: anyname,
 * });
 * ```
 *  parameters (courseId and courseName) are dynamically generated from the route declaration
 * ```
 * courseSubscribe: {
 *     href: '/courses/[courseId]/[courseName]/subscribe',
 *     title: 'course',
 * };
 * ```
 *
 * in src/routes/dictionaries.ts (one source of truth)
 *
 * if we change/remove the path from routes.ts, the IDE will be able
 * to highlight the sections of the code where this route was used.
 *
 * @param {string} route  - routeName from ROUTES dictionary
 * @param {object} params  - params for this route
 * @param {URLSearchParams?} query  - optional params for query
 */
export const createRouteUrl = <Route extends keyof Routes>(
  route: Route,
  params?: PathArgs<Routes[Route]['href']>,
  query?: ConstructorParameters<typeof URLSearchParams>[0],
) => {
  const routeUrl = ROUTES[route].href;

  let url = params
    ? routeUrl.replace(
        /\[(.+?)]/g,
        (_match: string, paramKey: keyof PathArgs<Routes[Route]['href']>) =>
          String(params[paramKey]),
      )
    : routeUrl;

  if (query) {
    url += `?${new URLSearchParams(query)}`;
  }

  return url;
};
