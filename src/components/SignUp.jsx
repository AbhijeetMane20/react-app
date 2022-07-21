import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import url from "./GlobalVar";

function SignUp() {
  const navigate = useNavigate();
  const { register, getValues } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  function signUp() {
    const formValues = getValues();

    const requestBody = {
      userName: formValues.userName,
      userPass: formValues.userPass,
      userMob: formValues.userMob,
      userEmail: formValues.userEmail,
      userQues: formValues.userQues,
    };

    fetch(`${url}/signUp`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // the data to send
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        }
        throw new Error("Something went wrong");
      })
      .catch(() => {
        setErrorMessage("Username Already Exists");
      });
  }
  function goBack() {
    navigate(-1);
  }

  return (
    <div>
      <Form>
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="User Name" {...register("userName")} />
        <Form.Label>{errorMessage}</Form.Label>
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Password" {...register("userPass")} />
        <Form.Label>Mobile No</Form.Label>
        <Form.Control placeholder="Mobile No" {...register("userMob")} />
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Email" {...register("userEmail")} />
        <Form.Label>Pass Security Question</Form.Label>
        <Form.Control
          placeholder="Your School Name"
          {...register("userQues")}
        />
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button onClick={signUp} variant="primary">
          SignUp
        </Button>
        <Button style={{ float: "right" }} variant="primary" onClick={goBack}>
          Back
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
