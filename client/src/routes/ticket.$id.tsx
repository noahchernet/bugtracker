import { createFileRoute, Link } from "@tanstack/react-router";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { ArrowLeft, Bug, Calendar, Edit, MessageSquare, Moon, Sun, Trash, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/components/theme-provider";
import { useTicket, useDeleteTicket } from "@/lib/queries/tickets";
import { useComments } from "@/lib/queries/comments";
import { formatDate, getInitials, nameFromEmail } from "@/lib/utils";
import { NewCommentDialog } from "@/components/tickets/new-comment-dialog";
import { EditTicketDialog } from "@/components/tickets/edit-ticket-dialog";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ticket/$id")({
  component: TicketDetailPage,
});

function TicketDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: session, isPending: authLoading } = useSession();
  const isAuthenticated = !!session;
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Fetch ticket and comments - tickets are public, so always fetch them
  const { data: ticket, isLoading: ticketLoading } = useTicket(id);
  const { data: comments, isLoading: commentsLoading } = useComments(id, {
    enabled: !!ticket,
  });

  const deleteTicket = useDeleteTicket();

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await deleteTicket.mutateAsync(id);
      toast({ title: "Ticket deleted successfully" });
      navigate({ to: "/dashboard" });
    } catch {
      toast({
        title: "Failed to delete ticket",
        variant: "destructive",
      });
    }
  };

  const getSeverityBadge = (severity: number) => {
    switch (severity) {
      case 1:
        return <Badge variant="success">Low</Badge>;
      case 2:
        return <Badge variant="warning">Medium</Badge>;
      case 3:
        return <Badge variant="error">High</Badge>;
      case 4:
        return <Badge variant="critical">Critical</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (authLoading || ticketLoading) {
    return <TicketSkeleton />;
  }

  if (!ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Bug className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <CardTitle>Ticket Not Found</CardTitle>
            <CardDescription>The ticket you're looking for doesn't exist or has been deleted.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Button variant="ghost" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Ticket Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {getSeverityBadge(ticket.severity)}
            {ticket.solved ? <Badge variant="success">Solved</Badge> : <Badge variant="outline">Open</Badge>}
          </div>
          <h1 className="mb-4 text-3xl font-bold">{ticket.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={ticket.postedByUser?.picture} />
                <AvatarFallback className="text-xs">
                  {getInitials(ticket.postedByUser?.firstName || nameFromEmail(ticket.postedByUser?.email || ""))}
                </AvatarFallback>
              </Avatar>
              <span>{ticket.postedByUser?.firstName || nameFromEmail(ticket.postedByUser?.email || "Unknown")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            {ticket.due && (
              <div className="flex items-center gap-1">
                <span>Due: {formatDate(ticket.due)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Ticket Actions - only show when authenticated */}
        {isAuthenticated && (
          <div className="mb-6 flex gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        )}

        {/* Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{ticket.description}</p>
            {ticket.attachments && (
              <div className="mt-4">
                <img src={ticket.attachments} alt="Attachment" className="max-w-full rounded-lg border" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Comments ({comments?.length || 0})</h2>
          {isAuthenticated ? (
            <Button onClick={() => setCommentDialogOpen(true)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Add Comment
            </Button>
          ) : (
            <Button asChild>
              <Link to="/login">Sign in to comment</Link>
            </Button>
          )}
        </div>

        {commentsLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment._id} className={comment.solutionToTicket ? "border-severity-low" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.postedByUser?.picture} />
                        <AvatarFallback>
                          {getInitials(comment.postedByUser?.firstName || nameFromEmail(comment.postedByUser?.email || ""))}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {comment.postedByUser?.firstName || nameFromEmail(comment.postedByUser?.email || "Unknown")}
                        </p>
                        <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
                      </div>
                    </div>
                    {comment.solutionToTicket && <Badge variant="success">Solution</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{comment.description}</p>
                  {comment.attachments && (
                    <div className="mt-4">
                      <img src={comment.attachments} alt="Comment attachment" className="max-w-full rounded-lg border" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No comments yet</h3>
              <p className="mb-4 text-center text-muted-foreground">Be the first to add a comment</p>
              {isAuthenticated ? (
                <Button onClick={() => setCommentDialogOpen(true)}>Add Comment</Button>
              ) : (
                <Button asChild>
                  <Link to="/login">Sign in to comment</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      {/* Dialogs */}
      <NewCommentDialog ticketId={id} open={commentDialogOpen} onOpenChange={setCommentDialogOpen} />
      <EditTicketDialog ticket={ticket} open={editDialogOpen} onOpenChange={setEditDialogOpen} />
    </div>
  );
}

function TicketSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-4">
          <Skeleton className="h-9 w-24" />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Skeleton className="mb-4 h-6 w-32" />
          <Skeleton className="mb-4 h-10 w-3/4" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
