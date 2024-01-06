'use client'
import React, { FC, useRef, useState } from "react";

import { useRouter } from 'next/navigation';

import { Amplify } from 'aws-amplify';

import { Alert, Button, Flex, Heading, Link, PasswordField, TextAreaField, TextField, useTheme } from '@aws-amplify/ui-react';

import { signUp } from 'aws-amplify/auth';

import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';

import config from './../../../amplifyconfiguration.json';

Amplify.configure(config);

interface Values {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  address: string;
  phone_number: string;
}

const register: FC = () => {
  const dialCodeRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<{ error: boolean, message: string }>({
    error: false,
    message: ""
  });

  const { tokens } = useTheme();
  const { push } = useRouter();

  async function handleSignUp({ 
    name,
    email,
    password,
    confirm_password,
    address,
    phone_number 
  }: Values) {
    try {
      const username = email;
      const { isSignUpComplete, userId, nextStep } = await signUp({ 
        username,
        password,
        options: {
          userAttributes: {
            name,
            email,
            address,
            phone_number: "+91" + phone_number
          },
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });

      setResponse({
        error: false,
        message: "Register successfully!"
      })

      setTimeout(() => {
        push('/login')
      }, 3000);

    } catch (error) {
      console.log('error signing up', error);
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
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          address: "",
          phone_number: "" 
        }}
        validationSchema={yup.object({
          name: yup
            .string()
            .required('Email is required'),
          email: yup
            .string()
            .email('Must be a valid email')
            .required('Email is required'),
          password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
          confirm_password: yup.string()
            .oneOf([yup.ref('password'), ''], 'Passwords must match')
            .required('Confirm password is required'),
          address: yup
            .string()
            .required('Address is required'),
          phone_number: yup
            .string()
            .required('phone number is required'),
        })}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          handleSignUp(values);
        }}
      >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <Flex direction="column" gap={tokens.space.medium}>
            <Heading level={3}>Register</Heading>
            <TextField 
              label="Name" 
              name="name" 
              autoComplete="name" 
              hasError={touched.name && Boolean(errors.name)}
              onChange={handleChange}
              errorMessage={errors.name}
            />
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
              autoComplete="new-password"
              hasError={touched.password && Boolean(errors.password)}
              onChange={handleChange}
              errorMessage={errors.password}
            />
            <PasswordField
              label="Confirm password"
              name="confirm_password"
              autoComplete="new-password"
              hasError={touched.confirm_password && Boolean(errors.confirm_password)}
              onChange={handleChange}
              errorMessage={errors.confirm_password}
            />
            <TextAreaField 
              label="Address" 
              name="address" 
              defaultValue="Enter your address" 
              hasError={touched.address && Boolean(errors.address)}
              onChange={handleChange}
              errorMessage={errors.address}
            />
            <TextField  
              label="Phone Number" 
              name="phone_number" 
              autoComplete="phone_number" 
              hasError={touched.phone_number && Boolean(errors.phone_number)}
              onChange={handleChange}
              errorMessage={errors.phone_number}
            />
            <Button type="submit">
              Register
            </Button>
            <Link
              href="/login"
              color="#007EB9"
            >
              Already have an account? Login
            </Link>
              {response.message !== "" && <Alert variation={response.error ? 'error': 'success'}>{response.message}</Alert>}
          </Flex>
        </Form>
      )}
      </Formik>
    </Flex>
  );
};

export default register;