import { createContext } from "react";

// ! Our Context should be the default value for the data we want available to components nested inside our Provider; a Context can be an object like we see here, or any other value -- an array, a string, a boolean, etc. Make sure that your Context default values are of the correct types!
const ErrorContext = createContext({
  isError: false,
  message: "",
  type: "",
  setError: () => {},
});

export default ErrorContext;
