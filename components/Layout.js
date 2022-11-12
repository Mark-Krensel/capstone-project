import Head from "next/head";
import Header from "./Header";
import Background from "./Background";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>My Baby</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Background />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
