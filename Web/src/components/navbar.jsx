import { useNavigate, useLocation } from 'react-router-dom';
import { logoutApi } from '../service/api-services';
import { ArrowLeftShort, Power } from 'react-bootstrap-icons'; 
import { useAuthContext } from '../contexts/auth-context';
import { useParams } from 'react-router-dom';

function Navbar({groupId}) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, onLogout } = useAuthContext();

  const pathSegments = location.pathname.split('/');

  // const groupId = pathSegments[2]; 

  const getBackRoute = () => {
    if (location.pathname.startsWith('/groups/') && !location.pathname.includes('/list/')) {
      return '/groups'; 
    } else if (location.pathname.includes('/list/') && groupId) {
      console.log("Group ID en Navbar:", groupId);
      return `/groups/${groupId}`; 
    } else {
      return '/'; 
    }
  };
  

  const handleBackClick = () => {
    const route = getBackRoute();
    navigate(route);
  };
  


  const logout = () => {
    logoutApi().then(() => onLogout());
  };

  let shouldShowBackButton = true;

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }
  if (location.pathname === '/groups') {
    shouldShowBackButton = false;
  }

  return (
    <>
    <nav className="navbar d-flex justify-content-between align-items-center px-3">
      {shouldShowBackButton && (
        <button className="btn btn-link" onClick={() => handleBackClick()}>
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

