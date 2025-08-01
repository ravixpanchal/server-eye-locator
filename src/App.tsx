import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import Analytics from "./pages/Analytics";
import Servers from "./pages/Servers";
import Security from "./pages/Security";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="server-tracker-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <header className="h-14 flex items-center justify-between border-b border-border px-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="mr-4" />
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success pulse-online" />
                      <span className="text-sm text-muted-foreground">Live monitoring active</span>
                    </div>
                  </div>
                  <ThemeToggle />
                </header>
              <main className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/servers" element={<Servers />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
