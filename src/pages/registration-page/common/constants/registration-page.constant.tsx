import { InfoPointList } from "src/pages/registration-page/common/components/InfoPointList";

export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

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

export const EmailInputHelperContent = (
  <InfoPointList title="Email requirments" points={EMAIL_VALIDATION_RULES} />
);
export const PasswordInputHelperContent = (
  <InfoPointList
    title="Password requirments"
    points={PASSWORD_VALIDATION_RULES}
  />
);

export const ConfirmPasswordInputHelperContent = (
  <InfoPointList
    title="Passwords must match"
    points={CONFIRM_PASSWORD_VALIDATION_RULES}
  />
);
