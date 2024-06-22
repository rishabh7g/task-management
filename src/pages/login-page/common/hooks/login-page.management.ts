import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "src/constant/api-routes";
import { LocalStorageKeys } from "src/constant/local-storage.constant";
import { useAuth } from "src/context/auth-context";
import { RoutePath } from "src/routes";
import { HttpMethod } from "src/services/api/api.types";
import useApi from "src/services/api/use-api";
import { localStorageService } from "src/services/local-storage/local-storage";

export const useLoginPageManagement = () => {
  const { loginUser } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { status, data, execute, isLoading } = useApi<{
    accessToken: string;
  }>();

  useEffect(() => {
    const isEmailFieldExist = !!emailRef.current;
    if (isEmailFieldExist) emailRef.current.focus();
  }, []);

  useEffect(() => {
    const isTokenExist = data && data.accessToken;
    if (isTokenExist) {
      localStorageService.setItem(LocalStorageKeys.TOKEN, data.accessToken);
      loginUser(email, password, data.accessToken);
      navigate(RoutePath.Tasks);
    }
  }, [data, email, loginUser, navigate, password]);

  useEffect(() => {
    setErrorMessage(_getErrorMessage(status));

    const isErrorRefExist = !!errorRef.current;
    if (isErrorRefExist) errorRef.current.focus();
  }, [status]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute(apiRoutes.createSignInUrl(), HttpMethod.POST, {
      email,
      password,
    });
  };

  const handleSignUp = () => {
    navigate(RoutePath.Register);
  };

  const isSignInButtonDisabled = isLoading || !email || !password;

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    errorRef,
    handleSignIn,
    handleSignUp,
    isLoading,
    emailRef,
    isSignInButtonDisabled,
  };
};

const _getErrorMessage = (status: number | null) => {
  const isStatusNotExist = status === null;
  if (isStatusNotExist) return "";

  switch (status) {
    case HttpStatusCode.NotFound:
      return "No account found for the entered email.";
    case HttpStatusCode.UnprocessableEntity:
      return "Invalid email or password. Please try again.";
    case HttpStatusCode.Unauthorized:
      return "Your session has expired. Please log in again.";
    case HttpStatusCode.InternalServerError:
      return "An unexpected error occurred. Please try again later.";
    default:
      return "An error occurred. Please check your connection and try again.";
  }
};
