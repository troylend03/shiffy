
import React from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "sonner";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto animate-fade-in">
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
      <Toaster position="top-right" closeButton />
    </div>
  );
};
