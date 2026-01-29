import { Badge } from "@/components/ui/badge";

interface SeverityBadgeProps {
  severity: number;
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
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
}
