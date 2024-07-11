import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface InfoPointListProps {
    title: string;
    points: string[];
}

export const InfoPointList = ({ title, points }: InfoPointListProps) => {
    return (
        <ul>
            <FontAwesomeIcon icon={faInfoCircle} />{' '}
            <span className='ml-1'>{title}</span>
            {points.map((point) => (
                <li key={point} className='ml-7 list-disc'>
                    {point}
                </li>
            ))}
        </ul>
    );
};
