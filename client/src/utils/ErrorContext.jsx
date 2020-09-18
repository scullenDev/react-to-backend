import { createContext } from "react";

// ! Our context should be the default value for the data we want available to components nested inside our Provider; a context can be an object like we see here, or any other value -- an array, a string, a boolean, etc. It is also possible to create dynamic contexts, which make methods available to nested child components in addition to our read-only data.
const ErrorContext = createContext({
  isError: false,
  message: "",
  type: "",
});

export default ErrorContext;
