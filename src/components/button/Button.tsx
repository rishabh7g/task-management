import {
  BASE_STYLES,
  VARIANT_STYLES,
} from "src/components/button/common/constant/Button.constant";
import {
  ButtonType,
  ButtonVariant,
} from "src/components/button/common/types/Button.types";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: ButtonType;
  className?: string;
  variant?: ButtonVariant;
}

const Button = ({
  label,
  onClick,
  type = ButtonType.Button,
  className = "",
  variant = ButtonVariant.Primary,
}: ButtonProps) => {
  const combinedStyles = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
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
      className={className}
      variant={ButtonVariant.Primary}
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
      className={className}
      variant={ButtonVariant.Secondary}
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
      className={className}
      variant={ButtonVariant.Tertiary}
    />
  );
};
