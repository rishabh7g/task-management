import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "src/constant/api-routes";
import { EMAIL_REGEX, PASSWORD_REGEX } from "src/constant/login-form.constant";

import { RoutePath } from "src/routes";
import { HttpMethod } from "src/services/api/api.types";
import useApi from "src/services/api/use-api";

export const useRegistrationPageManagement = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatching, setIsPasswordMatching] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { status, execute, isLoading } = useApi();

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  useEffect(() => {
    const isUserRegistered = status === 201;
    if (isUserRegistered) {
      navigate(RoutePath.Signin);
    }
  }, [navigate, status]);

  useEffect(() => {
    const isEmailValid = EMAIL_REGEX.test(email);
    setIsEmailValid(isEmailValid);
  }, [email]);

  useEffect(() => {
    const isPasswordValid = PASSWORD_REGEX.test(password);
    setIsValidPassword(isPasswordValid);
  }, [password]);

  useEffect(() => {
    const match = password === confirmPassword;
    setIsPasswordMatching(match);
  }, [confirmPassword, password]);

  useEffect(() => {
    const isSignupFailed = status !== null && status !== HttpStatusCode.Created;
    if (isSignupFailed) {
      setErrorMessage("Failed to sign up");
    }

    const isErrorRefExist = !!errorRef.current;
    if (isErrorRefExist) errorRef.current.focus();
  }, [status]);

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

  const navigateToSignInPage = () => {
    navigate(RoutePath.Signin);
  };

  const isSignupButtonDisabled =
    isLoading || !isEmailValid || !isPasswordValid || !isPasswordMatching;

  return {
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
    navigateToSignInPage,
    isLoading,
    isSignupButtonDisabled,
  };
};
