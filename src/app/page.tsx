import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/Navbar";
import Steps from "@/components/LandingPage/Steps";
import { getUserSession } from "@/lib/auth/session";

export default async function Home() {

  const session = await getUserSession();

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar session={session}/>
        <Hero session={session}/>
        <Steps />
        <Footer />
      </div>
    </>
  );
}

// return (
//     <div className="flex h-screen justify-center items-center">
//       <h1>Welcone to my Chat app.</h1>
//       <Link
//         href="/api/auth/signin"
//         className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md"
//       >
//         Sign in with Google
//       </Link>
//     </div>
//   );
