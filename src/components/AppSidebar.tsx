import { NavLink, useLocation } from "react-router-dom";
import { 
  Activity, 
  MapPin, 
  BarChart3, 
  Settings, 
  Download,
  Server,
  Shield,
  Wifi
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Activity },
  { title: "Server Map", url: "/map", icon: MapPin },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Servers", url: "/servers", icon: Server },
  { title: "Security", url: "/security", icon: Shield },
  { title: "Reports", url: "/reports", icon: Download },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Wifi className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">ServerEye</h2>
                <p className="text-xs text-sidebar-foreground/60">Location Tracker</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 px-4 py-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
              <div className="h-2 w-2 rounded-full bg-success pulse-online"></div>
              <span>All systems operational</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}