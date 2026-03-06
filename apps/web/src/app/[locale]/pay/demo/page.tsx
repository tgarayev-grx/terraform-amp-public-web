import { BookDemoSection } from "./BookADemo";

export default async function PayDemoPage(_: PageProps<"/[locale]/pay/demo">) {
  return (
    <main className="flex flex-col justify-center">
      <BookDemoSection />
    </main>
  );
}
