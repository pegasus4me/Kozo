import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Provider from "./provider";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";
export const metadata = {
  title: "kuzo",
  description: "Messaging app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="public/assets/flav.svg" sizes="32x32"/>
      </Head>
      <Provider>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
