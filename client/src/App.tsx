import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { FeedbackButton } from "@/components/FeedbackButton";
import Dashboard from "@/pages/Dashboard";
import IssuesPage from "@/pages/IssuesPage";
import PartyPathsPage from "@/pages/PartyPathsPage";
import CombatPage from "@/pages/CombatPage";
import CombatDetailPage from "@/pages/CombatDetailPage";
import PartyDetailPage from "@/pages/PartyDetailPage";
import ColorPreview from "@/pages/ColorPreview";
import FeedbackPage from "@/pages/FeedbackPage";
import FeedbackDetailPage from "@/pages/FeedbackDetailPage";
import AdminSeedPage from "@/pages/AdminSeedPage";
import DesignPrototypePage from "@/pages/DesignPrototypePage";
import NotFound from "@/pages/not-found";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/issues" component={IssuesPage} />
      <Route path="/party-paths" component={PartyPathsPage} />
      <Route path="/combat" component={CombatPage} />
      <Route path="/combat/:combatId" component={CombatDetailPage} />
      <Route path="/party/:partyName" component={PartyDetailPage} />
      <Route path="/colors" component={ColorPreview} />
      <Route path="/feedback" component={FeedbackPage} />
      <Route path="/feedback/new" component={FeedbackDetailPage} />
      <Route path="/admin/seed" component={AdminSeedPage} />
      <Route path="/design/prototype" component={DesignPrototypePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const isAdmin = true;

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar isAdmin={isAdmin} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between px-6 py-4 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex items-center gap-2">
                  <FeedbackButton />
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1 overflow-auto">
                <div className="container max-w-7xl mx-auto px-6 py-8">
                  <Router />
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
