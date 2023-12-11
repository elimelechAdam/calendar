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

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import config from "./config/Config";
import { UserRequestsTable } from "./componenets/UserRequestsTable";
import { MyRequestsTable } from "./componenets/MyRequestsTable";

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
});
// Check if there are already accounts in the browser session
// If so, set the first account as the active account
const accounts = msalInstance.getAllAccounts();
if (accounts && accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    // Set the active account - this simplifies token acquisition
    const authResult = event.payload;
    msalInstance.setActiveAccount(authResult.account);
  }
});
const App = () => {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <ProvideAppContext>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/my-requests" element={<Home />}>
                <Route index element={<MyRequestsTable />} />
                <Route
                  path="requests-to-calendar"
                  element={<UserRequestsTable />}
                />
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
