export const getItemFromLocalStorage = name => localStorage.getItem(name);
export const deleteItemFromLocalStorage = name => localStorage.removeItem(name);
export const setItemToLocalStorage = (name, value) => localStorage.setItem(name, value);

export const emailValidation = email =>
  !email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export const numberRounderHandler = num =>
  (Math.round(num * 100 + Number.EPSILON) / 100).toLocaleString('en-US');
