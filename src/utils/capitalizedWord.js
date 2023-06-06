const capitalizedWord = (name) => {
  const checkFirstLetter = new RegExp(/^[A-Z]/);

  if (checkFirstLetter.test(name)) return name;

  const firstLetter = name.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = name.slice(1);
  const capitalizedName = firstLetterCap + remainingLetters;

  return capitalizedName;
};

export default capitalizedWord;
