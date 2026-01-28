import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getInitials, nameFromEmail } from "@/lib/utils";
import { SeverityBadge } from "@/components/tickets/severity-badge";

interface TicketCardProps {
  ticket: {
    _id: string;
    title: string;
    description: string;
    severity: number;
    solved: boolean;
    createdAt: string;
    comments: unknown[];
    postedByUser?: {
      picture?: string;
      firstName?: string;
      email?: string;
    };
  };
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Link to="/ticket/$id" params={{ id: ticket._id }}>
      <Card className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg">{ticket.title}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={ticket.postedByUser?.picture} />
                  <AvatarFallback className="text-xs">
                    {getInitials(ticket.postedByUser?.firstName || nameFromEmail(ticket.postedByUser?.email || ""))}
                  </AvatarFallback>
                </Avatar>
                <span>{ticket.postedByUser?.firstName || nameFromEmail(ticket.postedByUser?.email || "Unknown")}</span>
                <span className="text-muted-foreground">·</span>
                <span>{formatDate(ticket.createdAt)}</span>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <SeverityBadge severity={ticket.severity} />
              {ticket.solved ? <Badge variant="success">Solved</Badge> : <Badge variant="outline">Open</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{ticket.description}</p>
          {ticket.comments.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {ticket.comments.length} comment
              {ticket.comments.length !== 1 ? "s" : ""}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
