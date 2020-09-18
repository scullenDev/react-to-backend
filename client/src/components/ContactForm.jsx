import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ErrorAlert from "./ErrorAlert";
import ErrorContext from "../utils/ErrorContext";
// ! ^^^ Note how we import our context directly, along with the useContext hook.

const ContactForm = ({ addContact }) => {
  const history = useHistory();

  // ! We can then tap into the values stored in our context via our useContext hook!
  const { isError } = useContext(ErrorContext);

  // ! Using the useRef hook to access the DOM directly (or less commonly used to persist a mutable value throughout the component's entire life)
  const fNameRef = useRef();
  const lNameRef = useRef();
  const typeRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  const addNewContact = (e) => {
    e.preventDefault();
    addContact({
      firstName: fNameRef.current.value,
      lastName: lNameRef.current.value,
      type: typeRef.current.value,
      phoneNumber: phoneRef.current.value,
      email: emailRef.current.value,
    });
  };

  // ! Since we're using the useRef hook to handle our form values, our form is "uncontrolled", and behaves more like a pre-React HTML form, in that the values the user types in the form fields is not dealt with upon every keypress, and is instead only retrieved upon an event like a form submission... using useRef for forms instead of a controlled form makes it more difficult to do things like running autocomplete functionality, validating form input as the user types, etc.
  return (
    <Form onSubmit={(e) => addNewContact(e)}>
      {isError && <ErrorAlert />}
      <FormGroup>
        <Label for="firstName">First Name:</Label>
        <Input type="text" id="firstName" placeholder="New" innerRef={fNameRef} required />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name:</Label>
        <Input type="text" id="lastName" placeholder="Contact" innerRef={lNameRef} required />
      </FormGroup>
      <FormGroup>
        <Label for="type">Contact Type:</Label>
        <Input type="select" id="type" innerRef={typeRef}>
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="email">Phone Number:</Label>
        <Input type="text" id="phoneNumber" placeholder="(222) 333-4444" innerRef={phoneRef} required />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email Address:</Label>
        <Input type="email" id="email" placeholder="new@contact.com" innerRef={emailRef} required />
      </FormGroup>
      <Button block color="primary" className="mt-4">
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
// ! ^^^ Soooo... I just learned the hard way that the typical behavior for attaching a ref to an input field doesn't work with Reactstrap... on each input above, note how I have added a `innerRef={nameOfRefVariableHere}` prop. In a regular non-Reactstrap form, you would attach a ref variable to an input using `ref={nameOfRefVariableHere}` instead.

export default ContactForm;
