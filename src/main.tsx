import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProviderWrapper } from "./context/auth.context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </StrictMode>
);
