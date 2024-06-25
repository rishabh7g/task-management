import { PrimaryButton, TertiaryButton } from 'src/components/button/Button';
import { ButtonType } from 'src/components/button/common/types/Button.types';
import { ErrorMessage } from 'src/components/error-message/ErrorMessage';
import Form from 'src/components/form/Form';
import Input from 'src/components/input/Input';
import { LOGIN_FORM_DATA } from 'src/constant/login-form.constant';
import { useLoginPageManagement } from 'src/pages/login-page/common/hooks/login-page.management';
import { InputType } from 'src/types/form.types';

const DONT_HAVE_ACCOUNT_TEXT = "Don't have an account?";
const LOADING_TEXT = 'Loading...';

const LoginPage = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        errorRef,
        handleLogin,
        handleRegister,
        isLoading,
        emailRef,
        isLoginButtonDisabled,
    } = useLoginPageManagement();

    return (
        <section className='w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Login to your account
            </h2>
            <ErrorMessage errorMessage={errorMessage} htmlRef={errorRef} />
            <Form onSubmit={handleLogin} className='flex flex-col gap-5'>
                <Input
                    label={LOGIN_FORM_DATA.email.label}
                    name={LOGIN_FORM_DATA.email.name}
                    placeholder={LOGIN_FORM_DATA.email.placeholder}
                    type={InputType.EMAIL}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    htmlRef={emailRef}
                />
                <Input
                    label={LOGIN_FORM_DATA.password.label}
                    name={LOGIN_FORM_DATA.password.name}
                    placeholder={LOGIN_FORM_DATA.password.placeholder}
                    type={InputType.PASSWORD}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <PrimaryButton
                    label={
                        isLoading
                            ? LOADING_TEXT
                            : LOGIN_FORM_DATA.buttonLabels.login
                    }
                    type={ButtonType.Submit}
                    disabled={isLoginButtonDisabled}
                    className='mt-4 w-full'
                />
            </Form>
            <div className='mt-4 text-center'>
                <span className='text-gray-600'>{DONT_HAVE_ACCOUNT_TEXT}</span>
                <TertiaryButton
                    label={LOGIN_FORM_DATA.buttonLabels.register}
                    className='ml-2'
                    disabled={isLoading}
                    onClick={handleRegister}
                />
            </div>
        </section>
    );
};

export default LoginPage;
