import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFeedbackSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertFeedback } from "@shared/schema";

const STAKEHOLDER_NAMES = ["Ab", "Chris", "Jodi", "Kristi", "Rob", "Scaz", "Other"];

const FEATURE_OPTIONS = [
  "Dashboard",
  "Party Paths",
  "Combat Tracker",
  "Issues Tracker",
  "Design",
];

interface FeedbackDetailPageProps {
  preselectedFeature?: string;
}

export default function FeedbackDetailPage({ preselectedFeature }: FeedbackDetailPageProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertFeedback>({
    resolver: zodResolver(insertFeedbackSchema),
    defaultValues: {
      name: "",
      feature: preselectedFeature || "",
      comments: "",
    },
  });

  const createFeedbackMutation = useMutation({
    mutationFn: async (data: InsertFeedback) => {
      return await apiRequest<InsertFeedback>("/api/feedback", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
      setLocation("/feedback");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertFeedback) => {
    createFeedbackMutation.mutate(data);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/feedback")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Feedback</h1>
          <p className="text-muted-foreground">Share your thoughts and suggestions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-name">
                          <SelectValue placeholder="Select your name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STAKEHOLDER_NAMES.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-feature">
                          <SelectValue placeholder="Select a feature" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FEATURE_OPTIONS.map((feature) => (
                          <SelectItem key={feature} value={feature}>
                            {feature}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your feedback, suggestions, or concerns..."
                        className="min-h-32"
                        data-testid="input-comments"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/feedback")}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createFeedbackMutation.isPending}
                  data-testid="button-submit"
                >
                  {createFeedbackMutation.isPending ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
