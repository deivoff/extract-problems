import {
  fragmentProblem,
  queryWithProblem,
  query2WithProblem,
  query3WithProblem,
} from "./mocks";
import { extractProblems } from "./graphql-utils/apollo-extract-error-from-schema";
import "./styles.css";

// const createErrorHandleHook = (content: string, problemsTypename: string) => {
//   const indexStart = 'function '.length;
//   const createErrorHandleDefinitions = content
//     ?.match?.(/function (use.*)\(/g)
//     ?.map((match) => match.substring(indexStart, match.length - 1))
//     ?.filter((name) => name.endsWith('Query') || name.endsWith('Mutation'))
//     ?.map(
//       // eslint-disable-next-line prettier/prettier
//       (name) =>
//         `export const ${name}WithErrorsHandle = createApolloHookWithErrorsHandle(${name})<${
//           problemsTypename || '{}'
//         }>()`,
//     )
//     ?.join('\n');
//
//   return [
//     createErrorHandleDefinitions,
//     createErrorHandleDefinitions
//       ? "import { createApolloHookWithErrorsHandle } from 'utils/hooks/errorsHandling';"
//       : '',
//   ];
// };

const [result] = extractProblems(query3WithProblem);

document.body.innerHTML = `<pre>${result}</pre`;
