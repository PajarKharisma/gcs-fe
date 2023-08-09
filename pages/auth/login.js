import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import Auth from "@/layouts/Auth.js";

function Login() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await signIn('credentials', {
      redirect: false,
      password: password,
    });
    if(status.error){
      Swal.fire({
        title: 'Error!',
        text: 'Password yang anda inputkan salah.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    } else {
      router.push('/');
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="btn-wrapper text-center">
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Input className="my-4 btn btn-primary" color="primary" value={'Sign In'} type="submit"/>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
