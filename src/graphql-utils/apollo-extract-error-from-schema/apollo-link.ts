import { ApolloLink } from '@apollo/client';
import { GraphQLError } from 'graphql/error/GraphQLError';
import { mapValues } from 'lodash';


type GraphQLResponse = {
  __typename: string;
};

class BusinessGraphQLError extends GraphQLError {
  constructor(problem: GraphQLResponse) {
    super('BusinessGraphQLError', {
      extensions: {
        problem,
      },
    });
  }
}

const ERROR_TYPENAME_ENDING = 'Problem';

const isGraphQLResponse = <T extends GraphQLResponse>(
  value: unknown,
): value is T => '__typename' in value;

const isProblem = (value: GraphQLResponse) =>
  value.__typename.endsWith(ERROR_TYPENAME_ENDING);

const mapProblems =
  (onFindProblem: (problem: GraphQLResponse) => unknown) =>
    (data: unknown): unknown => {
      if (Array.isArray(data)) return data.map(mapProblems(onFindProblem));
      if (!isGraphQLResponse(data)) return data;
      if (isProblem(data)) return onFindProblem(data);

      return mapValues(data, mapProblems(onFindProblem));
    };

function pickBusinessErrors<T extends Record<string, unknown>>(
  data?: T | null,
) {
  if (!data) return {};
  const errors: BusinessGraphQLError[] = [];

  const newData = mapValues(
    data,
    mapProblems((problem) => {
      errors.push(new BusinessGraphQLError(problem));
      return null;
    }),
  );

  return {
    data: newData as T,
    errors: errors.length ? errors : undefined,
  };
}

export const createErrorHandlerLink = () =>
  new ApolloLink((operation, forward) => {
    if (!operation.getContext().useErrorHandlers)
      return forward(operation);
    return forward(operation).map((response) => {
      const { data, errors: businessErrors } = pickBusinessErrors(
        response.data,
      );
      const errors = businessErrors
        ? [...(response.errors ?? []), ...businessErrors]
        : response.errors;
      return {
        ...response,
        errors,
        data,
      };
    });
  });