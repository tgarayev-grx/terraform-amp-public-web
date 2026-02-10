import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";

export default function Home(_: PageProps<"/[locale]">) {
  return (
    <main className="flex flex-col justify-center items-center p-24 min-h-screen">
      <div className="z-10 w-full max-w-5xl text-center">
        <h1 className="mb-8 font-bold text-4xl">Golden Ratio Exchange</h1>
        <p className="mb-8 text-neutral-600 text-lg">Coming soon</p>
        <Link
          href="/pay"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white transition-colors"
        >
          Go to Pay
        </Link>
      </div>
    </main>
  );
}
