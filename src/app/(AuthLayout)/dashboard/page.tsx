'use client'
import React, { FC, useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Button, Flex, Icon, Table, TableBody, TableCell, TableHead, TableRow, View } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import config from './../../../amplifyconfiguration.json';
import { listTodos } from './../../../graphql/queries';

Amplify.configure(config);

interface Todo {
  task_name: string;
  task_description: string;
  is_completed: boolean;
}

const IconAdd: FC = () => {
  return (
    <Icon
      ariaLabel=""
    >
      <svg fill="#000000" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512">
        <g>
          <g>
            <path d="M256,11C120.9,11,11,120.9,11,256s109.9,245,245,245s245-109.9,245-245S391.1,11,256,11z M256,460.2    c-112.6,0-204.2-91.6-204.2-204.2S143.4,51.8,256,51.8S460.2,143.4,460.2,256S368.6,460.2,256,460.2z"/>
            <path d="m357.6,235.6h-81.2v-81.2c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v81.2h-81.2c-11.3,0-20.4,9.1-20.4,20.4s9.1,20.4 20.4,20.4h81.2v81.2c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-81.2h81.2c11.3,0 20.4-9.1 20.4-20.4s-9.1-20.4-20.4-20.4z"/>
          </g>
        </g>
      </svg>
    </Icon>
  );
};

const IconEdit: FC = () => {
  return (
    <Icon
      ariaLabel=""
    >
      <svg className="feather feather-edit" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    </Icon>
  );
};

const IconDelete: FC = () => {
  return (
    <Icon
      ariaLabel=""
    >
      <svg className="feather feather-trash-2" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
      </svg>
    </Icon>
  );
};

interface Response {
  data: Array
}

const Dashboard: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const client = generateClient();

  const getTodoList = async () => {
    const response = await client.graphql<Todo[]>({ query: listTodos });
    const tempTodos = response.data.listTodos.items;
    setTodos(tempTodos);
  }

  useEffect(() => {
    getTodoList()
  }, [])

  return (
    <View
      padding={'1rem'}
    >
      <Flex justifyContent={'flex-end'} padding={'1rem 0rem'}>
        <Button>
          <IconAdd />
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
              <TableRow>
                <TableCell>{todo.task_name}</TableCell>
                <TableCell>{todo.task_description}</TableCell>
                <TableCell>{todo.is_completed ? `Yes` : `No`}</TableCell>
                <TableCell>
                  <Button marginRight={'0.5rem'}>
                    <IconEdit />
                  </Button>
                  <Button>
                    <IconDelete />
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
    </View>
  );
}

export default Dashboard;