import {
  PublicClientApplication,
  EventType,
  InteractionType,
} from "@azure/msal-browser";
import { msalConfig, config } from "./lib/utils/msal-config";
import { MsalProvider } from "@azure/msal-react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignInButton from "./_auth/SignInButton";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { Client } from "@microsoft/microsoft-graph-client";
import Permissions from "./_root/pages/Permissions";
import Requests from "./_root/pages/Requests";
import { Alert } from "@material-tailwind/react";

export const msalInstance = new PublicClientApplication(msalConfig);

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

const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
  msalInstance,
  {
    account: msalInstance.getActiveAccount(),
    scopes: config.scopes,
    interactionType: InteractionType.Popup,
  }
);

export const client = Client.initWithMiddleware({ authProvider });

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <div
        className="h-screen flex justify-center align-middle items-center
     
      xl:hidden"
      >
        <Alert icon={<Icon />} className="w-2/3 flex align-middle items-center">
          אין תמיכה בטלפונים או טאבלטים
        </Alert>
      </div>
      <main className="hidden xl:block">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<SignInButton />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </main>
    </MsalProvider>
  );
}

export default App;
