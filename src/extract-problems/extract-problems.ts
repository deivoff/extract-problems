import { getRightBracketIndex } from "./utils";

const problemTypeDefinitionStartRegex = /{ __typename\??: '(\w*?Problem)'/;
const typeDefinitionWithProblemRegex =
  /export type (\w*?[^Fragme\nt]) = \{ __typename\??: '.*Problem'.*\}/;

const isProblemExist = (typeDef: string) =>
  typeDefinitionWithProblemRegex.exec(typeDef);

const cutProblemsFromTypeDefinition = (typeDefinition: string) => {
  const problems: string[] = [];
  let newTypeDefinition = typeDefinition;

  while (isProblemExist(newTypeDefinition)) {
    const problemLeftBracketIndex = newTypeDefinition.search(
      problemTypeDefinitionStartRegex
    );
    const problemRightBracketIndex = getRightBracketIndex(
      newTypeDefinition,
      problemLeftBracketIndex
    );

    const problemDefinition = newTypeDefinition.slice(
      problemLeftBracketIndex,
      problemRightBracketIndex
    );
    problems.push(problemDefinition);
    const problemTypename =
      problemTypeDefinitionStartRegex.exec(problemDefinition)?.[1];

    newTypeDefinition = newTypeDefinition.replace(
      problemDefinition,
      `null /* here was a "${problemTypename}" type */`
    );
  }

  return [problems, newTypeDefinition] as const;
};

export const extractProblems = (fileData: string) => {
  let problemsTypeName = "";

  const newFileData = fileData.replace(
    typeDefinitionWithProblemRegex,
    (typeDef: string, typeName: string) => {
      const [problems] = cutProblemsFromTypeDefinition(typeDef);
      problemsTypeName = `${typeName}Problems`;

      const problemsDef = `export type ${problemsTypeName} = ${
        problems.join(" | ") || "{}"
      }`;

      return [typeDef, problemsDef].join("\n");
    }
  );

  return [newFileData, problemsTypeName] as const;
};
