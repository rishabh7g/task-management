import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, TertiaryButton } from "src/components/button/Button";
import { ButtonType } from "src/components/button/common/types/Button.types";
import { ErrorMessage } from "src/components/error-message/ErrorMessage";
import Form from "src/components/form/Form";
import Input from "src/components/input/Input";
import { apiRoutes } from "src/constant/api-routes";
import { LocalStorageKeys } from "src/constant/local-storage.constant";
import { RoutePath } from "src/routes";
import { HttpMethod } from "src/services/api/api.types";
import useApi from "src/services/api/use-api";
import { localStorageService } from "src/services/local-storage/local-storage";

const LoginPage = () => {
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
    // Handle sign-in logic here
    execute(apiRoutes.createSignInUrl(), HttpMethod.POST, {
      email,
      password,
    });
  };

  const handleSignUp = () => {
    // Redirect to registration page
    navigate(RoutePath.Register);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <ErrorMessage errorMessage={error} htmlRef={errorRef} />
        <Form onSubmit={handleSignIn}>
          <Input
            label="Email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            htmlRef={emailRef}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton
            label="Sign In"
            type={ButtonType.Submit}
            className="mt-4 w-full"
            onClick={() => {}}
          />
        </Form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">{`Don't have an account?`}</span>
          <TertiaryButton
            label="Sign Up"
            className="ml-2"
            onClick={handleSignUp}
          />
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </section>
  );
};

export default LoginPage;
