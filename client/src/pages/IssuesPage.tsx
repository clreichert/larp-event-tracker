import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import IssueLogger from "@/components/IssueLogger";
import IssuesTable from "@/components/IssuesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Issue, InsertIssue } from "@shared/schema";

export default function IssuesPage() {
  const { data: issues = [], isLoading } = useQuery<Issue[]>({
    queryKey: ["/api/issues"],
  });

  const createIssueMutation = useMutation({
    mutationFn: async (newIssue: InsertIssue) => {
      const response = await apiRequest("POST", "/api/issues", newIssue);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/issues"] });
    },
  });

  const handleLogIssue = (newIssue: InsertIssue) => {
    createIssueMutation.mutate(newIssue);
  };

  const handleEditIssue = (issue: Issue) => {
    console.log("Open issue detail page:", issue);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-issues">Issues Tracker</h1>
        <p className="text-muted-foreground">Log and manage participant issues during the event</p>
      </div>

      <Tabs defaultValue="view" className="space-y-6">
        <TabsList>
          <TabsTrigger value="view" data-testid="tab-view-issues">View Issues</TabsTrigger>
          <TabsTrigger value="log" data-testid="tab-log-issue">Log New Issue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view" className="space-y-6">
          <IssuesTable issues={issues} onEdit={handleEditIssue} />
        </TabsContent>
        
        <TabsContent value="log" className="space-y-6">
          <IssueLogger onSubmit={handleLogIssue} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
