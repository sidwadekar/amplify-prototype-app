'use client'
import React, { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Amplify } from 'aws-amplify';

import { Alert, Button, Flex, Table, TableBody, TableCell, TableHead, TableRow, TextAreaField, TextField, View } from "@aws-amplify/ui-react";
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';

import { generateClient } from 'aws-amplify/api';
import config from './../../../amplifyconfiguration.json';

import { listTodos } from './../../../graphql/queries';
import { createTodos, updateTodos, deleteTodos } from './../../../graphql/mutations';

Amplify.configure(config);

interface Todo {
  id: string;
  task_name: string;
  task_description: string;
  is_completed: boolean;
}

interface listTodosData {
  items: Todo[]
}

interface ResponseData {
  listTodos: listTodosData
}
interface CrudResponseData {
  createTodos: Todo
}

const MDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface Values {
  task_name: string;
  task_description: string;
}
interface Values1 {
  id: string;
  task_name: string;
  task_description: string;
  is_completed: boolean;
}

const Dashboard: FC = () => {
  const [initialValues, setInitialValues] = useState<Values1>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [success, setSuccess] = React.useState<String>("");
  const [error, setError] = React.useState<String>("");

  const client = generateClient();
  const { push } = useRouter();

  const getTodoList = async () => {
    let response = await client.graphql<Todo[]>({ query: listTodos }) as { data: ResponseData };
    const tempTodos = response.data.listTodos.items;
    setTodos(tempTodos);
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const setSuccessMessage = (msg: string) => {
    setSuccess(msg)
    setTimeout(() => {
      setSuccess("")
    }, 3000);
  }

  const setErrorMessage = () => {
    setError("Something when wrong!")
    setTimeout(() => {
      setError("")
    }, 3000);
  }

  const handleCreateTodo = async (values: Values) => {
    let response = await client.graphql<Todo>({ 
      query: createTodos, 
      variables: { 
        input: { 
          "task_name": values.task_name, 
          "task_description" : values.task_description,
        } 
      } 
    }) as { data: CrudResponseData };

    if(response.data == null) {
      setErrorMessage()
    }
    else {
      setTodos([...todos, response.data.createTodos]);

      setSuccessMessage("Todo created successfully!")
    }
  }

  const handleCheckTodo = async (id: string) => {
    const todo = todos.find(todo => todo.id === id)
    if(todo)
    {
      let response = await client.graphql<Todo>({ 
        query: updateTodos, 
        variables: { 
          input: { 
            "id": todo.id,
            "task_name": todo.task_name, 
            "task_description" : todo.task_description,
            "is_completed": true
          } 
        } 
      }) as { data: CrudResponseData };
      
      if(response.data == null) {
        setErrorMessage()
      }
      else {
        getTodoList()

        setSuccessMessage("Todo completed successfully!")
      }
    }
    else {
      setErrorMessage()
    }
  }

  const handleUpdateTodoForm = (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if(todo) {
      setInitialValues({
        id,
        task_name: todo.task_name,
        task_description: todo?.task_description,
        is_completed: todo?.is_completed
      });
    }
    handleOpenEdit()
  }

  const handleUpdateTodo = async (values: Values1) => {
    let response = await client.graphql<Todo>({ 
      query: updateTodos, 
      variables: { 
        input: { 
          "id": values.id,
          "task_name": values.task_name, 
          "task_description" : values.task_description,
          "is_completed": values.is_completed
        } 
      } 
    }) as { data: CrudResponseData };
    
    if(response.data == null) {
      setErrorMessage()
    }
    else {
      getTodoList()

      setSuccessMessage("Todo updated successfully!")
    }
  }

  const handleDeleteTodo = async (id: string) => {
    let response = await client.graphql<Todo>({ 
      query: deleteTodos, 
      variables: { 
        input: { 
          "id": id
        } 
      } 
    }) as { data: null };

    if(response.data == null) {
      setErrorMessage()
    }
    else {
      getTodoList()

      setSuccessMessage("Todo deleted successfully!")
    }
  }

  useEffect(() => {
    getTodoList()
    
    const loginEmail = localStorage.getItem('username');
    const isSignedIn = localStorage.getItem('isSignedIn');
    
    if(loginEmail === "" && isSignedIn === "")
    {
      push('/login');
    }
  }, [])

  return (
    <View
      padding={'1rem'}
    >
      { 
        success && 
          <Alert variation="success">{success}</Alert> 
      }
      { 
        error && 
          <Alert variation="error">{error}</Alert> 
      }
      <Flex justifyContent={'flex-end'} padding={'1rem 0rem'}>
        <Button onClick={() => handleOpen()}>
          <AddIcon />
        </Button>
      </Flex>
      <Table
        caption=""
        highlightOnHover={false}
      >
        <TableHead>
          <TableRow>
            <TableCell as="th">Task Name</TableCell>
            <TableCell as="th">Task Description</TableCell>
            <TableCell as="th">Is Completed?</TableCell>
            <TableCell as="th">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            todos.length > 0 ? todos.map((todo: Todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.task_name}</TableCell>
                <TableCell>{todo.task_description}</TableCell>
                <TableCell>{todo.is_completed ? `Yes` : `No`}</TableCell>
                <TableCell>
                  {
                    !todo.is_completed  && <Button marginRight={'0.5rem'} onClick={() => handleCheckTodo(todo.id)}>
                      <CheckIcon />
                    </Button>
                  }
                  <Button marginRight={'0.5rem'} onClick={() => handleUpdateTodoForm(todo.id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeleteTodo(todo.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4}>No Data Found!!</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      <MDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Todo
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Formik
          initialValues={{
            task_name: "",
            task_description: ""
          }}
          validationSchema={yup.object({
            task_name: yup
              .string()
              .required('Task Name is required'),
            task_description: yup
              .string(),
          })}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            handleCreateTodo(values)
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <DialogContent dividers>
                <TextField 
                  label="Task Name" 
                  name="task_name" 
                  autoComplete="task_name" 
                  hasError={touched.task_name && Boolean(errors.task_name)}
                  onChange={handleChange}
                  errorMessage={errors.task_name}
                />
                <TextAreaField 
                  label="Task Description" 
                  name="task_description" 
                  defaultValue="Enter your task description" 
                  hasError={touched.task_description && Boolean(errors.task_description)}
                  onChange={handleChange}
                  errorMessage={errors.task_description}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" autoFocus onClick={handleClose}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </MDialog>

      <MDialog
        onClose={handleCloseEdit}
        aria-labelledby="customized-dialog-title"
        open={openEdit}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Todo
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseEdit}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Formik
          initialValues={initialValues || {id: "", task_name: "", task_description: "", is_completed: false}}
          validationSchema={yup.object({
            task_name: yup
              .string()
              .required('Task Name is required'),
            task_description: yup
              .string(),
          })}
          onSubmit={(
            values: Values1,
            { setSubmitting }: FormikHelpers<Values1>
          ) => {
            handleUpdateTodo(values)
          }}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <DialogContent dividers>
                <input type="hidden" id="id" value={values.id} />
                <TextField 
                  label="Task Name" 
                  name="task_name" 
                  autoComplete="task_name" 
                  value={values.task_name}
                  hasError={touched.task_name && Boolean(errors.task_name)}
                  onChange={handleChange}
                  errorMessage={errors.task_name}
                />
                <TextAreaField 
                  label="Task Description" 
                  name="task_description" 
                  defaultValue="Enter your task description"  
                  value={values.task_description}
                  hasError={touched.task_description && Boolean(errors.task_description)}
                  onChange={handleChange}
                  errorMessage={errors.task_description}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" autoFocus onClick={handleCloseEdit}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </MDialog>
    </View>
  );
}

export default Dashboard;