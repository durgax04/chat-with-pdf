"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import Form from "./Form";
import { Session } from "next-auth";

interface DashboardProps {
  session: Session
}

const Dashboard = ({ session }: DashboardProps) => {
  const [signingOut, setSigningOut] = useState<boolean>(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#000000] to-[#020617] text-white px-6 py-10">
      <div className="flex flex-col justify-center items-center max-w-5xl mx-auto space-y-10">
        <div className="flex justify-center gap-10 items-center border-b border-white/20 pb-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome, {session.user.name ?? "Guest"}
          </h1>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-4 py-2 text-white font-medium rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {signingOut && <Loader2 className="h-5 w-5 animate-spin"/>}
            {signingOut ? "Signing out..." : <LogOut className="h-4 w-4"/>}
          </button>
        </div>

        <section className="bg-white/2 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Upload PDF</h2>
          <Form />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
