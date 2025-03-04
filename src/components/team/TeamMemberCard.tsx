
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MoreVertical, 
  MessageSquare 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeamMemberCardProps {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  email: string;
  phone: string;
  weeklyHours: number;
  status?: "active" | "inactive" | "pending";
  onMessageClick: (id: string) => void;
  onScheduleClick: (id: string) => void;
}

export const TeamMemberCard = ({
  id,
  name,
  avatar,
  position,
  email,
  phone,
  weeklyHours,
  status = "active",
  onMessageClick,
  onScheduleClick,
}: TeamMemberCardProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              {avatar ? (
                <img src={avatar} alt={name} />
              ) : (
                <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{position}</p>
              <Badge className={`mt-2 ${statusColors[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={18} />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onMessageClick(id)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onScheduleClick(id)}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>View Schedule</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Send Email</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center text-sm">
            <Mail className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-800 dark:text-gray-200">{email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-800 dark:text-gray-200">{phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-800 dark:text-gray-200">{weeklyHours} hours weekly</span>
          </div>
        </div>
      </div>
      
      <div className="flex border-t border-gray-200 dark:border-gray-700 divide-x divide-gray-200 dark:divide-gray-700">
        <Button 
          variant="ghost" 
          className="flex-1 rounded-none h-12 text-shiftly-blue hover:text-shiftly-blue/80 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => onMessageClick(id)}
        >
          <MessageSquare size={16} className="mr-2" />
          Message
        </Button>
        <Button 
          variant="ghost" 
          className="flex-1 rounded-none h-12 text-shiftly-blue hover:text-shiftly-blue/80 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => onScheduleClick(id)}
        >
          <Calendar size={16} className="mr-2" />
          Schedule
        </Button>
      </div>
    </div>
  );
};
