/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getTodos } from "../graphql/queries";
import { updateTodos } from "../graphql/mutations";
const client = generateClient();
export default function TodosUpdateForm(props) {
  const {
    id: idProp,
    todos: todosModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    task_name: "",
    task_description: "",
    is_completed: false,
  };
  const [task_name, setTask_name] = React.useState(initialValues.task_name);
  const [task_description, setTask_description] = React.useState(
    initialValues.task_description
  );
  const [is_completed, setIs_completed] = React.useState(
    initialValues.is_completed
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = todosRecord
      ? { ...initialValues, ...todosRecord }
      : initialValues;
    setTask_name(cleanValues.task_name);
    setTask_description(cleanValues.task_description);
    setIs_completed(cleanValues.is_completed);
    setErrors({});
  };
  const [todosRecord, setTodosRecord] = React.useState(todosModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTodos.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTodos
        : todosModelProp;
      setTodosRecord(record);
    };
    queryData();
  }, [idProp, todosModelProp]);
  React.useEffect(resetStateValues, [todosRecord]);
  const validations = {
    task_name: [{ type: "Required" }],
    task_description: [],
    is_completed: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          task_name,
          task_description: task_description ?? null,
          is_completed: is_completed ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateTodos.replaceAll("__typename", ""),
            variables: {
              input: {
                id: todosRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TodosUpdateForm")}
      {...rest}
    >
      <TextField
        label="Task name"
        isRequired={true}
        isReadOnly={false}
        value={task_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              task_name: value,
              task_description,
              is_completed,
            };
            const result = onChange(modelFields);
            value = result?.task_name ?? value;
          }
          if (errors.task_name?.hasError) {
            runValidationTasks("task_name", value);
          }
          setTask_name(value);
        }}
        onBlur={() => runValidationTasks("task_name", task_name)}
        errorMessage={errors.task_name?.errorMessage}
        hasError={errors.task_name?.hasError}
        {...getOverrideProps(overrides, "task_name")}
      ></TextField>
      <TextField
        label="Task description"
        isRequired={false}
        isReadOnly={false}
        value={task_description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              task_name,
              task_description: value,
              is_completed,
            };
            const result = onChange(modelFields);
            value = result?.task_description ?? value;
          }
          if (errors.task_description?.hasError) {
            runValidationTasks("task_description", value);
          }
          setTask_description(value);
        }}
        onBlur={() => runValidationTasks("task_description", task_description)}
        errorMessage={errors.task_description?.errorMessage}
        hasError={errors.task_description?.hasError}
        {...getOverrideProps(overrides, "task_description")}
      ></TextField>
      <SwitchField
        label="Is completed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_completed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              task_name,
              task_description,
              is_completed: value,
            };
            const result = onChange(modelFields);
            value = result?.is_completed ?? value;
          }
          if (errors.is_completed?.hasError) {
            runValidationTasks("is_completed", value);
          }
          setIs_completed(value);
        }}
        onBlur={() => runValidationTasks("is_completed", is_completed)}
        errorMessage={errors.is_completed?.errorMessage}
        hasError={errors.is_completed?.hasError}
        {...getOverrideProps(overrides, "is_completed")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || todosModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || todosModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
