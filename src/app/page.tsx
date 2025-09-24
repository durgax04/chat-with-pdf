import { getUserSession } from "@/lib/auth/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getUserSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <h1>Welcone to my Chat app.</h1>
      <Link
        href="/api/auth/signin"
        className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md"
      >
        Sign in with Google
      </Link>
    </div>
  );
}
