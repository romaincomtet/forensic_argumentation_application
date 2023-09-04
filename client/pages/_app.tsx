import { AuthProvider } from "@/app/Provider/AuthProvider";
import { ProtectRoute } from "@/app/Provider/ProtectRoute";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastifyProvider } from "@/app/Provider/ToastProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectRoute>
        <ToastifyProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ToastifyProvider>
      </ProtectRoute>
    </AuthProvider>
  );
}
