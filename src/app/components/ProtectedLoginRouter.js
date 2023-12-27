import { Navigate } from "react-router-dom"
import { ROUTES } from "../../routes/const"

export const ProtectedLoginRouter  = ({children}) => {
    if(localStorage.getItem("token")){
     return <Navigate to={ROUTES.MAIN.HOME}/>
    }
    return children
  }