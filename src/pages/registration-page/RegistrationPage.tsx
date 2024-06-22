import { ReactNode, useState } from "react";
import { PrimaryButton } from "src/components/button/Button";
import { ButtonType } from "src/components/button/common/types/Button.types";
import { ErrorMessage } from "src/components/error-message/ErrorMessage";
import { FormField } from "src/components/form-field/FormField";
import Form from "src/components/form/Form";
import {
  LOGIN_FORM_DATA,
  VALIDATION_DATA,
} from "src/constant/login-form.constant";
import { FormLabel } from "src/pages/registration-page/common/components/FormLabel";
import { InfoPointList } from "src/pages/registration-page/common/components/InfoPointList";
import { useRegistrationPageManagement } from "src/pages/registration-page/common/hooks/registration-page.management";
import { InputType } from "src/types/form.types";

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

  const EmailInputHelperContent = (
    <InfoPointList
      title={VALIDATION_DATA.email.title}
      points={VALIDATION_DATA.email.rules}
    />
  );
  const PasswordInputHelperContent = (
    <InfoPointList
      title={VALIDATION_DATA.password.title}
      points={VALIDATION_DATA.password.rules}
    />
  );

  const ConfirmPasswordInputHelperContent = (
    <InfoPointList
      title={VALIDATION_DATA.confirmPassword.title}
      points={VALIDATION_DATA.confirmPassword.rules}
    />
  );

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h1>
        <ErrorMessage errorMessage={errorMessage} htmlRef={errorRef} />

        <Form onSubmit={handleRegister}>
          <RegisterationPageFormField
            label={LOGIN_FORM_DATA.email.label}
            name={LOGIN_FORM_DATA.email.name}
            type={InputType.TEXT}
            fieldValue={email}
            onFieldValueChange={setEmail}
            isFieldValueValid={isEmailValid}
            InputHelperContent={EmailInputHelperContent}
          />
          <RegisterationPageFormField
            label={LOGIN_FORM_DATA.password.label}
            name={LOGIN_FORM_DATA.password.name}
            type={InputType.PASSWORD}
            fieldValue={password}
            onFieldValueChange={setPassword}
            isFieldValueValid={isPasswordValid}
            InputHelperContent={PasswordInputHelperContent}
          />
          <RegisterationPageFormField
            label={LOGIN_FORM_DATA.confirmPassword.label}
            name={LOGIN_FORM_DATA.confirmPassword.name}
            type={InputType.PASSWORD}
            fieldValue={confirmPassword}
            onFieldValueChange={setConfirmPassword}
            isFieldValueValid={isPasswordMatching}
            InputHelperContent={ConfirmPasswordInputHelperContent}
          />

          <PrimaryButton
            label={LOGIN_FORM_DATA.buttonLabels.register}
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
