import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Provider from "./provider";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "kuzo",
  description: "Messaging app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
