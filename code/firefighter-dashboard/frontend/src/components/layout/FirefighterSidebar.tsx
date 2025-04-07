
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ClipboardCheck, 
  FileText, 
  Hammer, 
  ShieldCheck, 
  User,
  LogOut
} from "lucide-react";
import {
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const FirefighterSidebar = () => {
  const location = useLocation();
  const [firefighter] = useState({
    name: "John Smith",
    badgeId: "FF-2023-1234"
  });
  
  const navigationItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Log Incident", path: "/log-incident", icon: ClipboardCheck },
    { name: "View Incidents", path: "/incidents", icon: FileText },
    { name: "Drill Reports", path: "/drill-report", icon: Hammer },
    { name: "Equipment Check", path: "/equipment-check", icon: ShieldCheck },
    { name: "My Profile", path: "/profile", icon: User },
  ];

  return (
    <>
      <SidebarHeader className="flex flex-col items-start px-4 py-3 bg-red-50">
        <h1 className="text-xl font-bold text-red-600">
          AIFA Dashboard
        </h1>
        <div className="flex flex-col mt-2">
          <span className="text-sm font-medium">{firefighter.name}</span>
          <span className="text-xs text-sidebar-foreground/70">{firefighter.badgeId}</span>
        </div>
      </SidebarHeader>
      
      <SidebarSeparator className="bg-red-200" />
      
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.path}
                  tooltip={item.name}
                  className="text-gray-700 hover:bg-red-50"
                >
                  <Link to={item.path} className={location.pathname === item.path ? "text-red-600" : ""}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SidebarFooter className="mt-auto">
        <SidebarSeparator className="bg-red-200" />
        <div className="p-4">
          <Button 
            variant="outline" 
            className="w-full justify-start text-sidebar-foreground border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={() => window.location.reload()}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
};

export default FirefighterSidebar;
