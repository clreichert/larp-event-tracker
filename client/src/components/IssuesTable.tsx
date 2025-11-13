import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Search, FileText, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { getPartyColor } from "@/lib/partyColors";

export interface Issue {
  id: string;
  party: string;
  job: string;
  type: string;
  priority: "Low" | "High";
  status: "Monitoring" | "Fixing" | "Hopefully fixed";
  situation: string;
  timestamp: Date;
  hasDetails?: boolean;
}

interface IssuesTableProps {
  issues: Issue[];
  onEdit?: (issue: Issue) => void;
}

type SortField = 'timestamp' | 'party' | 'job' | 'priority' | 'status' | 'type';
type SortDirection = 'asc' | 'desc';

export default function IssuesTable({ issues, onEdit }: IssuesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterParty, setFilterParty] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.situation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.job.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;
    const matchesParty = filterParty === "all" || issue.party === filterParty;

    return matchesSearch && matchesStatus && matchesParty;
  });

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'timestamp':
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        comparison = dateA.getTime() - dateB.getTime();
        break;
      case 'party':
        comparison = a.party.localeCompare(b.party);
        break;
      case 'job':
        comparison = a.job.localeCompare(b.job);
        break;
      case 'priority':
        comparison = a.priority === 'High' ? -1 : 1;
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const parties = Array.from(new Set(issues.map(i => i.party))).sort();

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-foreground"
      data-testid={`sort-${field}`}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>Issues Log</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-issues"
              />
            </div>
            <Select value={filterParty} onValueChange={setFilterParty}>
              <SelectTrigger className="w-40" data-testid="select-filter-party">
                <SelectValue placeholder="All Parties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parties</SelectItem>
                {parties.map(party => (
                  <SelectItem key={party} value={party}>{party}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40" data-testid="select-filter-status">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Fixing">Fixing</SelectItem>
                <SelectItem value="Hopefully fixed">Hopefully fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><SortButton field="timestamp" label="Time" /></TableHead>
                <TableHead><SortButton field="party" label="Party" /></TableHead>
                <TableHead><SortButton field="job" label="Job" /></TableHead>
                <TableHead><SortButton field="priority" label="Priority" /></TableHead>
                <TableHead><SortButton field="status" label="Status" /></TableHead>
                <TableHead><SortButton field="type" label="Type" /></TableHead>
                <TableHead>Situation</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedIssues.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No issues found
                  </TableCell>
                </TableRow>
              ) : (
                sortedIssues.map((issue) => {
                  const colors = getPartyColor(issue.party);
                  const rowClassName = `hover-elevate ${
                    issue.priority === 'High' ? 'bg-destructive/10 dark:bg-destructive/5' : ''
                  } ${
                    issue.status === 'Hopefully fixed' ? 'opacity-50' : ''
                  }`;
                  
                  return (
                    <TableRow key={issue.id} className={rowClassName} data-testid={`row-issue-${issue.id}`}>
                      <TableCell className="whitespace-nowrap text-sm">
                        {format(issue.timestamp, 'EEE h:mm a')}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Badge className={`${colors.bg} ${colors.text} border ${colors.border}`}>
                          {issue.party}
                        </Badge>
                      </TableCell>
                      <TableCell>{issue.job}</TableCell>
                      <TableCell>
                        <Badge variant={issue.priority === "High" ? "destructive" : "secondary"}>
                          {issue.priority}
                        </Badge>
                      </TableCell>
                    <TableCell>
                      <Badge variant={
                        issue.status === "Hopefully fixed" ? "default" :
                        issue.status === "Fixing" ? "secondary" : "outline"
                      }>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={issue.type === "Medical" ? "destructive" : issue.type === "Opportunity!" ? "default" : "secondary"}>
                        {issue.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="flex items-center gap-2">
                        {issue.hasDetails && (
                          <FileText className="h-4 w-4 text-primary shrink-0" data-testid={`icon-has-details-${issue.id}`} />
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-2">{issue.situation}</p>
                      </div>
                    </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit?.(issue)}
                          data-testid={`button-edit-${issue.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
