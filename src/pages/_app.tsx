import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { Nav } from "~/components/Nav";
import { PostFormProvider } from "~/context/PostForm.Context";
import "~/styles/globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PostFormProvider>
        <Nav />
        <main className="max-h-screen overflow-auto">
          <section className="mx-auto mb-20 flex max-w-screen-lg flex-row flex-wrap gap-4 rounded-md  p-2">
            <ToastContainer />
            <Component {...pageProps} />
          </section>
        </main>
      </PostFormProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
