import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
     <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center h-16 px-4">
            <Link href="/">
            <h1 className="text-lg font-bold">AI Image Generator</h1>
            </Link>
          
        </div>
     </header>
     {/* dashboard*/}
     <div className="container md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* sidebar*/}
        <aside>
            <div>Dashboard Navigation</div>
        </aside>
        {/* main contents*/}
     <main>
      {children}
     </main>
     </div>
    </div>
  );
}
