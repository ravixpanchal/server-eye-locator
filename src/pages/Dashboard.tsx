import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServerCard } from "@/components/ServerCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { 
  Activity, 
  Server, 
  Zap, 
  Globe, 
  AlertTriangle, 
  Download,
  RefreshCw,
  TrendingUp,
  Shield
} from "lucide-react";
import { mockServers, performanceData, alertsData, statsData } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

export default function Dashboard() {
  const [servers, setServers] = useState(mockServers);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setServers(prev => prev.map(server => ({
        ...server,
        responseTime: server.status === 'online' 
          ? Math.floor(Math.random() * 50) + 20 
          : server.responseTime,
        lastChecked: new Date().toLocaleTimeString()
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setServers(prev => prev.map(server => ({
      ...server,
      lastChecked: new Date().toLocaleTimeString()
    })));
    
    setIsRefreshing(false);
    toast({
      title: "Data Refreshed",
      description: "Server status updated successfully",
    });
  };

  const exportToExcel = () => {
    const exportData = servers.map(server => ({
      'Server Name': server.name,
      'IP Address': server.ip,
      'Location': server.location,
      'Status': server.status,
      'Uptime': server.uptime,
      'Response Time (ms)': server.responseTime,
      'Last Checked': server.lastChecked
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Server Status');
    
    // Add alerts sheet
    const alertsExportData = alertsData.map(alert => ({
      'Server': alert.server,
      'Type': alert.type,
      'Message': alert.message,
      'IP Address': alert.ip,
      'Location': alert.location,
      'Timestamp': alert.timestamp
    }));
    
    const ws2 = XLSX.utils.json_to_sheet(alertsExportData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Alerts');

    XLSX.writeFile(wb, `server-report-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Report Exported",
      description: "Excel file downloaded successfully",
    });
  };

  const onlineServers = servers.filter(s => s.status === 'online').length;
  const offlineServers = servers.filter(s => s.status === 'offline').length;
  const avgResponseTime = Math.round(
    servers.filter(s => s.status === 'online')
           .reduce((acc, s) => acc + s.responseTime, 0) / onlineServers
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Server Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and location tracking</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            onClick={exportToExcel}
            className="btn-primary"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
            <Server className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{servers.length}</div>
            <p className="text-xs text-muted-foreground">Across {new Set(servers.map(s => s.location.split(',')[1])).size} regions</p>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Servers</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{onlineServers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((onlineServers/servers.length) * 100)}% operational
            </p>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Zap className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">Across online servers</p>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-error" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-error">{offlineServers}</div>
            <p className="text-xs text-muted-foreground">Servers need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-error" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertsData.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'error' ? 'bg-error' : 
                  alert.type === 'warning' ? 'bg-warning' : 'bg-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{alert.server}</span>
                    <Badge variant="outline" className="text-xs">
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.ip} • {alert.location} • {alert.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <PerformanceChart 
        data={performanceData} 
        title="24 Hour Performance Overview"
      />

      {/* Server Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Server Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </div>
    </div>
  );
}