import React from 'react';
import { useLocation } from 'react-router-dom';
import { PlusCircle } from 'react-bootstrap-icons'; 


function Footer() {
  const location = useLocation();

  return (
    <>
      <div className='footer'>
        {location.pathname === '/groups' && (
          <div className='add-group'>
            <PlusCircle />
          </div>
        )}
      </div>
    </>

  );
}

export default Footer;