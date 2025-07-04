import MobileNav from "@/components/dashboard/mobile-nav";
import DashboardNav from "@/components/dashboard/nav";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { AuthButton } from "@/components/auth/auth-button";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
     <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
          <MobileNav/>
            <Link href="/">
            <h1 className="text-lg font-bold">AI Image Generator</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <AuthButton />
          </div>
        </div>
     </header>
     {/* dashboard*/}
     <div className="container md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* sidebar*/}
        <aside className="fixed md:sticky hidden top-16 z-30 md:block border-r h-[calc(100vh-4.1rem)]">
            <div className="py-6 px-2 lg:py-8">
              <DashboardNav/>
            </div>
        </aside>
        {/* main contents*/}
     <main className="flex w-full flex-col overflow-hidden p-4">
      {children}
     </main>
     </div>
     <Toaster />
    </div>
  );
}
