import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-14 flex items-center border-b border-border px-4">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success pulse-online" />
                  <span className="text-sm text-muted-foreground">Live monitoring active</span>
                </div>
              </header>
              <main className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/analytics" element={<Dashboard />} />
                  <Route path="/servers" element={<Dashboard />} />
                  <Route path="/security" element={<Dashboard />} />
                  <Route path="/reports" element={<Dashboard />} />
                  <Route path="/settings" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
