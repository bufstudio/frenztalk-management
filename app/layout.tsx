"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StudentsProvider from "@/lib/context/collection/studentsContext";
import TutorsProvider from "@/lib/context/collection/tutorContext";
import InvoicesProvider from "@/lib/context/collection/invoiceContext";
import StudentProvider from "@/lib/context/page/studentContext";
import { AuthContextProvider } from "../lib/context/AuthContext";
import ProtectedRoute from "@/lib/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <StudentsProvider>
            <TutorsProvider>
              <InvoicesProvider>
                <StudentProvider>
                  <div className="flex">
                    {/* <Sidebar /> */}
                    <main className="flex-1">{children}</main>
                  </div>
                </StudentProvider>
              </InvoicesProvider>
            </TutorsProvider>
          </StudentsProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
