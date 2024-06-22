import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "src/constant/api-routes";
import { LocalStorageKeys } from "src/constant/local-storage.constant";
import { RoutePath } from "src/routes";
import { HttpMethod } from "src/services/api/api.types";
import useApi from "src/services/api/use-api";
import { localStorageService } from "src/services/local-storage/local-storage";

export const useLoginPageManagement = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { error, data, execute, isLoading } = useApi<{
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
      navigate(RoutePath.Tasks);
    }
  }, [data, navigate]);

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

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    errorRef,
    handleSignIn,
    handleSignUp,
    isLoading,
    emailRef,
  };
};
