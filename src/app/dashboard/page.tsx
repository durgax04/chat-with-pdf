import { ChatList } from "@/components/Dashboard/ChatList";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { UsageStatsBanner } from "@/components/Dashboard/UsageStatsBanner";
import { UploadCard } from "@/components/upload/UploadCard";
import { getUserSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      <DashboardHeader userImage={session.image} />

      {/* Added pt-28 to push it down below the navigation bar */}
      <main className="max-w-4xl mx-auto px-6 pt-28 space-y-3">
        {/* Usage Stats Banner */}
        <UsageStatsBanner />

        {/* Upload Section */}
        <section className="flex justify-center">
          <UploadCard />
        </section>

        {/* Chat List Section */}
        <section className="space-y-4">
          <ChatList />
        </section>
      </main>
    </div>
  );
};

export default Page;