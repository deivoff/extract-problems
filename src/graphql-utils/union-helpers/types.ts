export interface GqlType<Typename = string> {
  __typename?: Typename;
}

export type ExtractGqlType<
  UnionType extends GqlType,
  Typename extends UnionType['__typename'],
> = Extract<UnionType, GqlType<Typename>>;
