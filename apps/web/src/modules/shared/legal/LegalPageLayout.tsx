type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full px-4 sm:px-8 py-20 lg:py-24">
        <div className="flex flex-col gap-10 w-full max-w-[780px] mx-auto">
          <header className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl leading-10 text-neutral-1000">
              {title}
            </h1>
            <p className="text-xs text-neutral-500 leading-4">{lastUpdated}</p>
          </header>

          <section className="flex flex-col gap-6">{children}</section>
        </div>
      </div>
    </main>
  );
}
