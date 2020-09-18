import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ErrorAlert from "./ErrorAlert";
import ErrorContext from "../utils/ErrorContext";
// ! ^^^ Note how we import our context directly, along with the useContext hook.

const ContactForm = ({ contact: { firstName, lastName, phoneNumber, email }, handleInputChange, addContact }) => {
  const history = useHistory();
  // ! We can then tap into the values stored in our context via our useContext hook!
  const { isError } = useContext(ErrorContext);

  return (
    <Form onSubmit={(e) => addContact(e)}>
      {isError && <ErrorAlert />}
      <FormGroup>
        <Label for="firstName">First Name:</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="New"
          onChange={handleInputChange}
          value={firstName}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name:</Label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Contact"
          onChange={handleInputChange}
          value={lastName}
        />
      </FormGroup>
      <FormGroup>
        <Label for="type">Contact Type:</Label>
        <Input type="select" name="type" id="type" onChange={handleInputChange}>
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="email">Phone Number:</Label>
        <Input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="(222) 333-4444"
          onChange={handleInputChange}
          value={phoneNumber}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email Address:</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="new@contact.com"
          onChange={handleInputChange}
          value={email}
        />
      </FormGroup>
      <Button block color="primary" className="mt-4" disabled={!firstName || !lastName || !email}>
        Add Contact
      </Button>
      <Button
        block
        className="mb-4"
        color="secondary"
        onClick={(e) => {
          e.preventDefault();
          history.push("/contacts");
        }}
      >
        Exit and View Contacts
      </Button>
    </Form>
  );
};

export default ContactForm;
