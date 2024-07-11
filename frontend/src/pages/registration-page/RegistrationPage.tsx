import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { PrimaryButton, TertiaryButton } from 'src/components/button/Button';
import { ButtonType } from 'src/components/button/common/types/Button.types';
import { ErrorMessage } from 'src/components/error-message/ErrorMessage';
import { FormField } from 'src/components/form-field/FormField';
import { Form } from 'src/components/form/Form';
import {
    LOGIN_FORM_DATA,
    VALIDATION_DATA,
} from 'src/constant/login-form.constant';
import { FormLabel } from 'src/pages/registration-page/common/components/FormLabel';
import { InfoPointList } from 'src/pages/registration-page/common/components/InfoPointList';
import { useRegistrationPageManagement } from 'src/pages/registration-page/common/hooks/registration-page.management';
import { InputType } from 'src/types/form.types';

const ALREADY_HAVE_AN_ACCOUNT_TEXT = 'Already have an account?';

export const RegistrationPage = () => {
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
        navigateToLoginPage,
        isLoading,
        isRegistrationButtonDisabled,
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
        <div className='w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg'>
            <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Create your account
            </h1>
            <ErrorMessage errorMessage={errorMessage} htmlRef={errorRef} />

            <Form onSubmit={handleRegister}>
                <RegisterationPageFormField
                    label={LOGIN_FORM_DATA.email.label}
                    name={LOGIN_FORM_DATA.email.name}
                    placeholder={LOGIN_FORM_DATA.email.placeholder}
                    type={InputType.TEXT}
                    fieldValue={email}
                    onFieldValueChange={setEmail}
                    isFieldValueValid={isEmailValid}
                    InputHelperContent={EmailInputHelperContent}
                    shouldFocousOnLoad
                />
                <RegisterationPageFormField
                    label={LOGIN_FORM_DATA.password.label}
                    name={LOGIN_FORM_DATA.password.name}
                    placeholder={LOGIN_FORM_DATA.password.placeholder}
                    type={InputType.PASSWORD}
                    fieldValue={password}
                    onFieldValueChange={setPassword}
                    isFieldValueValid={isPasswordValid}
                    InputHelperContent={PasswordInputHelperContent}
                />
                <RegisterationPageFormField
                    label={LOGIN_FORM_DATA.confirmPassword.label}
                    name={LOGIN_FORM_DATA.confirmPassword.name}
                    placeholder={LOGIN_FORM_DATA.confirmPassword.placeholder}
                    type={InputType.PASSWORD}
                    fieldValue={confirmPassword}
                    onFieldValueChange={setConfirmPassword}
                    isFieldValueValid={isPasswordMatching}
                    InputHelperContent={ConfirmPasswordInputHelperContent}
                />

                <PrimaryButton
                    label={LOGIN_FORM_DATA.buttonLabels.register}
                    type={ButtonType.Submit}
                    className='mt-4 w-full'
                    disabled={isRegistrationButtonDisabled}
                />
            </Form>
            <div className='mt-4 text-center'>
                <span className='text-gray-600'>
                    {ALREADY_HAVE_AN_ACCOUNT_TEXT}
                </span>
                <TertiaryButton
                    label={LOGIN_FORM_DATA.buttonLabels.login}
                    className='ml-2'
                    onClick={navigateToLoginPage}
                    disabled={isLoading}
                />
            </div>
        </div>
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
    placeholder: string;
    shouldFocousOnLoad?: boolean;
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
    placeholder = '',
    shouldFocousOnLoad = false,
}: RegisterFormFieldProps) => {
    const formFieldRef = useRef<HTMLInputElement>(null);
    const [isFieldFocussed, setIsFieldFocussed] = useState(false);

    useEffect(() => {
        const isFormFieldRefAvailable = !!formFieldRef.current;
        if (isFormFieldRefAvailable && shouldFocousOnLoad) {
            formFieldRef.current.focus();
        }
    }, [shouldFocousOnLoad]);

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
            InputHelperContent={InputHelperContent}
            placeholder={placeholder}
            htmlRef={formFieldRef}
            isFocused={isFieldFocussed}
        />
    );
};
