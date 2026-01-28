import { createFileRoute } from "@tanstack/react-router";
import { useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";
import { Plus, Search, Filter, Bug, LogOut, Moon, Sun, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/components/theme-provider";
import { useTickets } from "@/lib/queries/tickets";
import { formatDate, getInitials, nameFromEmail } from "@/lib/utils";
import { NewTicketDialog } from "@/components/tickets/new-ticket-dialog";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: session, isPending: authLoading } = useSession();
  const user = session?.user;
  const isAuthenticated = !!session;
  const { theme, setTheme, resolvedTheme } = useTheme();
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

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  if (authLoading) {
    return <DashboardSkeleton />;
  }

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Bug className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Avalon</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image || undefined} alt={user?.name} />
                      <AvatarFallback>{getInitials(user?.name || user?.email || "U")}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

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

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="1">Low</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">High</SelectItem>
              <SelectItem value="4">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={solvedFilter} onValueChange={setSolvedFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="false">Open</SelectItem>
              <SelectItem value="true">Solved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets List */}
        {ticketsLoading ? (
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
        ) : tickets && tickets.length > 0 ? (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <Link key={ticket._id} to={`/ticket/${ticket._id}`}>
                <Card className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{ticket.title}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={ticket.postedByUser?.picture} />
                            <AvatarFallback className="text-xs">
                              {getInitials(
                                ticket.postedByUser?.firstName || nameFromEmail(ticket.postedByUser?.email || ""),
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {ticket.postedByUser?.firstName || nameFromEmail(ticket.postedByUser?.email || "Unknown")}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span>{formatDate(ticket.createdAt)}</span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(ticket.severity)}
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
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bug className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No tickets found</h3>
              <p className="mb-4 text-center text-muted-foreground">
                {searchQuery || severityFilter !== "all" || solvedFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first ticket to get started"}
              </p>
              {!searchQuery &&
                severityFilter === "all" &&
                solvedFilter === "all" &&
                (isAuthenticated ? (
                  <Button onClick={() => setNewTicketOpen(true)}>
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
        )}
      </main>

      {/* New Ticket Dialog */}
      <NewTicketDialog open={newTicketOpen} onOpenChange={setNewTicketOpen} />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
