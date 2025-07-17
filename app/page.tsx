import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Please log in</p>;

  return (
    <main>
      <h1>Welcome {session.user?.name}</h1>
      <Link href="/upload">Upload a file</Link>
    </main>
  );
}