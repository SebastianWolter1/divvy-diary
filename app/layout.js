import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PriceAlarms - DivviyDiary",
  description:
    "Set alarms to get noticed when a stock reaches a certain price.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
