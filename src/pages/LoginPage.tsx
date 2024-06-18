import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpMethod } from "src/api/api.types";
import useApi from "src/api/use-api";
import { PrimaryButton, TertiaryButton } from "src/components/button/Button";
import { ButtonType } from "src/components/button/common/types/Button.types";
import Form from "src/components/form/Form";
import Input from "src/components/input/Input";
import { apiRoutes } from "src/constant/api-routes";
import { useUser } from "src/context/user.context";
import { UserAction } from "src/context/user.context.type";
import { RoutePath } from "src/routes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, userDispatch] = useUser();

  const { error, data, execute, isLoading } = useApi<{
    token: string;
    id: string;
  }>();

  useEffect(() => {
    const isTokenExist = data && data.token;
    const isUserIdExist = data && data.id;
    const shouldNavigateToTaskPage = isTokenExist && isUserIdExist;
    if (shouldNavigateToTaskPage) {
      userDispatch({ type: UserAction.LOGIN, payload: data.id });
      navigate(RoutePath.Tasks);
    }
  }, [data, navigate, userDispatch]);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign-in logic here
    execute(apiRoutes.createSignInUrl(), HttpMethod.POST, { email, password });
  };

  const handleSignUp = () => {
    // Redirect to registration page
    navigate(RoutePath.Register);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <Form onSubmit={handleSignIn}>
          <Input
            label="Email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
    </div>
  );
};

export default LoginPage;
