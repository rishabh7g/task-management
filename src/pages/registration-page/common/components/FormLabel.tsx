import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface FormLabelProps {
  label: string;
  isInputValid: boolean;
  isInputInvalid: boolean;
}

export const FormLabel = ({
  label,
  isInputValid,
  isInputInvalid,
}: FormLabelProps) => {
  return (
    <>
      {label}
      <span
        className={classNames({
          hidden: isInputInvalid,
        })}
      >
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span
        className={classNames({
          hidden: isInputValid,
        })}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </>
  );
};
