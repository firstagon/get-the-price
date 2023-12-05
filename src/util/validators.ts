export const required = (value: string) => value.trim() !== "";

export const length = (value: string) => {
  const config = { min: 5, max: 100 };
  let isValid = true;
  if (config.min) {
    isValid = isValid && value.trim().length >= config.min;
  }
  if (config.max ? config.max : false) {
    isValid = isValid && value.trim().length <= config.max;
    return isValid;
  }
};

export const email = (value: string) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );

export const urlOzon = (url: string) => {
  const value = url.toString().trim();
  // value.split(".").some((elem) => elem === "ozon");
  return value.split(".").some((elem) => elem === "ozon");
};
