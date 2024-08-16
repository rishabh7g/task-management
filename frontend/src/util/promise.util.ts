import { PromiseStatus } from 'src/types/promise.types';

export const wrapPromise = <T>(promise: Promise<T>): ReadPromise<T> => {
    let status: PromiseStatus = PromiseStatus.PENDING;
    let result: T;

    const suspender = promise.then(
        (response) => {
            status = PromiseStatus.SUCCESS;
            result = response;
        },
        (error) => {
            status = PromiseStatus.ERROR;
            result = error;
        },
    );

    const read = () => {
        switch (status) {
            case PromiseStatus.PENDING:
                throw suspender;
            case PromiseStatus.ERROR:
                throw result;
            case PromiseStatus.SUCCESS:
                return result;
        }
    };

    return { read };
};

export interface ReadPromise<T> {
    read: () => T;
}
