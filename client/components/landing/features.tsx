import { Bug, MessageSquare, CheckCircle, Users, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    icon: Bug,
    title: "Create Tickets",
    description: "Easily create and categorize bug reports with severity levels, due dates, and file attachments.",
  },
  {
    icon: MessageSquare,
    title: "Discuss & Collaborate",
    description: "Add comments, share insights, and work together with your team to understand and solve issues.",
  },
  {
    icon: CheckCircle,
    title: "Track Progress",
    description: "Mark tickets as solved, track solutions, and maintain a clear history of resolved issues.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with your team. See who reported issues and who's working on solutions.",
  },
  {
    icon: Zap,
    title: "Fast & Responsive",
    description: "Built with modern technologies for a lightning-fast experience on any device.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Enterprise-grade security with Better Auth authentication to protect your data.",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Section header animation on scroll
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the header text elements
      gsap.from(".features-header-title", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".features-header-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Feature cards batch animation using ScrollTrigger.batch for performance
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");

      // Set initial state
      gsap.set(cards, { opacity: 0, y: 50 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });

          // Animate icons with scale bounce effect
          batch.forEach((card, index) => {
            const icon = card.querySelector(".feature-icon");
            if (icon) {
              gsap.fromTo(
                icon,
                { scale: 0, rotation: -10 },
                {
                  scale: 1,
                  rotation: 0,
                  duration: 0.5,
                  delay: index * 0.1 + 0.2,
                  ease: "back.out(1.7)",
                },
              );
            }
          });
        },
        start: "top 85%",
        once: true,
      });

      // SVG icon draw effect for each card (subtle pulse on hover simulation via scroll)
      cards.forEach((card) => {
        const iconWrapper = card.querySelector(".feature-icon-wrapper");
        if (iconWrapper) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(iconWrapper, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
              });
            },
          });
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <h2 className="features-header-title text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to track bugs
          </h2>
          <p className="features-header-subtitle mt-4 text-lg text-muted-foreground">
            Powerful features designed to help your team identify, discuss, and resolve issues efficiently.
          </p>
        </div>

        {/* Features grid */}
        <div ref={cardsContainerRef} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <div className="feature-icon-wrapper mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="feature-icon h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
