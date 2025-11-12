import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plus } from "lucide-react";

const PARTIES = ["Arden", "Clairia", "P'Loa", "Uri-Kesh", "Doloron", "Sythwan", "Noctara", "Keer", "Waylon", "Elsewhich", "Glendeep"];
const JOBS = ["Keeper", "Traveler", "Seeker", "Ranger", "Maker", "Caster", "Other"];
const TYPES = ["Medical", "Opportunity!", "General"];
const PRIORITIES = ["Low", "High"];
const STATUSES = ["Monitoring", "Fixing", "Hopefully fixed"];

interface IssueLoggerProps {
  onSubmit?: (issue: any) => void;
}

export default function IssueLogger({ onSubmit }: IssueLoggerProps) {
  const [formData, setFormData] = useState({
    party: "",
    job: "",
    type: "",
    priority: "Low",
    status: "Monitoring",
    situation: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Issue logged:", formData);
    onSubmit?.({
      ...formData,
      timestamp: new Date(),
      id: Math.random().toString(36).substr(2, 9)
    });
    setFormData({
      party: "",
      job: "",
      type: "",
      priority: "Low",
      status: "Monitoring",
      situation: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Log New Issue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="party">Party</Label>
              <Select value={formData.party} onValueChange={(value) => setFormData({ ...formData, party: value })}>
                <SelectTrigger id="party" data-testid="select-party">
                  <SelectValue placeholder="Select party" />
                </SelectTrigger>
                <SelectContent>
                  {PARTIES.map(party => (
                    <SelectItem key={party} value={party}>{party}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job">Job/Role</Label>
              <Select value={formData.job} onValueChange={(value) => setFormData({ ...formData, job: value })}>
                <SelectTrigger id="job" data-testid="select-job">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {JOBS.map(job => (
                    <SelectItem key={job} value={job}>{job}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="type" data-testid="select-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger id="priority" data-testid="select-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map(priority => (
                    <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger id="status" data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="situation">Situation / Notes</Label>
            <Textarea
              id="situation"
              placeholder="Describe the situation, include staff initials and any relevant details..."
              value={formData.situation}
              onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
              className="min-h-32"
              data-testid="textarea-situation"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setFormData({
                party: "",
                job: "",
                type: "",
                priority: "Low",
                status: "Monitoring",
                situation: ""
              })}
              data-testid="button-clear"
            >
              Clear
            </Button>
            <Button type="submit" data-testid="button-submit-issue">
              Log Issue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
