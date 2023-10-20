import { AuthContextProvider } from "@/store/AuthContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
          }}
        />
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
