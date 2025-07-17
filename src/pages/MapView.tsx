import { ServerMap } from "@/components/ServerMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Server } from "lucide-react";
import { mockServers } from "@/data/mockData";

export default function MapView() {
  const onlineCount = mockServers.filter(s => s.status === 'online').length;
  const offlineCount = mockServers.filter(s => s.status === 'offline').length;
  const warningCount = mockServers.filter(s => s.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Global Server Map</h1>
        <p className="text-muted-foreground">Interactive map showing real-time server locations and status</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Servers</CardTitle>
            <div className="h-3 w-3 rounded-full bg-success pulse-online" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{onlineCount}</div>
            <p className="text-xs text-muted-foreground">Operational worldwide</p>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Status</CardTitle>
            <div className="h-3 w-3 rounded-full bg-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{warningCount}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline Servers</CardTitle>
            <div className="h-3 w-3 rounded-full bg-error pulse-offline" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-error">{offlineCount}</div>
            <p className="text-xs text-muted-foreground">Connection failed</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <ServerMap servers={mockServers} />

      {/* Server List */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Server Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockServers.map((server) => (
              <div key={server.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    server.status === 'online' ? 'bg-success pulse-online' : 
                    server.status === 'offline' ? 'bg-error pulse-offline' : 'bg-warning'
                  }`} />
                  <div>
                    <div className="font-medium">{server.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {server.location}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={
                    server.status === 'online' ? 'status-online' : 
                    server.status === 'offline' ? 'status-offline' : 'status-warning'
                  }>
                    {server.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">
                    {server.ip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}