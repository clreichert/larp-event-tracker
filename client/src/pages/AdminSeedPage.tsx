import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Database, CheckCircle, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await apiRequest("POST", "/api/admin/seed");
      const data = await response.json() as { success: boolean; message: string };
      setResult({ success: true, message: data.message });
    } catch (error) {
      setResult({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to seed database" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Admin Database Seeding</h1>
        <p className="text-muted-foreground">
          Populate your production database with sample event data
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Seed Database
          </CardTitle>
          <CardDescription>
            This will populate your database with:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>11 Parties (Arden, Clairia, P'Loa, Uri-Kesh, Doloron, Sythwan, Noctara, Keer, Waylon, Elsewhich, Glendeep)</li>
            <li>Party path encounters for Arden and Clairia</li>
            <li>7 Combat encounters (Shadow Beast Pack, Bandit Ambush, River Guardian, etc.)</li>
            <li>77 Combat check-in records (all party/combat combinations)</li>
            <li>5 Sample issues</li>
          </ul>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> Running this will add data to your database. If you've already seeded, 
              this may create duplicate entries.
            </AlertDescription>
          </Alert>

          <Button 
            onClick={handleSeed} 
            disabled={loading}
            size="lg"
            className="w-full"
            data-testid="button-seed-database"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding Database...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Seed Database Now
              </>
            )}
          </Button>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"} data-testid="alert-seed-result">
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {result.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>After seeding your production database:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Visit your published app to verify the data appears correctly</li>
            <li>Check the Dashboard to see party summaries</li>
            <li>Test the Issues Tracker, Party Paths, and Combat Tracker</li>
            <li>You can safely navigate away from this page once seeding is complete</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
