import { useNavigate, useLocation } from 'react-router-dom';
import { logoutApi } from '../service/api-services';
import { ArrowLeftShort, Power } from 'react-bootstrap-icons'; 
import { useAuthContext } from '../contexts/auth-context';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, onLogout } = useAuthContext();

  const logout = () => {
    logoutApi().then(() => onLogout());
  };

  // Decide si mostrar el botón de regreso dependiendo de la ruta actual
  const shouldShowBackButton = location.pathname.includes('/groups/') || location.pathname.includes('/list');

  // Decide no mostrar navbar en login page y signup page
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <>
    <nav className="navbar d-flex justify-content-between align-items-center px-3">
      {shouldShowBackButton && (
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          <ArrowLeftShort size={28} />
          Back
        </button>
      )}

      {!shouldShowBackButton && user && (
          <div className="user-info ">
            <strong>{`Welcome, ${user.username}!`}</strong>
          </div>
        )}


      <div className="navbar-content">
        {user && (
          <div className="user-info">
  
            <span onClick={logout} >
              <Power size={18} className='me-1'/>
              
            </span>
            
          </div>
          
        )}
      </div>
    </nav>

        <hr className="m-0" style={{ borderTop: '2.5px solid #ccc1' }} />

    </>
  );
}

export default Navbar;

