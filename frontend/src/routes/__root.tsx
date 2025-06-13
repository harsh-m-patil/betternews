import Header from "@/components/site-header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="text-foreground flex min-h-screen flex-col bg-[#f5f5ed]">
        <Header />
        <main className="container mx-auto grow p-4">
          <Outlet />
        </main>
        <footer className="p-4 text-center">
          <p className="text-muted-foreground text-sm">BetterNews &copy;</p>
        </footer>
      </div>
      <ReactQueryDevtools />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
