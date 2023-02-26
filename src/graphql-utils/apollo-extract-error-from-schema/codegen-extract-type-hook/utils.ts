export const getRightBracketIndex = (str: string, leftBracketIndex: number) => {
  let rightBracketIndex = leftBracketIndex;
  let bracketsCount = 0;

  do {
    if (str[rightBracketIndex] === "}") bracketsCount -= 1;
    if (str[rightBracketIndex] === "{") bracketsCount += 1;

    rightBracketIndex += 1;
  } while (bracketsCount !== 0);

  return rightBracketIndex;
};
