import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InfoPointListProps {
  title: string;
  points: string[];
}

export const InfoPointList = ({ title, points }: InfoPointListProps) => {
  return (
    <ul>
      <FontAwesomeIcon icon={faInfoCircle} /> {title}
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
};
