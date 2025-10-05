import ChatPageClient from "@/components/Chat/ChatPageClient";
import { getUserSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await getUserSession();
  if (!session) {
    redirect("/");
  }

  const userImage = session.user?.image;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ChatPageClient />
    </div>
  );
}
