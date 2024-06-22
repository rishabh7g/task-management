import classNames from "classnames";
import { ReactNode } from "react";
import Input, { AriaInvalidStatus } from "src/components/input/Input";

interface FormFieldProps {
  id: string;
  label: ReactNode;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  htmlRef?: React.RefObject<HTMLInputElement>;
  autocomplete?: string;
  required?: boolean;
  isValid: boolean;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  InputHelperContent: ReactNode;
  placeholder: string;
}

export const FormField = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  htmlRef,
  autocomplete,
  required = false,
  isValid,
  onFocus,
  onBlur,
  isFocused,
  InputHelperContent,
  placeholder = "",
}: FormFieldProps) => {
  return (
    <>
      <Input
        id={id}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        htmlRef={htmlRef}
        autocomplete={autocomplete}
        required={required}
        ariaInvalid={isValid ? AriaInvalidStatus.FALSE : AriaInvalidStatus.TRUE}
        ariaDescribedby={`${id}-error`}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      <InputHelper
        isVisible={isFocused && !!value && !isValid}
        isHidden={!isFocused || !value || isValid}
        content={InputHelperContent}
        id={`${id}-error`}
      />
    </>
  );
};

interface InputHelperProps {
  isVisible: boolean;
  isHidden: boolean;
  content: ReactNode;
  id: string;
}

const InputHelper = ({
  isVisible,
  isHidden,
  content,
  id,
}: InputHelperProps) => {
  return (
    <div
      id={id}
      className={classNames({
        visible: isVisible,
        hidden: isHidden,
      })}
    >
      {content}
    </div>
  );
};
