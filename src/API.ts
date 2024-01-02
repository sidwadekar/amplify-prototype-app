/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodosInput = {
  id?: string | null,
  task_name: string,
  task_description?: string | null,
  is_completed?: boolean | null,
};

export type ModelTodosConditionInput = {
  task_name?: ModelStringInput | null,
  task_description?: ModelStringInput | null,
  is_completed?: ModelBooleanInput | null,
  and?: Array< ModelTodosConditionInput | null > | null,
  or?: Array< ModelTodosConditionInput | null > | null,
  not?: ModelTodosConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Todos = {
  __typename: "Todos",
  id: string,
  task_name: string,
  task_description?: string | null,
  is_completed?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodosInput = {
  id: string,
  task_name?: string | null,
  task_description?: string | null,
  is_completed?: boolean | null,
};

export type DeleteTodosInput = {
  id: string,
};

export type ModelTodosFilterInput = {
  id?: ModelIDInput | null,
  task_name?: ModelStringInput | null,
  task_description?: ModelStringInput | null,
  is_completed?: ModelBooleanInput | null,
  and?: Array< ModelTodosFilterInput | null > | null,
  or?: Array< ModelTodosFilterInput | null > | null,
  not?: ModelTodosFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTodosConnection = {
  __typename: "ModelTodosConnection",
  items:  Array<Todos | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTodosFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  task_name?: ModelSubscriptionStringInput | null,
  task_description?: ModelSubscriptionStringInput | null,
  is_completed?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionTodosFilterInput | null > | null,
  or?: Array< ModelSubscriptionTodosFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateTodosMutationVariables = {
  input: CreateTodosInput,
  condition?: ModelTodosConditionInput | null,
};

export type CreateTodosMutation = {
  createTodos?:  {
    __typename: "Todos",
    id: string,
    task_name: string,
    task_description?: string | null,
    is_completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodosMutationVariables = {
  input: UpdateTodosInput,
  condition?: ModelTodosConditionInput | null,
};

export type UpdateTodosMutation = {
  updateTodos?:  {
    __typename: "Todos",
    id: string,
    task_name: string,
    task_description?: string | null,
    is_completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodosMutationVariables = {
  input: DeleteTodosInput,
  condition?: ModelTodosConditionInput | null,
};

export type DeleteTodosMutation = {
  deleteTodos?:  {
    __typename: "Todos",
    id: string,
    task_name: string,
    task_description?: string | null,
    is_completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTodosQueryVariables = {
  id: string,
};

export type GetTodosQuery = {
  getTodos?:  {
    __typename: "Todos",
    id: string,
    task_name: string,
    task_description?: string | null,
    is_completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodosFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodosConnection",
    items:  Array< {
      __typename: "Todos",
      id: string,
      task_name: string,
      task_description?: string | null,
      is_completed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodosSubscriptionVariables = {
  filter?: ModelSubscriptionTodosFilterInput | null,
};

export type OnCreateTodosSubscription = {
  onCreateTodos?:  {
    __typename: "Todos",
    id: string,
    task_name: string,
    task_description?: string | null,
    is_completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodosSubscriptionVariables = {
  filter?: ModelSubscriptionTodosFilterInput | null,
};

export type OnUpdateTodosSubscription = {
  onUpdateTodos?:  {
    __typename: "Todos",
    id: string,
    task_name: string,
    task_description?: string | null,
    is_completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodosSubscriptionVariables = {
  filter?: ModelSubscriptionTodosFilterInput | null,
};

export type OnDeleteTodosSubscription = {
  onDeleteTodos?:  {
    __typename: "Todos",
    id: string,
    task_name: string,
    task_description?: string | null,
    is_completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
