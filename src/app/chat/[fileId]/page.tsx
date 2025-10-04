import Chat from "@/components/Chat";
import ChatInterface from "@/components/Chat/ChatInterface";

export default async function ChatPage(props: {
  params: Promise<{ fileId: string }>;
}) {
  const { fileId } = await props.params;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="h-screen flex flex-col lg:flex-row">
        {/* PDF Viewer Section */}
        <div className="bg-gray-800 h-[50vh] lg:h-screen lg:w-1/2 p-4 lg:p-6">
          {/* <PDFViewer pdfUrl={pdfUrl} onPdfUpload={handlePdfUpload} /> */}
        </div>

        {/* Chat Section */}
        <div className="h-[50vh] lg:h-screen lg:w-1/2 p-4 lg:p-6">
          <ChatInterface fileId={fileId}/>
        </div>
      </div>
    </div>
  );
}

    // <div>
    //   <main className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#000000] to-[#020617] text-white px-6 py-10">
    //     <div className="flex flex-col justify-center items-center max-w-5xl mx-auto space-y-10">
    //       <div className="flex justify-center gap-10 items-center border-b border-white/20 pb-4">
    //         <Chat fileId={fileId} />
    //       </div>
    //     </div>
    //   </main>
    // </div>