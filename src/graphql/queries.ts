/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTodos = /* GraphQL */ `query GetTodos($id: ID!) {
  getTodos(id: $id) {
    id
    task_name
    task_description
    is_completed
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodosQueryVariables, APITypes.GetTodosQuery>;
export const listTodos = /* GraphQL */ `query ListTodos(
  $filter: ModelTodosFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      task_name
      task_description
      is_completed
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTodosQueryVariables, APITypes.ListTodosQuery>;
