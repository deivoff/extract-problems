import { isGqlType } from './isGqlType';
import { ExtractGqlType, GqlType } from './types';

export const extractGqlType = <
  UnionType extends GqlType,
  Typename extends UnionType['__typename'],
>(
  typename: Typename,
  schema: UnionType | undefined | null,
): ExtractGqlType<UnionType, Typename> | undefined => {
  return isGqlType<UnionType, Typename, ExtractGqlType<UnionType, Typename>>(
    typename,
    schema,
  )
    ? schema
    : undefined;
};
