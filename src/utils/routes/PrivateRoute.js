import { Navigate } from "react-router-dom";
import { GET_TOKEN } from "../sessions/token";
import { LEADS_PAGE } from "./APP_ROUTE";

export default function PrivateRoute({ children }) {
  return GET_TOKEN() ? children : <Navigate to={LEADS_PAGE} />;
}
