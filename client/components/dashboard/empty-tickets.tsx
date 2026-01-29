import { Link } from "@tanstack/react-router";
import { Bug, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyTicketsProps {
  isAuthenticated: boolean;
  hasFilters: boolean;
  onCreateTicket: () => void;
}

export function EmptyTickets({ isAuthenticated, hasFilters, onCreateTicket }: EmptyTicketsProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Bug className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">No tickets found</h3>
        <p className="mb-4 text-center text-muted-foreground">
          {hasFilters ? "Try adjusting your filters" : "Create your first ticket to get started"}
        </p>
        {!hasFilters &&
          (isAuthenticated ? (
            <Button onClick={onCreateTicket}>
              <Plus className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          ) : (
            <Button asChild>
              <Link to="/login">Sign in to create ticket</Link>
            </Button>
          ))}
      </CardContent>
    </Card>
  );
}
