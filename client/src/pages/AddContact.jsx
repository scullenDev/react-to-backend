import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import ErrorContext from "../utils/ErrorContext";
import ContactForm from "../components/ContactForm";

const AddContact = () => {
  const history = useHistory();

  const [error, setError] = useState({
    isError: false,
    message: "",
    type: "success",
  });

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    type: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setContact({ ...contact, [name]: value });
  };

  const addContact = (e) => {
    e.preventDefault();
    API.addContact(contact)
      .then(() => {
        history.push("/contacts");
      })
      .catch((err) => {
        setError({
          isError: true,
          message: err.response.data.join(", "),
          type: "danger",
        });
      });
  };

  return (
    // ! Thanks to our ErrorContext Provider, any components nested inside (including all descendants of the immediately-nested components) will have access to the values provided. Note how the provided values are often linked to state value(s) in the component containing the Provider. Now that we have a Context Provider giving all our nested components access to the error state values, there's no need to drill the props down to get them to the correct nested components!
    <ErrorContext.Provider value={error}>
      <h1 className="mt-4 mb-4">Add a Contact:</h1>
      <ContactForm contact={contact} handleInputChange={handleInputChange} addContact={addContact} />
    </ErrorContext.Provider>
  );
};

export default AddContact;
