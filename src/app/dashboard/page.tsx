import Dashboard from "@/components/Dashboard";
import { getUserSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const page = async () => {

    const session = await getUserSession();

    if (!session) {
        redirect("/");
    }

  return (
    <div>
      <Dashboard session={session} />
    </div>
  );
};

export default page;
