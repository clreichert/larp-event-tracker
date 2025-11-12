import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Search } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export interface Issue {
  id: string;
  party: string;
  job: string;
  type: string;
  priority: "Low" | "High";
  status: "Monitoring" | "Fixing" | "Hopefully fixed";
  situation: string;
  timestamp: Date;
}

interface IssuesTableProps {
  issues: Issue[];
  onEdit?: (issue: Issue) => void;
}

export default function IssuesTable({ issues, onEdit }: IssuesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterParty, setFilterParty] = useState<string>("all");

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.situation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.job.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;
    const matchesParty = filterParty === "all" || issue.party === filterParty;

    return matchesSearch && matchesStatus && matchesParty;
  });

  const parties = Array.from(new Set(issues.map(i => i.party))).sort();

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
                <TableHead>Time</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Situation</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No issues found
                  </TableCell>
                </TableRow>
              ) : (
                filteredIssues.map((issue) => (
                  <TableRow key={issue.id} className="hover-elevate" data-testid={`row-issue-${issue.id}`}>
                    <TableCell className="whitespace-nowrap text-sm">
                      {format(issue.timestamp, 'EEE h:mm a')}
                    </TableCell>
                    <TableCell className="font-medium">{issue.party}</TableCell>
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
                      <p className="text-sm text-muted-foreground line-clamp-2">{issue.situation}</p>
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
