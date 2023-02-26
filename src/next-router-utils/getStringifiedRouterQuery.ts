import { ParsedUrlQuery } from 'querystring';

const getStringifiedRouterParam = (
  query: ParsedUrlQuery,
  paramName: string,
) => {
  const value = query?.[paramName];
  if (!value) return '';
  if (Array.isArray(value)) return value[0] || '';

  return value;
};

export const getStringifiedRouterQuery = (
  query: ParsedUrlQuery,
): Record<string, string> =>
  new Proxy<Record<string, string>>(
    {},
    {
      get: (target, paramName: string) =>
        getStringifiedRouterParam(query, paramName),
    },
  );
