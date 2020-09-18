import React, { useState } from "react";
import ErrorContext from "../utils/ErrorContext";
import ContactForm from "../components/ContactForm";

const AddContact = () => {
  // ! Technically, thanks to the refactor of the form using useRef and the relocation of the addContact method, it's not really necessary to put the state for error here. But I'm keeping it in place to demonstrate an example of useContext.
  const [error, setError] = useState({
    isError: false,
    message: "",
    type: "success",
  });

  // ! Thanks to our ErrorContext Provider, any components nested inside (including all descendants of the immediately-nested components) will have access to the values provided. Note how the provided values are often linked to state value(s) in the component containing the Provider. Now that we have a Context Provider giving all our nested components access to the error state values/methods, there's no need to drill the props down to get them to the correct nested components! Note that it is best practice to pass the Context Provider a value that closely mimics (in structure and type) the value(s) in your Context.
  return (
    <ErrorContext.Provider value={{ ...error, setError }}>
      <h1 className="mt-4 mb-4">Add a Contact:</h1>
      <ContactForm />
    </ErrorContext.Provider>
  );
};

export default AddContact;
