import Chat from "@/components/Chat";

export default async function ChatPage(props: {
  params: Promise<{ fileId: string }>;
}) {
  const { fileId } = await props.params;

  return (
    <div>
      <main className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#000000] to-[#020617] text-white px-6 py-10">
        <div className="flex flex-col justify-center items-center max-w-5xl mx-auto space-y-10">
          <div className="flex justify-center gap-10 items-center border-b border-white/20 pb-4">
            <Chat fileId={fileId} />
          </div>
        </div>
      </main>
    </div>
  );
}
