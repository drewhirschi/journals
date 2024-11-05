import { AppSidebar } from "@/components/app-sidebar";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const sb = await createClient()
    const user = sb.auth.getUser()
    return <div>
        <SidebarProvider>
            <AppSidebar user={user} />
            <main className="min-h-screen flex flex-col items-center w-full">
                <div className="flex-1 w-full flex flex-col  items-center">
                    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                            <SidebarTrigger />
                            {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
                        </div>
                    </nav>
                    <div className="flex flex-col gap-20 max-w-5xl p-5">
                        {children}
                    </div>

                    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                        <p>
                            Powered by{" "}
                            <a
                                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                target="_blank"
                                className="font-bold hover:underline"
                                rel="noreferrer"
                            >
                                Supabase
                            </a>
                        </p>
                        <ThemeSwitcher />
                    </footer>
                </div>
            </main>
        </SidebarProvider>
    </div>;
}


