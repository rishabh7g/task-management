import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useEffect, useRef } from 'react';

const MOUSEDOWN_EVENT = 'mousedown';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener(MOUSEDOWN_EVENT, handleClickOutside);
        } else {
            document.removeEventListener(MOUSEDOWN_EVENT, handleClickOutside);
        }

        return () => {
            document.removeEventListener(MOUSEDOWN_EVENT, handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div
                ref={modalRef}
                className='relative rounded-lg bg-white p-10 shadow-lg'
                role='dialog'
                aria-modal='true'
            >
                <button
                    className='absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
                    onClick={onClose}
                    aria-label='Close modal'
                >
                    <FontAwesomeIcon icon={faClose} size='1x' />
                </button>
                {children}
            </div>
        </div>
    );
};
