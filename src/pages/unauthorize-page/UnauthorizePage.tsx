const UnauthorizedPage = () => {
    return (
        <div className='w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Unauthorized Page
            </h2>
            <p>You are not authorized to view this page.</p>
        </div>
    );
};

export default UnauthorizedPage;
