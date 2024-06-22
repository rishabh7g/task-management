import classNames from "classnames";

interface ErrorMessageProps {
  errorMessage: string | null;
  htmlRef: React.RefObject<HTMLParagraphElement>;
}

export const ErrorMessage = ({
  errorMessage = "",
  htmlRef,
}: ErrorMessageProps) => (
  <p
    ref={htmlRef}
    className={classNames({
      "text-red-600": !!errorMessage,
      hidden: !errorMessage,
    })}
    aria-live="assertive"
  >
    {errorMessage}
  </p>
);
