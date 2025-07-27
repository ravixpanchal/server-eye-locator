import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServerCard } from "@/components/ServerCard";
import { mockServers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

export default function Servers() {
  const onlineServers = mockServers.filter(server => server.status === 'online');
  const offlineServers = mockServers.filter(server => server.status === 'offline');
  const warningServers = mockServers.filter(server => server.status === 'warning');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Server Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all your servers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Server
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Online Servers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-success">{onlineServers.length}</div>
              <Badge variant="secondary" className="bg-success/20 text-success">Active</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warning Servers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-warning">{warningServers.length}</div>
              <Badge variant="secondary" className="bg-warning/20 text-warning">Warning</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Offline Servers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-destructive">{offlineServers.length}</div>
              <Badge variant="secondary" className="bg-destructive/20 text-destructive">Offline</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockServers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  );
}