import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./lib/utils/msal-config";
import { MsalProvider } from "@azure/msal-react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import SignInButton from "./_auth/SignInButton";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
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
  console.log(msalInstance.getActiveAccount());
  return (
    <MsalProvider instance={msalInstance}>
      <main>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInButton />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </main>
    </MsalProvider>
  );
}

export default App;
