import { ReactNode, useState } from "react";
import { PrimaryButton } from "src/components/button/Button";
import { ButtonType } from "src/components/button/common/types/Button.types";
import { ErrorMessage } from "src/components/error-message/ErrorMessage";
import { FormField } from "src/components/form-field/FormField";
import Form from "src/components/form/Form";
import { FormLabel } from "src/pages/registration-page/common/components/FormLabel";
import {
  ConfirmPasswordInputHelperContent,
  EmailInputHelperContent,
  PasswordInputHelperContent,
} from "src/pages/registration-page/common/constants/registration-page.constant";
import { useRegistrationPageManagement } from "src/pages/registration-page/common/hooks/registration-page.management";

const RegistrationPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
    isEmailValid,
    isPasswordValid,
    isPasswordMatching,
    errorMessage,
    errorRef,
  } = useRegistrationPageManagement();

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h1>
        <ErrorMessage errorMessage={errorMessage} htmlRef={errorRef} />

        <Form onSubmit={handleRegister}>
          <RegisterationPageFormField
            label="Email"
            name="email"
            type="text"
            fieldValue={email}
            onFieldValueChange={setEmail}
            isFieldValueValid={isEmailValid}
            InputHelperContent={EmailInputHelperContent}
          />
          <RegisterationPageFormField
            label="Password"
            name="password"
            type="password"
            fieldValue={password}
            onFieldValueChange={setPassword}
            isFieldValueValid={isPasswordValid}
            InputHelperContent={PasswordInputHelperContent}
          />
          <RegisterationPageFormField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            fieldValue={confirmPassword}
            onFieldValueChange={setConfirmPassword}
            isFieldValueValid={isPasswordMatching}
            InputHelperContent={ConfirmPasswordInputHelperContent}
          />

          <PrimaryButton
            label="Register"
            type={ButtonType.Submit}
            className="mt-4 w-full"
            onClick={() => {}}
          />
        </Form>
      </div>
    </section>
  );
};

interface RegisterFormFieldProps {
  fieldValue: string;
  onFieldValueChange: (newConfirmPassword: string) => void;
  isFieldValueValid: boolean;
  id?: string;
  name: string;
  type: string;
  label: string;
  InputHelperContent: ReactNode;
}

const RegisterationPageFormField = ({
  fieldValue,
  onFieldValueChange,
  isFieldValueValid,
  name,
  type,
  label,
  InputHelperContent,
  id = name,
}: RegisterFormFieldProps) => {
  const [isFieldFocussed, setIsFieldFocussed] = useState(false);

  const ConfirmPasswordLabel = (
    <FormLabel
      label={label}
      isInputValid={!fieldValue || isFieldValueValid}
      isInputInvalid={!isFieldValueValid}
    />
  );

  return (
    <FormField
      id={id}
      label={ConfirmPasswordLabel}
      name={name}
      type={type}
      value={fieldValue}
      onChange={(e) => onFieldValueChange(e.target.value)}
      required
      isValid={isFieldValueValid}
      onFocus={() => setIsFieldFocussed(true)}
      onBlur={() => setIsFieldFocussed(false)}
      isFocused={isFieldFocussed}
      InputHelperContent={InputHelperContent}
    />
  );
};

export default RegistrationPage;
