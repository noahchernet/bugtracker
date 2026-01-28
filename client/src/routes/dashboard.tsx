import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTickets } from "@/lib/queries/tickets";
import { NewTicketDialog } from "@/components/tickets/new-ticket-dialog";
import { DashboardHeader, TicketFilters, TicketCard, EmptyTickets, DashboardSkeleton } from "@/components/dashboard";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: session, isPending: authLoading } = useSession();
  const isAuthenticated = !!session;
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [solvedFilter, setSolvedFilter] = useState<string>("all");
  const [newTicketOpen, setNewTicketOpen] = useState(false);

  // Fetch tickets - public access, no auth required
  const { data: tickets, isLoading: ticketsLoading } = useTickets({
    title: searchQuery || undefined,
    severity: severityFilter !== "all" ? parseInt(severityFilter) : undefined,
    solved: solvedFilter !== "all" ? solvedFilter === "true" : undefined,
  });

  if (authLoading) {
    return <DashboardSkeleton />;
  }

  const hasFilters = !!(searchQuery || severityFilter !== "all" || solvedFilter !== "all");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage and track your bug tickets</p>
          </div>
          {isAuthenticated ? (
            <Button onClick={() => setNewTicketOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          ) : (
            <Button asChild>
              <Link to="/login">Sign in to create ticket</Link>
            </Button>
          )}
        </div>

        <TicketFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          severityFilter={severityFilter}
          onSeverityChange={setSeverityFilter}
          solvedFilter={solvedFilter}
          onSolvedChange={setSolvedFilter}
        />

        {/* Tickets List */}
        {ticketsLoading ? (
          <TicketListSkeleton />
        ) : tickets && tickets.length > 0 ? (
          <div className="flex flex-col gap-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <EmptyTickets
            isAuthenticated={isAuthenticated}
            hasFilters={hasFilters}
            onCreateTicket={() => setNewTicketOpen(true)}
          />
        )}
      </main>

      {/* New Ticket Dialog */}
      <NewTicketDialog open={newTicketOpen} onOpenChange={setNewTicketOpen} />
    </div>
  );
}

function TicketListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
