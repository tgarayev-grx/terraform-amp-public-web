import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">
          Golden Ratio Exchange
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Coming soon
        </p>
        <Link
          href="/pay"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Pay
        </Link>
      </div>
    </main>
  );
}
