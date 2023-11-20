import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./lib/utils/msal-config";
import { MsalProvider } from "@azure/msal-react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import SignInButton from "./_auth/SignInButton";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
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
