import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import ProvideAppContext from "./context/appContext";

import "./App.css";
import { Home } from "./Home";
import AuthRedirect from "./services/AuthRedirect";

function App({ pca }) {
  return (
    <>
      <MsalProvider instance={pca}>
        <ProvideAppContext>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth-redirect" element={AuthRedirect} />
              <Route path="/calendar" element={<h1>Calendar Page</h1>} />
              <Route path="/some" element={<h1>Somepage Page</h1>} />
            </Routes>
          </Router>
        </ProvideAppContext>
      </MsalProvider>
    </>
  );
}

export default App;
