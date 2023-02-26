import { GqlType } from './types';

export const isGqlType = <
  UnionType extends GqlType,
  Typename extends UnionType['__typename'],
  ExtractedType extends GqlType<Typename>,
>(
  typename: Typename,
  schema: UnionType | ExtractedType | null | undefined,
): schema is ExtractedType => schema?.__typename === typename;
