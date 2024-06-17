import LoginPage from "src/pages/LoginPage";
import RegistrationPage from "src/pages/RegisterPage";
import TaskManagementPage from "src/pages/TaskPage";

const App = () => {
  return (
    <div className="App">
      <LoginPage />
      <RegistrationPage />
      <TaskManagementPage />
    </div>
  );
};

export default App;
