export const validateEmail = (email) => {
  const isValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const result = isValid.test(email);

  return result;
};

export const validatePass = (secret) => {
  const isValid = new RegExp();
};
