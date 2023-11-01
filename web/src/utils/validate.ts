import moment from "moment";

const urlValidate = (url) => {
  if (!url) return undefined;
  const regex = new RegExp("^(http|https)://");
  if (regex.test(url)) {
    return undefined;
  }
  return "Must be a https or http url";
};

const passwordValidate = (password) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (regex.test(password)) {
    return undefined;
  }
  return "Password must be min 8 letters, with at least a symbol, upper and lower case letters and a number";
};

//dateValidate(date, 7, late) -> validate if input date is more than 1 week late from now
const dateValidate = (date) => {
  const momentObj = moment(date.toString());
  const oneWeekLate = moment().add(7, "days");
  if (momentObj.isAfter(oneWeekLate)) {
    return undefined;
  }

  return "Must be 01 week late";
};

//trim username all white space, new lines
const trimUsername = (username) => {
  return username.replace(/\s/g, "");
};

//trim full name with all whitespace and new line
const trimFullName = (fullName) => {
  fullName = fullName.match(/\S+/g);
  return fullName ? fullName.join(" ") : "";
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
  urlValidate,
  passwordValidate,
  dateValidate,
  trimUsername,
  trimFullName,
  anyWhiteSpace,
  startEndWhiteSpace,
};
