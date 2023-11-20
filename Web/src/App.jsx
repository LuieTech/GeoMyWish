
import { Navigate, Routes, Route } from 'react-router-dom';
import { Authenticated, Unauthenticated } from './components/authenticated';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/register/register';
import Login from './pages/login/login';
import Navbar from './components/navbar';
import Lists from './components/lists/lists';
import Groups from './components/groups/groups';
import ListDetails from './components/lists/list-details';
import './App.css';
import ListForm from './pages/forms/list-form';
import ProductForm from './pages/forms/product-form';
import GroupForm from './pages/forms/group-form';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Unauthenticated><Login /></Unauthenticated>} />
        <Route path="/signup" element={<Unauthenticated><Signup /></Unauthenticated>}  />
        <Route path="/groups" element={<Authenticated><Groups /></Authenticated>}  />
        <Route path="/groups/:groupId" element={<Authenticated><Lists /></Authenticated>} />
        <Route path="/list/:listId" element={<Authenticated><ListDetails /></Authenticated>} />
        <Route path="/create-groups" element={<Authenticated><GroupForm /></Authenticated>} />
        <Route path="/groups/:groupId/create-list" element={<ListForm />} />
        <Route path="/lists/:listId/add-product" element={<ProductForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes> 
    </div>
  );
}

export default App;