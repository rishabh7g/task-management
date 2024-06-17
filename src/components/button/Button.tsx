interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

const BASE_STYLES = "px-4 py-2 rounded text-white";
const VARIANT_STYLES = {
  primary: "bg-blue-500 hover:bg-blue-600",
  secondary:
    "bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  tertiary:
    "px-0 py-1 bg-white text-blue-500 hover:underline hover:underline-offset-4",
};

const Button = ({
  label,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
}: ButtonProps) => {
  const combinedStyles = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} className={`${combinedStyles}`}>
      {label}
    </button>
  );
};

const PrimaryButton = ({ label, onClick, type, className }: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={className}
      variant="primary"
    />
  );
};

const SecondaryButton = ({ label, onClick, type, className }: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={className}
      variant="secondary"
    />
  );
};

const TertiaryButton = ({ label, onClick, type, className }: ButtonProps) => {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={className}
      variant="tertiary"
    />
  );
};

export { PrimaryButton, SecondaryButton, TertiaryButton };
