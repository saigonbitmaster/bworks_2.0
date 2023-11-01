const validateEmail = (email) => {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
};

//min 8 letters, with at least a symbol, upper and lower case letters and a number
const validatePassword = (str) => {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
};

//username or full name does not contains some reserved keywords cms, admin, bwork, bworks
const validateUsername = (username) => {
  const regExp = /(bwork|cms|admin)/i;
  return !regExp.test(username);
};

//trim username all white space, new lines
const trimUsername = (username) => {
  return username.replace(/\s/g, '');
};

//trim full name with all whitespace and new line
const trimFullName = (fullName) => {
  fullName = fullName.match(/\S+/g);
  return fullName ? fullName.join(' ') : '';
};

//detect if string contains any whitespace or new line
const anyWhiteSpace = (username) => {
  const regex = /\s/g;
  return regex.test(username);
};

//detect if string contains any whitespace at beginning or end
const startEndWhiteSpace = (fullName) => {
  const regex = /(^\s+)|(\s+$)/;
  return regex.test(fullName);
};

export {
  validateEmail,
  validatePassword,
  validateUsername,
  trimUsername,
  trimFullName,
  anyWhiteSpace,
  startEndWhiteSpace,
};
