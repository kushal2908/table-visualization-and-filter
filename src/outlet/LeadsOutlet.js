import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LEADS_PAGE, LOGIN_PAGE } from "../utils/routes/APP_ROUTE";
import PrivateRoute from "../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../utils/sessions/token";

export default function LeadsOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={LEADS_PAGE} /> <Outlet />
        </>
      )}
    </div>
  );
}
