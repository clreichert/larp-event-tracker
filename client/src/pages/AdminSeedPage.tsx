import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Database, CheckCircle, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false);
  const [clearFirst, setClearFirst] = useState(true);
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    if (!secret.trim()) {
      setResult({
        success: false,
        message: "Admin secret is required"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await apiRequest("POST", "/api/admin/seed", { clearFirst, secret });
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

          <div className="space-y-2">
            <Label htmlFor="secret">Admin Secret</Label>
            <Input
              id="secret"
              type="password"
              placeholder="Enter ADMIN_SEED_SECRET value"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              data-testid="input-admin-secret"
            />
            <p className="text-xs text-muted-foreground">
              This must match the ADMIN_SEED_SECRET environment variable
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="clearFirst" 
              checked={clearFirst}
              onCheckedChange={(checked) => setClearFirst(checked as boolean)}
              data-testid="checkbox-clear-first"
            />
            <Label htmlFor="clearFirst" className="text-sm cursor-pointer">
              Clear all existing data before seeding (recommended)
            </Label>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {clearFirst ? (
                <><strong>Warning:</strong> This will delete ALL existing data (parties, encounters, issues, feedback) and replace it with sample data.</>
              ) : (
                <><strong>Warning:</strong> Running without clearing first may create duplicate entries if data already exists.</>
              )}
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
          <CardTitle>Security & Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-medium mb-2">For Production Database Seeding:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2 text-muted-foreground">
              <li>Set environment variables:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li><code className="bg-muted px-1 rounded">ALLOW_ADMIN_SEEDING=true</code></li>
                  <li><code className="bg-muted px-1 rounded">ADMIN_SEED_SECRET=your-random-secret</code> (generate a strong random value)</li>
                </ul>
              </li>
              <li>Visit your published app and navigate to /admin/seed</li>
              <li>Enter the same secret value you set in ADMIN_SEED_SECRET</li>
              <li>Click "Seed Database Now" to populate with sample data</li>
              <li>After seeding, <strong>immediately remove both environment variables</strong> for security</li>
            </ol>
          </div>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Security:</strong> This endpoint is protected by both an environment variable and a secret key. 
              Both ALLOW_ADMIN_SEEDING=true and a matching secret are required.
            </AlertDescription>
          </Alert>

          <div>
            <p className="font-medium mb-2">After Seeding:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
              <li>Verify the data appears correctly in your published app</li>
              <li>Check the Dashboard, Issues Tracker, Party Paths, and Combat Tracker</li>
              <li>Remove both ALLOW_ADMIN_SEEDING and ADMIN_SEED_SECRET environment variables</li>
              <li>Consider removing this /admin/seed route from the app if no longer needed</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
