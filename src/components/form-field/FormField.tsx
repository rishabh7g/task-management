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
  InputHelperContent: ReactNode;
  placeholder: string;
  isFocused: boolean;
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
  InputHelperContent,
  placeholder = "",
  isFocused,
}: FormFieldProps) => {
  return (
    <div className="my-7 flex flex-col gap-2">
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
    </div>
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
      className={classNames("rounded bg-amber-100 p-5", {
        visible: isVisible,
        hidden: isHidden,
      })}
    >
      {content}
    </div>
  );
};
