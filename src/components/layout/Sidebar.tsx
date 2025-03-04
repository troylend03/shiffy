
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Home,
  ClipboardList,
  BarChart
} from "lucide-react";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navigationItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Schedule", icon: Calendar, path: "/schedule" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Reports", icon: BarChart, path: "/reports" },
    { name: "Requests", icon: ClipboardList, path: "/requests" },
  ];
  
  return (
    <aside 
      className={cn(
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 relative flex flex-col h-screen",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
          <div className="bg-shiftly-blue rounded-lg h-8 w-8 flex items-center justify-center">
            <span className="text-white font-medium">S</span>
          </div>
          {!collapsed && <span className="font-semibold text-lg">Shiftly</span>}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("p-1 h-6 w-6", collapsed && "absolute -right-3 top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-sm")} 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                  location.pathname === item.path && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium",
                  collapsed && "justify-center"
                )}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link 
          to="/settings" 
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            location.pathname === "/settings" && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium",
            collapsed && "justify-center"
          )}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
};
