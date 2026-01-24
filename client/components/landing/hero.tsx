import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bug, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Modern bug tracking for modern teams</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Track bugs,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">ship faster</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            Avalon Bugtracker helps teams identify, discuss, and resolve issues efficiently. Collaborate in real-time, track
            progress, and deliver quality software.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={() => loginWithRedirect()}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#features">Learn More</a>
                </Button>
              </>
            )}
          </div>

          {/* Hero illustration */}
          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
            </div>
            <div className="relative mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-2xl">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Bug className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Dashboard Overview</h3>
                  <p className="text-sm text-muted-foreground">Track all your tickets in one place</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { title: "Login button not working", severity: "high", status: "Open" },
                  { title: "Update user profile UI", severity: "medium", status: "In Progress" },
                  { title: "Add dark mode support", severity: "low", status: "Resolved" },
                ].map((ticket, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">{ticket.title}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          ticket.severity === "high"
                            ? "bg-severity-high/20 text-severity-high"
                            : ticket.severity === "medium"
                              ? "bg-severity-medium/20 text-severity-medium"
                              : "bg-severity-low/20 text-severity-low"
                        }`}
                      >
                        {ticket.severity}
                      </span>
                      <span className="text-xs text-muted-foreground">{ticket.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
