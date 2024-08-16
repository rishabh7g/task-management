import React, { ReactElement, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface AsyncUIWrapperProps {
    loadingUI?: ReactElement;
    errorUI?: ReactElement;
    children: ReactNode;
}

export const AsyncUIWrapper = ({
    children,
    loadingUI = DefaultLoadingUI,
    errorUI = DefaultErrorUI,
}: AsyncUIWrapperProps) => {
    return (
        <ErrorBoundary fallback={errorUI}>
            <Suspense fallback={loadingUI}>{children}</Suspense>
        </ErrorBoundary>
    );
};

const DefaultLoadingUI = <div>Loading...</div>;
const DefaultErrorUI = <p>Something went wrong!</p>;
