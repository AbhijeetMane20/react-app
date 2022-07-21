import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import url from "./GlobalVar";

function Login() {
  const navigate = useNavigate();
  const { register, getValues } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  function login() {
    const formValues = getValues();

    const requestBody = {
      userName: formValues.userName,
      userPass: formValues.userPass,
    };
    // navigate("/", { replace: true });
    // console.log(getValues());

    fetch(`${url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // the data to send
      body: JSON.stringify(requestBody),
    })
      // .then((res) => res.json())
      .then((resJson) => {
        resJson.text().then((r) => {
          localStorage.setItem("token", r);
          navigate("/");
          
        });
      })
      .catch(
        () => setErrorMessage("Invalid Username Or Password"),
        localStorage.removeItem("token")
      );
  }
  function goBack() {
    navigate(-1);
  }
  return (
    <div>
      <Form>
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="User Name" {...register("userName")} />
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Password" {...register("userPass")} />

        <Form.Label>{errorMessage}</Form.Label>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button onClick={login} variant="primary">
          Login
        </Button>
        <Button style={{ float: "right" }} variant="primary" onClick={goBack}>
          Back
        </Button>
      </Form>
    </div>
  );
}

export default Login;
