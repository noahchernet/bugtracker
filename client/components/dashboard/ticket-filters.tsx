import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TicketFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  severityFilter: string;
  onSeverityChange: (value: string) => void;
  solvedFilter: string;
  onSolvedChange: (value: string) => void;
}

export function TicketFilters({
  searchQuery,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  solvedFilter,
  onSolvedChange,
}: TicketFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={severityFilter} onValueChange={onSeverityChange}>
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
      <Select value={solvedFilter} onValueChange={onSolvedChange}>
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
  );
}
