import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Next.js App!</h1>
      <p>This is the home page.</p>
      <Link href={'/login'}>Login</Link>
    </div>
  );
}
