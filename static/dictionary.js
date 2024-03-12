export let dictionary = [];

export const addWordToDictionary = (kk, ru) => {
  const isUnique = !dictionary.some((item) => item.kk === kk);

  if (isUnique) {
    dictionary.push({ kk, ru });
  }
};

export const removeWordFromDictionary = (kk) => {
  const indexToRemove = dictionary.findIndex((item) => item.kk === kk);

  if (indexToRemove !== -1) {
    dictionary.splice(indexToRemove, 1);
  }
};
