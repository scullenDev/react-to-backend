import React, { useContext } from "react";
import { Alert } from "reactstrap";
import ErrorContext from "../utils/ErrorContext";
// ! ^^^ Note how we import our context directly, along with the useContext hook.

const ErrorAlert = () => {
  // ! We can then tap into the values stored in our context via our useContext hook!
  const { type, message } = useContext(ErrorContext);

  return <Alert color={type || "warning"}>{message}</Alert>;
};

export default ErrorAlert;
