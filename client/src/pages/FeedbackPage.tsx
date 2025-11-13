import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { format } from "date-fns";
import type { Feedback } from "@shared/schema";

export default function FeedbackPage() {
  const [, setLocation] = useLocation();
  
  const { data: feedbackItems = [], isLoading } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
  });

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
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Feature</TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No feedback yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    feedbackItems.map((item) => (
                      <TableRow 
                        key={item.id} 
                        className="hover-elevate"
                        data-testid={`row-feedback-${item.id}`}
                      >
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm">
                          {format(new Date(item.timestamp), 'MMM d, yyyy h:mm a')}
                        </TableCell>
                        <TableCell>{item.feature}</TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm text-muted-foreground line-clamp-2">
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
