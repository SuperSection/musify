import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  AuthenticateWithRedirectCallback,
  ClerkProvider,
} from "@clerk/clerk-react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import HomePage from "./pages/home/HomePage.tsx";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </>
  ),
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>
);
