/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthTokenProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Avalon Bugtracker" },
      {
        name: "description",
        content: "Track and manage bugs efficiently with Avalon Bugtracker",
      },
    ],
    links: [
      { rel: "stylesheet", href: "/styles.css" },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        children: `
          (function() {
            const theme = localStorage.getItem('theme') || 
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', theme === 'dark');
          })();
        `,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN || ""}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ""}
          authorizationParams={{
            redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
            audience: import.meta.env.VITE_AUTH0_AUDIENCE || "",
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <AuthTokenProvider>{children}</AuthTokenProvider>
              <Toaster />
            </ThemeProvider>
          </QueryClientProvider>
        </Auth0Provider>
        <Scripts />
      </body>
    </html>
  );
}
