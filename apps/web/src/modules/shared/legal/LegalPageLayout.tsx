type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  prevVersion?: string;
  children: React.ReactNode;
};

export function LegalPageLayout({
  title,
  lastUpdated,
  prevVersion,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="flex flex-col items-center bg-surface-base w-full">
      <div className="px-4 sm:px-8 py-20 lg:py-24 w-full">
        <div className="flex flex-col gap-10 mx-auto w-full max-w-[780px]">
          <header className="flex flex-col gap-2">
            <h1 className="text-heading-h3 text-text-strong-1000">{title}</h1>

            {prevVersion ? (
              <>
                <p className="text-body-sm-regular text-text-soft-500">
                  {lastUpdated}
                </p>
                <p className="text-body-sm-regular text-text-soft-500">
                  {prevVersion}
                </p>
              </>
            ) : (
              <p className="text-body-sm-regular text-text-soft-500">
                {lastUpdated}
              </p>
            )}
          </header>

          <section className="flex flex-col gap-6">{children}</section>
        </div>
      </div>
    </main>
  );
}
