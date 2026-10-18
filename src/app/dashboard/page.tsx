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