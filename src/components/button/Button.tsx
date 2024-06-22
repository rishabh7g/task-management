import classNames from "classnames";
import { ButtonType } from "src/components/button/common/types/Button.types";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  label,
  onClick,
  type = ButtonType.Button,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "rounded",
        {
          "cursor-not-allowed": disabled,
        },
        className,
      )}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export const PrimaryButton = ({
  label,
  onClick,
  type,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={classNames(
        "bg-blue-500 hover:bg-blue-700 text-white px-4 py-2",
        {
          "bg-gray-500 text-white hover:bg-gray-500": disabled,
        },
        className,
      )}
      disabled={disabled}
    />
  );
};

export const SecondaryButton = ({
  label,
  onClick,
  type,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={classNames(
        "bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2",
        className,
        {
          "border-gray-500 text-gray-600 hover:border-gray-500": disabled,
        },
      )}
      disabled={disabled}
    />
  );
};

export const TertiaryButton = ({
  label,
  onClick,
  type,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classNames(
        "px-0 py-1 text-blue-500 hover:underline hover:underline-offset-4",
        {
          "text-gray-500 cursor-not-allowed hover:no-underline": disabled,
        },
        className,
      )}
    />
  );
};
