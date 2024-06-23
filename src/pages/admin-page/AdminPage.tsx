const AdminPage = () => {
  return (
    <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Admin Page
      </h2>
      <p>This page is only accessible to users who have the role of admin.</p>
    </div>
  );
};

export default AdminPage;
