import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface IssueBadgeProp {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "yellow" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: IssueBadgeProp) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
