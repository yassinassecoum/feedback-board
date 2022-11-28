import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  children: any
}


export const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  let { user } = useUserAuth();
  if (!user) {
    return navigate("/");
  } else {
    return children;
  }
};
