import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/header/header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <ToastContainer
      />


      <main className="text-white flex min-h-screen flex-col items-center pt-16 bg-gradient-to-b">

        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
