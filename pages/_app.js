import { AuthContextProvider } from "@/store/AuthContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Head>
          <meta
            name="description"
            content="Welcome to my digital showcase, where creativity meets functionality. Explore my portfolio to discover a world of design and innovation."
          />
          <meta
            name="keywords"
            content="language, learning, game, arindam, arindam369, cpp, java, python, javascript, easy, medium, hard, development"
          />
          <meta name="author" content="Arindam Halder" />
          <title>Language Learning</title>

          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Language Learning" />
          <meta
            property="og:description"
            content="Master coding languages with our interactive game. From beginner to advanced levels, it offers dynamic exercises. Enhance programming skills in a fun, immersive environment. Start your coding journey to expertise now!"
          />
          <meta property="og:url" content="" />
          <meta property="og:site_name" content="Language Learning" />
          <meta
            property="og:image"
            itemProp="image"
            content=""
          />
          <link rel="canonical" href="" />
          <link
            rel="shortcut icon"
            href="/favicon.png"
            type="image/x-icon"
          />
          <link rel="icon" type="image/x-icon" href="/favicon.png" />
          <link rel="manifest" href="manifest.json" />
        </Head>

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            // Define default options
            className: "",
            style: {
              fontFamily: "'Poppins', sans-serif",
              fontSize: ".9rem"
            },
            duration: 3000,
          }}
        />
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
