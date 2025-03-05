
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  ArrowDownRight, 
  Check, 
  X, 
  Clock, 
  Info
} from "lucide-react";

// Types for our schedule data
export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  hours: number;
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
  days: string[];
  teamMembers: TeamMember[];
  shifts: Shift[];
  onShiftClick: (shift: Shift) => void;
  onAddShift: (employeeId: string, day: string) => void;
}

export const ScheduleGrid = ({
  days,
  teamMembers,
  shifts,
  onShiftClick,
  onAddShift,
}: ScheduleGridProps) => {
  // Helper function to get shifts for a specific employee and day
  const getShiftsForEmployeeAndDay = (employeeId: string, day: string) => {
    return shifts.filter(
      (shift) => shift.employeeId === employeeId && shift.day === day
    );
  };

  // Helper function to render status badges
  const renderStatusBadge = (status?: ShiftStatus) => {
    if (!status) return null;
    
    const statusMap = {
      approved: { icon: Check, className: "status-approved" },
      denied: { icon: X, className: "status-denied" },
      pending: { icon: Clock, className: "status-pending" },
      posted: { icon: Info, className: "status-posted" },
      "called-off": { icon: ArrowDownRight, className: "status-called-off" },
    };
    
    const StatusIcon = statusMap[status.type].icon;
    
    return (
      <div className={cn("absolute top-1 right-1", statusMap[status.type].className)}>
        <StatusIcon size={12} className="mr-1" />
        <span>{status.label}</span>
      </div>
    );
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
      {teamMembers.map((employee) => (
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
                {employee.hours}h
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
                        "shift-card-hoverable relative mb-2 last:mb-0",
                        shift.status?.type === "called-off" && "opacity-60",
                        shift.conflict && "border-red-300 dark:border-red-700"
                      )}
                      onClick={() => onShiftClick(shift)}
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
                    onClick={() => onAddShift(employee.id, day)}
                  >
                    <span className="sr-only">Add shift</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
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
