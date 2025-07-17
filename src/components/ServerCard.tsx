import { Server, Globe, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServerCardProps {
  server: {
    id: string;
    name: string;
    ip: string;
    location: string;
    status: 'online' | 'offline' | 'warning';
    uptime: string;
    responseTime: number;
    lastChecked: string;
  };
}

export function ServerCard({ server }: ServerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'offline': return 'status-offline';
      case 'warning': return 'status-warning';
      default: return 'bg-muted';
    }
  };

  const getStatusPulse = (status: string) => {
    switch (status) {
      case 'online': return 'pulse-online';
      case 'offline': return 'pulse-offline';
      default: return '';
    }
  };

  return (
    <Card className="card-glow hover:shadow-primary transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Server className="h-4 w-4 text-primary" />
            {server.name}
          </CardTitle>
          <Badge className={`${getStatusColor(server.status)} ${getStatusPulse(server.status)} text-xs px-2 py-1`}>
            {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-3 w-3" />
            <span className="font-mono">{server.ip}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">📍</span>
            <span>{server.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <div className="text-xs">
              <div className="text-muted-foreground">Uptime</div>
              <div className="font-medium text-foreground">{server.uptime}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-muted-foreground" />
            <div className="text-xs">
              <div className="text-muted-foreground">Response</div>
              <div className="font-medium text-foreground">{server.responseTime}ms</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground pt-1">
          Last checked: {server.lastChecked}
        </div>
      </CardContent>
    </Card>
  );
}