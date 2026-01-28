import { Bug, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  const showSocial = import.meta.env.VITE_UPWORK !== "true";

  useGSAP(
    () => {
      // Set initial states
      const elementsToAnimate = [brandRef.current, linksRef.current];
      if (showSocial && socialRef.current) {
        elementsToAnimate.push(socialRef.current);
      }
      gsap.set(elementsToAnimate, {
        opacity: 0,
        y: 30,
      });
      gsap.set(copyrightRef.current, { opacity: 0 });

      // Create a timeline for footer sections
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      // Brand section fades up
      tl.to(brandRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      });

      // Links section fades up
      tl.to(
        linksRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4",
      );

      // Social section fades up (only if visible)
      if (showSocial && socialRef.current) {
        tl.to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4",
        );

        // Social icons stagger animation
        tl.from(
          ".social-icon",
          {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
      }

      // Copyright fades in
      tl.to(
        copyrightRef.current,
        {
          opacity: 1,
          duration: 0.5,
        },
        "-=0.2",
      );

      // Links list items stagger
      tl.from(
        ".footer-link",
        {
          opacity: 0,
          x: -10,
          stagger: 0.08,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.6",
      );
    },
    { scope: footerRef, dependencies: [showSocial] },
  );

  return (
    <footer ref={footerRef} className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div ref={brandRef} className="md:col-span-2 will-change-transform">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Bug className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Avalon Bugtracker</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A modern bug tracking solution for teams who want to ship quality software faster.
            </p>
          </div>

          {/* Quick Links */}
          <div ref={linksRef} className="will-change-transform">
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="footer-link hover:text-foreground transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <a href="#features" className="footer-link hover:text-foreground transition-colors inline-block">
                  Features
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link hover:text-foreground transition-colors inline-block">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social - hidden when VITE_UPWORK is true */}
          {showSocial && (
            <div ref={socialRef} className="will-change-transform">
              <h3 className="mb-4 font-semibold">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/noahchernet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/noahchernet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/noah-chernet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div ref={copyrightRef} className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Avalon Bugtracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
