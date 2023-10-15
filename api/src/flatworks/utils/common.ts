const validateEmail = (email) => {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
};

//min 8 letters, with at least a symbol, upper and lower case letters and a number
const validatePassword = (str) => {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
};

export { validateEmail, validatePassword };
