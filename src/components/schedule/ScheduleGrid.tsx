
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { 
  AlertCircle, 
  ArrowDownRight, 
  Check, 
  X, 
  Clock, 
  Info,
  Plus
} from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

// Types for our schedule data
export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  hours: number;
  position?: string;
}

export interface ShiftStatus {
  type: "approved" | "denied" | "pending" | "posted" | "called-off";
  label: string;
}

export interface Shift {
  id: string;
  employeeId: string;
  day: string;
  startTime: string;
  endTime: string;
  position: string;
  duration: string;
  status?: ShiftStatus;
  note?: string;
  covering?: {
    for: string;
    by: string;
  };
  conflict?: boolean;
}

interface ScheduleGridProps {
  days?: string[];
  teamMembers?: TeamMember[];
  shifts?: Shift[];
  onShiftClick?: (shift: Shift) => void;
  onAddShift?: (employeeId: string, day: string) => void;
  startDate?: Date; // Add this for compatibility with Schedule.tsx
  viewType?: "week" | "day"; // Add this for compatibility with Schedule.tsx
  onCreateShift?: () => void; // Add this for compatibility with Schedule.tsx
}

export const ScheduleGrid = ({
  days: propDays,
  teamMembers = [],
  shifts = [],
  onShiftClick,
  onAddShift,
  startDate,
  viewType = "week",
  onCreateShift,
}: ScheduleGridProps) => {
  // Generate days array if not provided
  const days = propDays || (() => {
    if (!startDate) return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    const weekStart = viewType === "week" 
      ? startOfWeek(startDate, { weekStartsOn: 1 }) 
      : startDate;
    
    return Array.from({ length: viewType === "week" ? 7 : 1 }, (_, i) => {
      const day = addDays(weekStart, i);
      return format(day, "EEE");
    });
  })();

  // Mock data for demo if teamMembers are empty
  const displayTeamMembers = teamMembers.length > 0 ? teamMembers : [
    { id: "1", name: "John Doe", hours: 40, position: "Cashier" },
    { id: "2", name: "Jane Smith", hours: 32, position: "Manager" },
    { id: "3", name: "Mike Johnson", hours: 24, position: "Stocker" }
  ];

  // Mock data for demo if shifts are empty - with proper typing for ShiftStatus
  const mockShifts: Shift[] = [
    { 
      id: "shift1", 
      employeeId: "1", 
      day: "Mon", 
      startTime: "09:00", 
      endTime: "17:00", 
      position: "Cashier", 
      duration: "8h",
      status: { type: "approved", label: "Approved" } 
    },
    { 
      id: "shift2", 
      employeeId: "2", 
      day: "Mon", 
      startTime: "12:00", 
      endTime: "20:00", 
      position: "Manager", 
      duration: "8h",
      status: { type: "pending", label: "Pending" } 
    },
    { 
      id: "shift3", 
      employeeId: "3", 
      day: "Tue", 
      startTime: "10:00", 
      endTime: "18:00", 
      position: "Stocker", 
      duration: "8h",
      status: { type: "posted", label: "Open" },
      conflict: true
    }
  ];

  // Use provided shifts or mock shifts
  const displayShifts = shifts.length > 0 ? shifts : mockShifts;

  // Helper function to get shifts for a specific employee and day
  const getShiftsForEmployeeAndDay = (employeeId: string, day: string) => {
    return displayShifts.filter(
      (shift) => shift.employeeId === employeeId && shift.day === day
    );
  };

  // Helper function to render status badges
  const renderStatusBadge = (status?: ShiftStatus) => {
    if (!status) return null;
    
    const statusMap = {
      approved: { icon: Check, className: "text-green-600 dark:text-green-400" },
      denied: { icon: X, className: "text-red-600 dark:text-red-400" },
      pending: { icon: Clock, className: "text-yellow-600 dark:text-yellow-400" },
      posted: { icon: Info, className: "text-blue-600 dark:text-blue-400" },
      "called-off": { icon: ArrowDownRight, className: "text-gray-600 dark:text-gray-400" },
    };
    
    const StatusIcon = statusMap[status.type].icon;
    
    return (
      <div className={cn("absolute top-1 right-1 flex items-center text-xs", statusMap[status.type].className)}>
        <StatusIcon size={12} className="mr-1" />
        <span>{status.label}</span>
      </div>
    );
  };

  const handleShiftClick = (shift: Shift) => {
    if (onShiftClick) {
      onShiftClick(shift);
    } else if (onCreateShift) {
      onCreateShift();
    }
  };

  const handleAddShift = (employeeId: string, day: string) => {
    if (onAddShift) {
      onAddShift(employeeId, day);
    } else if (onCreateShift) {
      onCreateShift();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header row with days */}
      <div className="grid grid-cols-[200px_repeat(7,1fr)] bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-800">
          Team Members
        </div>
        {days.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-800 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Employee rows */}
      {displayTeamMembers.map((employee) => (
        <div
          key={employee.id}
          className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-gray-200 dark:border-gray-800 last:border-b-0"
        >
          {/* Employee info cell */}
          <div className="p-3 flex items-center space-x-3 border-r border-gray-200 dark:border-gray-800">
            <Avatar className="h-8 w-8">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.name} />
              ) : (
                <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {employee.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {employee.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {employee.position} • {employee.hours}h
              </div>
            </div>
          </div>

          {/* Shift cells for each day */}
          {days.map((day) => {
            const dayShifts = getShiftsForEmployeeAndDay(employee.id, day);
            
            return (
              <div
                key={`${employee.id}-${day}`}
                className="p-2 border-r border-gray-200 dark:border-gray-800 last:border-r-0 relative min-h-[80px]"
              >
                {dayShifts.length > 0 ? (
                  dayShifts.map((shift) => (
                    <div
                      key={shift.id}
                      className={cn(
                        "relative mb-2 last:mb-0 p-2 rounded-md border cursor-pointer hover:shadow-sm transition-all",
                        shift.status?.type === "called-off" && "opacity-60",
                        shift.conflict ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20" : 
                          shift.status?.type === "approved" ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10" :
                          shift.status?.type === "pending" ? "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10" :
                          shift.status?.type === "posted" ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10" :
                          "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                      )}
                      onClick={() => handleShiftClick(shift)}
                    >
                      {renderStatusBadge(shift.status)}
                      
                      <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {shift.startTime} - {shift.endTime}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {shift.position} • {shift.duration}
                      </div>
                      
                      {shift.conflict && (
                        <div className="absolute bottom-1 right-1 text-red-500">
                          <AlertCircle size={14} />
                        </div>
                      )}
                      
                      {shift.covering && (
                        <div className="mt-1 text-[10px] bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-gray-600 dark:text-gray-300 inline-block">
                          Covering for {shift.covering.for}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <button
                    className="w-full h-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                    onClick={() => handleAddShift(employee.id, day)}
                  >
                    <span className="sr-only">Add shift</span>
                    <Plus size={20} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
