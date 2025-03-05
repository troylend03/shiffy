
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  MessageSquare, 
  UserPlus, 
  Clock, 
  ClipboardCheck, 
  Briefcase,
  Bell
} from "lucide-react";

export type ActivityType = 
  | "shift_created" 
  | "shift_assigned" 
  | "team_joined" 
  | "message_sent" 
  | "time_off_approved" 
  | "company_updated"
  | "announcement";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface ActivityItemProps {
  activity: ActivityItem;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case "shift_created":
      case "shift_assigned":
        return <Calendar className="h-4 w-4" />;
      case "team_joined":
        return <UserPlus className="h-4 w-4" />;
      case "message_sent":
        return <MessageSquare className="h-4 w-4" />;
      case "time_off_approved":
        return <Clock className="h-4 w-4" />;
      case "company_updated":
        return <Briefcase className="h-4 w-4" />;
      case "announcement":
        return <Bell className="h-4 w-4" />;
      default:
        return <ClipboardCheck className="h-4 w-4" />;
    }
  };

  const getIconColor = () => {
    switch (activity.type) {
      case "shift_created":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "shift_assigned":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "team_joined":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "message_sent":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "time_off_approved":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "company_updated":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
      case "announcement":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="flex items-start space-x-4 py-3">
      <div className={cn("rounded-full p-2 flex-shrink-0", getIconColor())}>
        {getIcon()}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{activity.title}</p>
          <span className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
      </div>
    </div>
  );
};
