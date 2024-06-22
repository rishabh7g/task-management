import { ButtonType } from "src/components/button/common/types/Button.types";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: ButtonType;
  className?: string;
}

const Button = ({
  label,
  onClick,
  type = ButtonType.Button,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded text-white ${className}`}
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
}: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={`bg-blue-500 hover:bg-blue-600 ${className}`}
    />
  );
};

export const SecondaryButton = ({
  label,
  onClick,
  type,
  className,
}: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={`bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white ${className}`}
    />
  );
};

export const TertiaryButton = ({
  label,
  onClick,
  type,
  className,
}: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={`px-0 py-1 text-blue-500 hover:underline hover:underline-offset-4 ${className}`}
    />
  );
};
