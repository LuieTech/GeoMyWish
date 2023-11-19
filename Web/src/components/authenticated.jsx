import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";


export function Authenticated({ children }){

  const { user } = useAuthContext()
  const navigate = useNavigate();

  if(!user){
    return <Navigate to="/login" />;
  } 

    return children

}

export function Unauthenticated({children}){
  const { user } = useAuthContext()

  if(user){
    return <Navigate to="/groups" />;
  } 

    return children
}
