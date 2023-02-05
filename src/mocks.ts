export const fragmentProblem = `
import * as Types from '../../../types/generated-v2';

import { gql } from '@apollo/client';
export type NotAuthorizedProblemV2Fragment = {
  __typename?: 'NotAuthorizedProblem';
  status: number;
  message: string;
  reason?: Types.NotAuthorizedProblemReasons | null;
};

export const NotAuthorizedProblemV2FragmentDoc = gql\`
  fragment NotAuthorizedProblemV2 on NotAuthorizedProblem {
    status
    message
    reason
  }
\`;

`;

export const query2WithProblem = `import * as Types from '../../types/generated-v2';

import { createApolloHookWithErrorsHandle } from 'utils/hooks/errorsHandling';
import { gql } from '@apollo/client';
import { CartFragmentV2FragmentDoc } from '../fragments/__generated_v2__/cartV2';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddCourseSubscriptionV2MutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type AddCourseSubscriptionV2Mutation = {
  __typename?: 'Mutation';
  shop: {
    __typename?: 'ShopMScope';
    cart: {
      __typename?: 'ShopCartMScope';
      product: {
        __typename?: 'ShopCartProductMScope';
        addCourseSubscription?:
          | { __typename?: 'Problem'; message?: string | null }
          | {
              __typename?: 'ShopCartProductAddCourseSubscriptionSuccess';
              cart?: {
                __typename?: 'Cart';
                id: string;
                total: {
                  __typename?: 'DiscountedMoney';
                  originalAmount: {
                    __typename?: 'Money';
                    value: string;
                    currency: string;
                  };
                  discountedAmount?: {
                    __typename?: 'Money';
                    value: string;
                    currency: string;
                  } | null;
                  discount?: {
                    __typename?: 'Money';
                    value: string;
                    currency: string;
                  } | null;
                };
                discounts: Array<{
                  __typename?: 'CartDiscount';
                  name: string;
                  description: string;
                  total: {
                    __typename?: 'DiscountedMoney';
                    discount?: {
                      __typename?: 'Money';
                      value: string;
                      currency: string;
                    } | null;
                  };
                }>;
                items: Array<{
                  __typename?: 'CartItem';
                  id: string;
                  price: {
                    __typename?: 'DiscountedMoney';
                    originalAmount: {
                      __typename?: 'Money';
                      value: string;
                      currency: string;
                    };
                    discountedAmount?: {
                      __typename?: 'Money';
                      value: string;
                      currency: string;
                    } | null;
                    discount?: {
                      __typename?: 'Money';
                      value: string;
                      currency: string;
                    } | null;
                  };
                  product:
                    | {
                        __typename?: 'BundleSubscriptionOption';
                        id: string;
                        name: string;
                        englishName: string;
                        isAvailable: boolean;
                        bundle: {
                          __typename?: 'Bundle';
                          id: string;
                          name: string;
                          englishName: string;
                          grade: {
                            __typename?: 'Grade';
                            id: string;
                            name: string;
                            englishName: string;
                            level: {
                              __typename?: 'Level';
                              id: string;
                              education: {
                                __typename?: 'Education';
                                id: string;
                              };
                            };
                            school: { __typename?: 'School'; id: string };
                          };
                          images: {
                            __typename?: 'ImageResolutions';
                            thumbnail: string;
                          };
                          subscriptionOptions: Array<{
                            __typename?: 'BundleSubscriptionOption';
                            id: string;
                            name: string;
                            englishName: string;
                            isAvailable: boolean;
                            crossedOutPrice?: {
                              __typename?: 'Money';
                              value: string;
                              currency: string;
                            } | null;
                            duration:
                              | {
                                  __typename?: 'SubscriptionOptionAbsoluteDuration';
                                  date: string;
                                }
                              | {
                                  __typename?: 'SubscriptionOptionRelativeDuration';
                                  days: number;
                                };
                            price: {
                              __typename?: 'Money';
                              value: string;
                              currency: string;
                            };
                          }>;
                        };
                        crossedOutPrice?: {
                          __typename?: 'Money';
                          value: string;
                          currency: string;
                        } | null;
                        duration:
                          | {
                              __typename?: 'SubscriptionOptionAbsoluteDuration';
                              date: string;
                            }
                          | {
                              __typename?: 'SubscriptionOptionRelativeDuration';
                              days: number;
                            };
                        price: {
                          __typename?: 'Money';
                          value: string;
                          currency: string;
                        };
                      }
                    | {
                        __typename?: 'CourseExpirationSubscriptionOption';
                        id: string;
                        name: string;
                        englishName: string;
                        expiresOn: string;
                        course: {
                          __typename?: 'Course';
                          id: string;
                          name: string;
                          englishName: string;
                          squareImageUrl?: string | null;
                          userSubscription?: {
                            __typename?: 'UserSubscription';
                            status: Types.SubscriptionStatus;
                          } | null;
                          grade: {
                            __typename?: 'Grade';
                            name: string;
                            englishName: string;
                            id: string;
                            level: {
                              __typename?: 'Level';
                              id: string;
                              education: {
                                __typename?: 'Education';
                                name: string;
                                id: string;
                              };
                            };
                            school: { __typename?: 'School'; id: string };
                          };
                          availableSubscriptionOptions: Array<
                            | {
                                __typename?: 'CourseExpirationSubscriptionOption';
                                id: string;
                                name: string;
                                expiresOn: string;
                                prolongsAccess: boolean;
                                price: {
                                  __typename?: 'Money';
                                  value: string;
                                  currency: string;
                                };
                              }
                            | {
                                __typename?: 'CourseIntervalSubscriptionOption';
                                id: string;
                                name: string;
                                expiresOn: string;
                                prolongsAccess: boolean;
                                price: {
                                  __typename?: 'Money';
                                  value: string;
                                  currency: string;
                                };
                              }
                          >;
                        };
                      }
                    | {
                        __typename?: 'CourseIntervalSubscriptionOption';
                        id: string;
                        name: string;
                        englishName: string;
                        expiresOn: string;
                        course: {
                          __typename?: 'Course';
                          id: string;
                          name: string;
                          englishName: string;
                          squareImageUrl?: string | null;
                          userSubscription?: {
                            __typename?: 'UserSubscription';
                            status: Types.SubscriptionStatus;
                          } | null;
                          grade: {
                            __typename?: 'Grade';
                            name: string;
                            englishName: string;
                            id: string;
                            level: {
                              __typename?: 'Level';
                              id: string;
                              education: {
                                __typename?: 'Education';
                                name: string;
                                id: string;
                              };
                            };
                            school: { __typename?: 'School'; id: string };
                          };
                          availableSubscriptionOptions: Array<
                            | {
                                __typename?: 'CourseExpirationSubscriptionOption';
                                id: string;
                                name: string;
                                expiresOn: string;
                                prolongsAccess: boolean;
                                price: {
                                  __typename?: 'Money';
                                  value: string;
                                  currency: string;
                                };
                              }
                            | {
                                __typename?: 'CourseIntervalSubscriptionOption';
                                id: string;
                                name: string;
                                expiresOn: string;
                                prolongsAccess: boolean;
                                price: {
                                  __typename?: 'Money';
                                  value: string;
                                  currency: string;
                                };
                              }
                          >;
                        };
                      }
                    | {
                        __typename?: 'PsgPackOption';
                        id: string;
                        name: string;
                        englishName: string;
                        type: Types.PsgPackOptionKind;
                        price: {
                          __typename?: 'Money';
                          value: string;
                          currency: string;
                        };
                        psgPack: {
                          __typename?: 'PsgPack';
                          id: string;
                          name: string;
                          englishName: string;
                          term: string;
                          coverImageUrl: string;
                          grade: {
                            __typename?: 'Grade';
                            id: string;
                            name: string;
                            englishName: string;
                            level: {
                              __typename?: 'Level';
                              id: string;
                              education: {
                                __typename?: 'Education';
                                id: string;
                              };
                            };
                            school: { __typename?: 'School'; id: string };
                          };
                        };
                      };
                }>;
              } | null;
            }
          | null;
      };
    };
  };
};

export const AddCourseSubscriptionV2Document = gql\`
  mutation AddCourseSubscriptionV2($id: ID!) {
    shop {
      cart {
        product {
          addCourseSubscription(input: { id: $id }) {
            ... on ShopCartProductAddCourseSubscriptionSuccess {
              cart {
                ...CartFragmentV2
              }
            }
            ... on Problem {
              message
            }
          }
        }
      }
    }
  }
  \${CartFragmentV2FragmentDoc}
\`;
export type AddCourseSubscriptionV2MutationFn = Apollo.MutationFunction<
  AddCourseSubscriptionV2Mutation,
  AddCourseSubscriptionV2MutationVariables
>;
export function useAddCourseSubscriptionV2Mutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCourseSubscriptionV2Mutation,
    AddCourseSubscriptionV2MutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddCourseSubscriptionV2Mutation,
    AddCourseSubscriptionV2MutationVariables
  >(AddCourseSubscriptionV2Document, options);
}
export type AddCourseSubscriptionV2MutationHookResult = ReturnType<
  typeof useAddCourseSubscriptionV2Mutation
>;
export type AddCourseSubscriptionV2MutationResult =
  Apollo.MutationResult<AddCourseSubscriptionV2Mutation>;
export type AddCourseSubscriptionV2MutationOptions = Apollo.BaseMutationOptions<
  AddCourseSubscriptionV2Mutation,
  AddCourseSubscriptionV2MutationVariables
>;
export const useAddCourseSubscriptionV2MutationWithErrorsHandle =
  createApolloHookWithErrorsHandle(useAddCourseSubscriptionV2Mutation);`;
