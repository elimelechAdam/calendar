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

const App = ({ pca }) => {
  return (
    <>
      <MsalProvider instance={pca}>
        <ProvideAppContext>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<Home />}>
                <Route index element={<Home />} />
                <Route path="calendar-requests" element={<MyRequests />} />
                <Route path="calendar-logs" element={<MyRequests />} />
                <Route path="בקשות-שלי" element={<MyRequests />} />
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
