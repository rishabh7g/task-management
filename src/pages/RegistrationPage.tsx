import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "src/components/button/Button";
import { ButtonType } from "src/components/button/common/types/Button.types";
import Form from "src/components/form/Form";
import Input, { AriaInvalidStatus } from "src/components/input/Input";
import { apiRoutes } from "src/constant/api-routes";
import { RoutePath } from "src/routes";
import { HttpMethod } from "src/services/api/api.types";
import useApi from "src/services/api/use-api";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const EMAIL_VALIDATION_RULES: string[] = [
  "4-50 characters, including @ and .",
  "Must contain only letters, numbers, and special characters.",
  "Must contain @ and .",
];

const PASSWORD_VALIDATION_RULES: string[] = [
  "6 characters minimum",
  "At least one letter and one number.",
];

const CONFIRM_PASSWORD_VALIDATION_RULES: string[] = [];

const RegistrationPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { status, execute } = useApi();

  useEffect(() => {
    const isEmailInputExist = emailRef && emailRef.current;
    if (isEmailInputExist) emailRef.current.focus();
  }, []);

  useEffect(() => {
    const isEmailValid = EMAIL_REGEX.test(email);
    setValidEmail(isEmailValid);
  }, [email]);

  useEffect(() => {
    const isPasswordValid = PASSWORD_REGEX.test(password);
    setValidPassword(isPasswordValid);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [confirmPassword, password]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  useEffect(() => {
    const isUserRegistered = status === 201;
    if (isUserRegistered) {
      navigate(RoutePath.Home);
    }
  }, [navigate, status]);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    execute(apiRoutes.createSignUpUrl(), HttpMethod.POST, {
      email,
      password,
    });
  };

  const EmailLabel = (
    <FormLabel
      label="Email"
      isInputValid={!email || validEmail}
      isInputInvalid={!validEmail}
    />
  );

  const PasswordLabel = (
    <FormLabel
      label="Password"
      isInputValid={!password || validPassword}
      isInputInvalid={!validPassword}
    />
  );

  const ConfirmPasswordLabel = (
    <FormLabel
      label="Confirm Password"
      isInputValid={!confirmPassword || validConfirmPassword}
      isInputInvalid={!validConfirmPassword}
    />
  );

  const EmailInputHelperContent = (
    <PointList title="Email requirments" points={EMAIL_VALIDATION_RULES} />
  );

  const PasswordInputHelperContent = (
    <PointList
      title="Password requirments"
      points={PASSWORD_VALIDATION_RULES}
    />
  );

  const ConfirmPasswordInputHelperContent = (
    <PointList
      title="Passwords must match"
      points={CONFIRM_PASSWORD_VALIDATION_RULES}
    />
  );

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h1>
        <p
          ref={errorRef}
          className={classNames({
            "text-red-600": !!errorMessage,
            hidden: !errorMessage,
          })}
          aria-live="assertive"
        >
          {errorMessage}
        </p>

        <Form onSubmit={handleRegister}>
          <FormField
            id="email"
            label={EmailLabel}
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            htmlRef={emailRef}
            autocomplete="off"
            required
            isValid={validEmail}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            isFocused={emailFocus}
            InputHelperContent={EmailInputHelperContent}
          />
          <FormField
            id="password"
            label={PasswordLabel}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            isValid={validPassword}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            isFocused={passwordFocus}
            InputHelperContent={PasswordInputHelperContent}
          />

          <FormField
            id="confirm-password"
            label={ConfirmPasswordLabel}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            isValid={validConfirmPassword}
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={() => setConfirmPasswordFocus(false)}
            isFocused={confirmPasswordFocus}
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

interface FormLabelProps {
  label: string;
  isInputValid: boolean;
  isInputInvalid: boolean;
}

const FormLabel = ({ label, isInputValid, isInputInvalid }: FormLabelProps) => {
  return (
    <>
      {label}
      <span
        className={classNames({
          hidden: isInputInvalid,
        })}
      >
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span
        className={classNames({
          hidden: isInputValid,
        })}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
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
}

const FormField = ({
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

interface PointListProps {
  title: string;
  points: string[];
}

const PointList = ({ title, points }: PointListProps) => {
  return (
    <ul>
      <FontAwesomeIcon icon={faInfoCircle} /> {title}
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
};

export default RegistrationPage;