export const queryWithProblem = `
import * as Types from '../../../../types/generated-v2';

import { createApolloHookWithErrorsHandle } from 'utils/hooks/errorsHandling'
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResendVerificationV2MutationVariables = Types.Exact<{
  verificationToken: Types.Scalars['String'];
}>;


export type ResendVerificationV2Mutation = { __typename?: 'Mutation', account: { __typename?: 'AccountMScope', resendVerificationCode?: { __typename?: 'AccountResendVerificationCodeSuccess', verification: { __typename?: 'Verification', id: string, delay: number, status: Types.VerificationStatus, token: string, kind: Types.VerificationKind, loginType: Types.VerificationLoginType, email?: string | null, phone?: { __typename?: 'Phone', number: string, country: string, countryCode: string } | null } } | { __typename?: 'Problem', message?: string | null } | null } };


export const ResendVerificationV2Document = gql\`
    mutation ResendVerificationV2($verificationToken: String!) {
  account {
    resendVerificationCode(input: {verificationToken: $verificationToken}) {
      ... on AccountResendVerificationCodeSuccess {
        verification {
          id
          delay
          status
          token
          kind
          loginType
          phone {
            number
            country
            countryCode
          }
          email
        }
      }
      ... on Problem {
        message
      }
    }
  }
}
    \`;
export type ResendVerificationV2MutationFn = Apollo.MutationFunction<ResendVerificationV2Mutation, ResendVerificationV2MutationVariables>;
export function useResendVerificationV2Mutation(baseOptions?: Apollo.MutationHookOptions<ResendVerificationV2Mutation, ResendVerificationV2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendVerificationV2Mutation, ResendVerificationV2MutationVariables>(ResendVerificationV2Document, options);
      }
export type ResendVerificationV2MutationHookResult = ReturnType<typeof useResendVerificationV2Mutation>;
export type ResendVerificationV2MutationResult = Apollo.MutationResult<ResendVerificationV2Mutation>;
export type ResendVerificationV2MutationOptions = Apollo.BaseMutationOptions<ResendVerificationV2Mutation, ResendVerificationV2MutationVariables>;
export const useResendVerificationV2MutationWithErrorsHandle = createApolloHookWithErrorsHandle(useResendVerificationV2Mutation)
`;

