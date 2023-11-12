
import { Navigate, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import GroupDetails from './pages/group-details/group-details';
import ListDetails from './pages/list-details/list-details';
import Login from './pages/login/login';
import Navbar from './components/navbar';
import SignupPage from './pages/register/register';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/groups/:groupId" element={<GroupDetails />} />
        <Route path="/lists/:listId" element={<ListDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </div>
  );
}

export default App;navigator