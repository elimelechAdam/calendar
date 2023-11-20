import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import ProvideAppContext from "./context/appContext";

import "./App.css";
import { Home } from "./pages/Home";
import AuthRedirect from "./services/AuthRedirect";
import { LoginPage } from "./pages/LoginPage";
import { MyRequests } from "./pages/MyRequests";
import { RequestToMyCalendar } from "./pages/RequestToMyCalendar";

const App = ({ pca }) => {
  return (
    <>
      <MsalProvider instance={pca}>
        <ProvideAppContext>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/הבקשות-שלי" element={<Home />}>
                <Route index element={<MyRequests />} />
                <Route path="בקשות-ליומני" element={<RequestToMyCalendar />} />
              </Route>
              <Route path="/auth-redirect" element={AuthRedirect} />
            </Routes>
          </Router>
        </ProvideAppContext>
      </MsalProvider>
    </>
  );
};
export default App;