export const query3WithProblem = `
import * as Types from '../../../../../../../types/generated-v2';

import { createApolloHookWithErrorsHandle } from 'utils/hooks/errorsHandling'
import { gql } from '@apollo/client';
import { UserAddressFragmentV2FragmentDoc } from '../../../../api/__generated_v2__/UserAddress.fragmentV2';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserAddressV2MutationVariables = Types.Exact<{
  input: Types.AccountUpdateUserAddressInput;
}>;


export type UpdateUserAddressV2Mutation = { __typename?: 'Mutation', account: { __typename?: 'AccountMScope', updateUserAddress?: { __typename: 'AccountUpdateUserAddressSuccess', user: { __typename?: 'CurrentUser', id: string, address?: { __typename?: 'ApartmentAddress', area?: string | null, avenue?: string | null, street?: string | null, block?: string | null, buildingType?: Types.AddressBuilding | null, contactFullName?: string | null, latitude?: number | null, longitude?: number | null, building?: string | null, floor?: string | null, apartment?: string | null, contactPhone?: { __typename?: 'Phone', country: string, countryCode: string, number: string } | null } | { __typename?: 'HouseAddress', area?: string | null, avenue?: string | null, street?: string | null, block?: string | null, buildingType?: Types.AddressBuilding | null, contactFullName?: string | null, latitude?: number | null, longitude?: number | null, house?: string | null, contactPhone?: { __typename?: 'Phone', country: string, countryCode: string, number: string } | null } | null } } | { __typename: 'FormProblem', fields: Array<{ __typename?: 'FormProblemField', name: string, message: string }> } | null } };


export const UpdateUserAddressV2Document = gql\`
    mutation UpdateUserAddressV2($input: AccountUpdateUserAddressInput!) {
  account {
    updateUserAddress(input: $input) {
      __typename
      ... on AccountUpdateUserAddressSuccess {
        user {
          id
          ...UserAddressFragmentV2
        }
      }
      ... on FormProblem {
        fields {
          name
          message
        }
      }
    }
  }
}
    \${UserAddressFragmentV2FragmentDoc}\`;
export type UpdateUserAddressV2MutationFn = Apollo.MutationFunction<UpdateUserAddressV2Mutation, UpdateUserAddressV2MutationVariables>;
export function useUpdateUserAddressV2Mutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAddressV2Mutation, UpdateUserAddressV2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAddressV2Mutation, UpdateUserAddressV2MutationVariables>(UpdateUserAddressV2Document, options);
      }
export type UpdateUserAddressV2MutationHookResult = ReturnType<typeof useUpdateUserAddressV2Mutation>;
export type UpdateUserAddressV2MutationResult = Apollo.MutationResult<UpdateUserAddressV2Mutation>;
export type UpdateUserAddressV2MutationOptions = Apollo.BaseMutationOptions<UpdateUserAddressV2Mutation, UpdateUserAddressV2MutationVariables>;
export const useUpdateUserAddressV2MutationWithErrorsHandle = createApolloHookWithErrorsHandle(useUpdateUserAddressV2Mutation)`;
