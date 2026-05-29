import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { TransactionProvider } from "@/context/TransactionContext";

import { NotificationProvider } from "@/context/NotificationContext";

export const metadata = {
  title: "SpendSense",
  description: "Smart Finance Tracker",
};

import { UserProvider } from "@/context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ThemeProvider>
            <TransactionProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </TransactionProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
