import { ENV } from "../utils/constants";

const handleResponse = (res) =>
  res
    .text()
    .then((text) => {
      let data;
      try {
        data = text && JSON.parse(text);
      } catch (error) {
        throw new Error("Internal Server Error");
      }
      return data;
    })
    .catch(Promise.reject);
export default ({ url, method, headers = {} }) =>
  fetch(ENV.REACT_APP_BASE_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  }).then(handleResponse);
