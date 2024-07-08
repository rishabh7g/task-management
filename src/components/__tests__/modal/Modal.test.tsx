import { Modal } from 'src/components/modal/Modal';
import { render, screen } from 'src/util/test-util';

describe('<Modal />', () => {
    test('renders the modal content when open', () => {
        const mockedOnClose = jest.fn();
        render(
            <Modal isOpen onClose={mockedOnClose}>
                <div>Modal Content</div>
            </Modal>,
        );

        const modalContent = screen.getByText('Modal Content');
        expect(modalContent).toBeInTheDocument();
    });

    test('does not render the modal content when closed', () => {
        const mockedOnClose = jest.fn();

        render(
            <Modal onClose={mockedOnClose} isOpen={false}>
                <div>Modal Content</div>
            </Modal>,
        );

        const modalContent = screen.queryByText('Modal Content');
        expect(modalContent).toBeNull();
    });

    test('calls onClose when clicking outside the modal', async () => {
        const mockedOnClose = jest.fn();
        const { user } = render(
            <Modal isOpen onClose={mockedOnClose}>
                <div>Modal Content</div>
            </Modal>,
        );
        await user.click(document.body);
        expect(mockedOnClose).toHaveBeenCalledTimes(1);
    });

    test('does not call onClose when clicking inside the modal', async () => {
        const mockedOnClose = jest.fn();
        const { user } = render(
            <Modal isOpen onClose={mockedOnClose}>
                <div>Modal Content</div>
            </Modal>,
        );

        const modalContent = screen.getByText('Modal Content');
        await user.click(modalContent);
        expect(mockedOnClose).not.toHaveBeenCalled();
    });

    test('calls onClose when clicking the close button', async () => {
        const mockedOnClose = jest.fn();
        const { user } = render(
            <Modal isOpen onClose={mockedOnClose}>
                <div>Modal Content</div>
            </Modal>,
        );
        const closeButton = screen.getByRole('button', {
            name: /close modal/i,
        });
        await user.click(closeButton);
        expect(mockedOnClose).toHaveBeenCalledTimes(1);
    });

    test('applies the correct aria attributes', () => {
        const mockedOnClose = jest.fn();
        render(
            <Modal isOpen onClose={mockedOnClose}>
                <div>Modal Content</div>
            </Modal>,
        );

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
});
