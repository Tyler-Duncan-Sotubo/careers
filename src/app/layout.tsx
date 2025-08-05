import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/common/NavBar";
import { BookmarkProvider } from "@/context/BookmarkContext";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CentaHR Career",
  description:
    "Explore job opportunities and advance your career with CentaHR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased bg-white`}>
        <NavBar />
        <ReactQueryProvider>
          <BookmarkProvider>
            <main className="pt-20">{children}</main>
            <Toaster />
          </BookmarkProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
