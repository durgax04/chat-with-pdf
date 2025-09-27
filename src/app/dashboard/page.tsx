import AllChats from "@/components/AllChats";
import Dashboard from "@/components/Dashboard";
import { getUserSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 bg-gradient-to-br from-[#1e293b] via-[#000000] to-[#020617] text-white">
      <Dashboard session={session} />

      <div className="w-full max-w-5xl mt-8 flex-1">
        <AllChats />
      </div>
    </div>
  );
};

export default page;
