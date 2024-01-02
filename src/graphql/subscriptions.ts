/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTodos = /* GraphQL */ `subscription OnCreateTodos($filter: ModelSubscriptionTodosFilterInput) {
  onCreateTodos(filter: $filter) {
    id
    task_name
    task_description
    is_completed
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTodosSubscriptionVariables,
  APITypes.OnCreateTodosSubscription
>;
export const onUpdateTodos = /* GraphQL */ `subscription OnUpdateTodos($filter: ModelSubscriptionTodosFilterInput) {
  onUpdateTodos(filter: $filter) {
    id
    task_name
    task_description
    is_completed
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTodosSubscriptionVariables,
  APITypes.OnUpdateTodosSubscription
>;
export const onDeleteTodos = /* GraphQL */ `subscription OnDeleteTodos($filter: ModelSubscriptionTodosFilterInput) {
  onDeleteTodos(filter: $filter) {
    id
    task_name
    task_description
    is_completed
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTodosSubscriptionVariables,
  APITypes.OnDeleteTodosSubscription
>;
