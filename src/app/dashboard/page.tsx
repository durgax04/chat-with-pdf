import { ChatList } from "@/components/Dashboard/Chat-list";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { UploadCard } from "@/components/Dashboard/Upload";
import { getUserSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userImage={session.image} />

      <main className="max-w-5xl mx-auto px-6 pt-18 space-y-6">
        {/* Upload Section */}
        <section className="flex justify-center">
          <UploadCard />
        </section>

        {/* Chat List Section */}
        <section className="space-y-6">
          <ChatList />
        </section>
      </main>
    </div>
  );
};

export default Page;


{/* <div className="min-h-screen w-full flex flex-col items-center p-6 bg-gradient-to-br from-[#1e293b] via-[#000000] to-[#020617] text-white">
      <Dashboard session={session} />

      <div className="w-full max-w-5xl mt-8 flex-1">
        <AllChats />
      </div>
    </div> */}