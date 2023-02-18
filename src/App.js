import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadsOutlet from "./outlet/LeadsOutlet";
import NotFound from "./pages/error_pages/NotFound";
import Leads from "./pages/leads/Leads";
import Login from "./pages/login/Login";
import { LEADS_PAGE, LOGIN_PAGE } from "./utils/routes/APP_ROUTE";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={LOGIN_PAGE} element={<Login />} />

        {/* Leads Page */}
        <Route path={"/"} element={<LeadsOutlet />}>
          <Route path={LEADS_PAGE} element={<Leads />} />
        </Route>

        {/* ERROR pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
