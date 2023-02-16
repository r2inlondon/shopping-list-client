export const validateEmail = (email) => {
  const isValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const result = isValid.test(email);

  return result;
};

export const validatePass = (secret) => {
  // max 20 characters length, accepts space and special char
  const isValid = new RegExp(/^.{1,20}$/);

  const result = isValid.test(email);

  return result;
};
