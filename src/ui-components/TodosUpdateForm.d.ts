/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Todos } from "../API.ts";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodosUpdateFormInputValues = {
    task_name?: string;
    task_description?: string;
    is_completed?: boolean;
};
export declare type TodosUpdateFormValidationValues = {
    task_name?: ValidationFunction<string>;
    task_description?: ValidationFunction<string>;
    is_completed?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodosUpdateFormOverridesProps = {
    TodosUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    task_name?: PrimitiveOverrideProps<TextFieldProps>;
    task_description?: PrimitiveOverrideProps<TextFieldProps>;
    is_completed?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type TodosUpdateFormProps = React.PropsWithChildren<{
    overrides?: TodosUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    todos?: Todos;
    onSubmit?: (fields: TodosUpdateFormInputValues) => TodosUpdateFormInputValues;
    onSuccess?: (fields: TodosUpdateFormInputValues) => void;
    onError?: (fields: TodosUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodosUpdateFormInputValues) => TodosUpdateFormInputValues;
    onValidate?: TodosUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TodosUpdateForm(props: TodosUpdateFormProps): React.ReactElement;
