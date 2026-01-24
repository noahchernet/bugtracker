import { Bug, MessageSquare, CheckCircle, Users, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    description: "Enterprise-grade security with Auth0 authentication to protect your data.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to track bugs</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to help your team identify, discuss, and resolve issues efficiently.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
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
