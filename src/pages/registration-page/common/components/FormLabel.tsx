import {
    IconDefinition,
    faCheck,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

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
            <LabelIcon
                Icon={faCheck}
                isHidden={isInputInvalid}
                className='text-green-600'
            />
            <LabelIcon
                Icon={faTimes}
                isHidden={isInputValid}
                className='text-red-600'
            />
        </>
    );
};

interface LabelIconProps {
    Icon: IconDefinition;
    isHidden: boolean;
    className?: string;
}

const LabelIcon = ({ Icon, isHidden, className }: LabelIconProps) => (
    <span
        className={classNames('ml-1', {
            hidden: isHidden,
        })}
    >
        <FontAwesomeIcon icon={Icon} className={className} size='lg' />
    </span>
);
