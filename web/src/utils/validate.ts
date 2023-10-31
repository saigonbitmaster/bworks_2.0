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

export { urlValidate, passwordValidate, dateValidate };
