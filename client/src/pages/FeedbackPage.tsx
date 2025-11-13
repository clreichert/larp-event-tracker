import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ArrowUpDown } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Feedback } from "@shared/schema";

type SortField = 'name' | 'timestamp' | 'feature' | 'status';
type SortDirection = 'asc' | 'desc';

export default function FeedbackPage() {
  const [, setLocation] = useLocation();
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const { data: feedbackItems = [], isLoading } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/feedback/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
    },
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedFeedback = [...feedbackItems].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'timestamp':
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        break;
      case 'feature':
        comparison = a.feature.localeCompare(b.feature);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Feedback</h1>
          <p className="text-muted-foreground">Stakeholder feedback and feature requests</p>
        </div>
        <Button 
          onClick={() => setLocation("/feedback/new")}
          data-testid="button-add-feedback"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Feedback
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Log</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading feedback...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32"><SortButton field="name" label="Name" /></TableHead>
                    <TableHead className="w-44">Date</TableHead>
                    <TableHead className="w-40"><SortButton field="feature" label="Feature" /></TableHead>
                    <TableHead className="w-40"><SortButton field="status" label="Status" /></TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedFeedback.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No feedback yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedFeedback.map((item) => (
                      <TableRow 
                        key={item.id} 
                        className="hover-elevate"
                        data-testid={`row-feedback-${item.id}`}
                      >
                        <TableCell className="font-medium" data-testid={`text-name-${item.id}`}>
                          {item.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm" data-testid={`text-date-${item.id}`}>
                          {format(new Date(item.timestamp), 'MMM d, yyyy h:mm a')}
                        </TableCell>
                        <TableCell data-testid={`text-feature-${item.id}`}>
                          {item.feature}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.status}
                            onValueChange={(value) => updateStatusMutation.mutate({ id: item.id, status: value })}
                            disabled={updateStatusMutation.isPending}
                          >
                            <SelectTrigger className="w-36" data-testid={`select-status-${item.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Reviewed">Reviewed</SelectItem>
                              <SelectItem value="Accepted">Accepted</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="min-w-96">
                          <p className="text-sm whitespace-pre-wrap" data-testid={`text-comments-${item.id}`}>
                            {item.comments}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
