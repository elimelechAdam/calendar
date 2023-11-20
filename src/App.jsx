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

const App = ({ pca }) => {
  return (
    <>
      <MsalProvider instance={pca}>
        <ProvideAppContext>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/auth-redirect" element={AuthRedirect} />
            </Routes>
          </Router>
        </ProvideAppContext>
      </MsalProvider>
    </>
  );
};

export default App;
