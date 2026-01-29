import { useSession } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bug, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const bgBlur1Ref = useRef<HTMLDivElement>(null);
  const bgBlur2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states for elements (invisible)
      gsap.set([badgeRef.current, headlineRef.current, subheadlineRef.current, buttonsRef.current, heroCardRef.current], {
        opacity: 0,
        y: 30,
      });

      // Background blur floating animation
      gsap.to(bgBlur1Ref.current, {
        y: 20,
        scale: 1.1,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(bgBlur2Ref.current, {
        y: -20,
        scale: 1.05,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Main entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      // Badge fades up
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      });

      // Headline reveals with clip-path effect
      tl.to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        "-=0.4",
      );

      // Animate the headline text elements separately for stagger effect
      tl.from(
        ".hero-headline-part",
        {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.6,
        },
        "-=0.6",
      );

      // Subheadline fades up
      tl.to(
        subheadlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.5",
      );

      // Buttons scale and fade in with stagger
      tl.to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.4",
      );

      tl.from(
        buttonsRef.current?.querySelectorAll("a, button") || [],
        {
          opacity: 0,
          scale: 0.9,
          stagger: 0.15,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );

      // Hero card slides up with spring effect
      tl.to(
        heroCardRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3",
      );

      // Stagger the ticket rows inside the hero card
      tl.from(
        ".hero-ticket-row",
        {
          opacity: 0,
          x: -20,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div
          ref={bgBlur1Ref}
          className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl will-change-transform"
        />
        <div
          ref={bgBlur2Ref}
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl will-change-transform"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm will-change-transform"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Modern bug tracking for modern teams</span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl will-change-transform"
          >
            <span className="hero-headline-part inline-block">Track bugs,</span>{" "}
            <span className="hero-headline-part inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ship faster
            </span>
          </h1>

          {/* Subheadline */}
          <p ref={subheadlineRef} className="mb-10 text-lg text-muted-foreground sm:text-xl will-change-transform">
            Avalon Bugtracker helps teams identify, discuss, and resolve issues efficiently. Collaborate in real-time, track
            progress, and deliver quality software.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row will-change-transform"
          >
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
              <div className="h-64 w-64 rounded-full bg-linear-to-br from-primary/20 to-primary/5 blur-2xl" />
            </div>
            <div
              ref={heroCardRef}
              className="relative mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-2xl will-change-transform"
            >
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Bug className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <h3 className="-ml-px font-semibold">Dashboard Overview</h3>
                  <p className="text-sm text-muted-foreground">Track all your tickets in one place</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  {
                    title: "Login button not working",
                    severity: "high",
                    status: "Open",
                  },
                  {
                    title: "Update user profile UI",
                    severity: "medium",
                    status: "In Progress",
                  },
                  {
                    title: "Add dark mode support",
                    severity: "low",
                    status: "Resolved",
                  },
                ].map((ticket, i) => (
                  <div key={i} className="hero-ticket-row flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">{ticket.title}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex w-16 justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          ticket.severity === "high"
                            ? "bg-severity-high/20 text-severity-high"
                            : ticket.severity === "medium"
                              ? "bg-severity-medium/20 text-severity-medium"
                              : "bg-severity-low/20 text-severity-low"
                        }`}
                      >
                        {ticket.severity}
                      </span>
                      <span className="w-[4.25rem] text-left text-xs text-muted-foreground">{ticket.status}</span>
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
