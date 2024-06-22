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
  const { status, execute } = useApi();

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  useEffect(() => {
    const isUserRegistered = status === 201;
    if (isUserRegistered) {
      navigate(RoutePath.Home);
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
    navigate(RoutePath.Home);
  };

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
  };
};
