import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
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
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

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
    setValidMatch(match);
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
    <>
      Email
      <span
        className={classNames({
          hidden: !validEmail,
        })}
      >
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span
        className={classNames({
          hidden: !email || validEmail,
        })}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </>
  );
  const PasswordLabel = (
    <>
      Password
      <span
        className={classNames({
          hidden: !validPassword,
        })}
      >
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span
        className={classNames({
          hidden: !password || validPassword,
        })}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </>
  );

  const ConfirmPasswordLabel = (
    <>
      Confirm Password
      <span
        className={classNames({
          hidden: !validMatch,
        })}
      >
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span
        className={classNames({
          hidden: !confirmPassword || validMatch,
        })}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </>
  );
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account <FontAwesomeIcon icon={faCheckCircle} />
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
          <Input
            id="email"
            label={EmailLabel}
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            htmlRef={emailRef}
            autocomplete="off"
            required
            ariaInvalid={
              validEmail ? AriaInvalidStatus.FALSE : AriaInvalidStatus.TRUE
            }
            ariaDescribedby="email-error"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="email-error"
            className={classNames({
              visible: emailFocus && email && !validEmail,
              hidden: !emailFocus || !email || validEmail,
            })}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Email requirments <br />
            - 4-50 characters, including @ and . <br />
            - Must contain only letters, numbers, and special characters.
            <br />
            - Must contain @ and .<br />
          </p>
          <Input
            label={PasswordLabel}
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            ariaInvalid={
              validPassword ? AriaInvalidStatus.FALSE : AriaInvalidStatus.TRUE
            }
            ariaDescribedby="password-error"
            required
          />
          <p
            id="password-error"
            className={classNames({
              visible: passwordFocus && password && !validPassword,
              hidden: !passwordFocus || !password || validPassword,
            })}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Password requirments
            <br />
            - 6 characters minimum <br />- At least one letter and one number.
          </p>

          <Input
            label={ConfirmPasswordLabel}
            name="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            ariaInvalid={
              validMatch ? AriaInvalidStatus.FALSE : AriaInvalidStatus.TRUE
            }
            ariaDescribedby="confirm-password-error"
          />
          <p
            id="confirm-password-error"
            className={classNames({
              visible: matchFocus && confirmPassword && !validMatch,
              hidden: !matchFocus || !confirmPassword || validMatch,
            })}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Passwords must match
          </p>
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

export default RegistrationPage;
