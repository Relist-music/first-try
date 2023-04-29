import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Relist</title>
        <meta name="description" content="Relist is a music client" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-xl">Welcome to Relist</h1>
        <Link href="/login">
          <button className="px-3 py-1 rounded-lg bg-gray-300">
            Go to login
          </button>
        </Link>
      </main>
    </>
  );
}
