'use client'
import React from "react";

import { useRouter } from 'next/navigation';

import { Amplify } from 'aws-amplify';

import {
  Alert,
  Button,
  Flex,
  Heading,
  Link,
  PasswordField,
  TextField,
  useTheme,
} from '@aws-amplify/ui-react';

import { signIn, type SignInInput } from 'aws-amplify/auth';

import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';

import config from './../../../amplifyconfiguration.json';

Amplify.configure(config);

interface Values {
  email: string;
  password: string;
}

const login = () => {
  const [response, setResponse] = React.useState({
    error: false,
    message: ""
  });

  const { tokens } = useTheme();
  const { push } = useRouter();

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      localStorage.setItem("username", username);
      localStorage.setItem("isSignedIn", isSignedIn.toString());
      
      setResponse({
        error: false,
        message: "Login successfully!"
      })

      setTimeout(() => {
        push('/dashboard');
      }, 3000);
    } catch (error) {
      console.log('error signing in', error);
      setResponse({
        error: true,
        message: "Something when wrong!"
      })
    }
  }

  React.useEffect(() => {
    const loginEmail = localStorage.getItem('username');
    const isSignedIn = localStorage.getItem('isSignedIn');

    if(loginEmail !== "" && isSignedIn === "true")
    {
      push('/dashboard');
    }
  }, [])

  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={yup.object({
          email: yup
            .string()
            .email('Must be a valid email')
            .required('Email is required'),
          password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        })}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          handleSignIn({username: values.email, password: values.password});
        }}
      >
        {({ errors, touched, handleChange }) => (
          <Form>
            <Flex direction="column" gap={tokens.space.medium}>
              <Heading level={3}>Login</Heading>
              <TextField 
                type="email" 
                label="Email" 
                name="email" 
                autoComplete="email" 
                hasError={touched.email && Boolean(errors.email)}
                onChange={handleChange}
                errorMessage={errors.email}
              />
              <PasswordField
                label="Password"
                name="password"
                autoComplete="current-password"
                hasError={touched.email && Boolean(errors.email)}
                onChange={handleChange}
                errorMessage={errors.password}
              />
              <Button type="submit">
                Login
              </Button>
              <Link
                href="/register"
                color="#007EB9"
              >
                Don’t have an Account? Register
              </Link>
              {response.message !== "" && <Alert variation={response.error ? 'error': 'success'}>{response.message}</Alert>}
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default login;
