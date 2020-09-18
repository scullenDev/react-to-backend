import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../utils/API";
import ErrorAlert from "./ErrorAlert";
import ErrorContext from "../utils/ErrorContext";
// ! ^^^ Note how we import our context directly, along with the useContext hook.

const ContactForm = () => {
  const history = useHistory();

  // ! We can then tap into the values stored in our context via our useContext hook!
  const { isError, setError } = useContext(ErrorContext);

  // ! Using the useRef hook to access the DOM directly (or less commonly used to persist a mutable value throughout the component's entire life).
  const fNameRef = useRef();
  const lNameRef = useRef();
  const typeRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  // ! Since we're no longer updating the values from this form in the 'Add a Contact' page state in real-time, we can construct the object of data for our new contact here. Upon click we access each value individually using our ref and build it into the object. Once the object is ready, we send it off to the back-end for insertion into our db.

  const addContact = (e) => {
    e.preventDefault();
    API.addContact({
      firstName: fNameRef.current.value,
      lastName: lNameRef.current.value,
      type: typeRef.current.value,
      phoneNumber: phoneRef.current.value,
      email: emailRef.current.value,
    })
      .then(() => {
        console.log("hmm?");
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

  // ! Since we're using the useRef hook to handle our form values, our form is "uncontrolled". It behaves more like a pre-React HTML form, in that the values the user types in the form fields are not stored in state upon every keypress, and are instead only retrieved upon an event like a form submission... using useRef for forms instead of a controlled form makes it more difficult to do things like running autocomplete functionality, validating form input as the user types, etc.
  return (
    <Form onSubmit={(e) => addContact(e)}>
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
