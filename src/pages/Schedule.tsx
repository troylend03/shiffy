import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ScheduleHeader } from "@/components/schedule/ScheduleHeader";
import { ScheduleGrid, TeamMember, Shift, ShiftStatus } from "@/components/schedule/ScheduleGrid";
import { ShiftModal } from "@/components/schedule/ShiftModal";
import { CopyScheduleModal } from "@/components/schedule/CopyScheduleModal";
import { CreateScheduleModal } from "@/components/schedule/CreateScheduleModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDays, format, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Users, Clock, Calendar, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";

const Schedule = () => {
  // Schedule state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<"week" | "day">("week");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  
  // Mock team members
  const [teamMembers] = useState<TeamMember[]>([
    { id: "1", name: "John Doe", hours: 40, position: "Cashier", avatar: "/placeholder.svg" },
    { id: "2", name: "Jane Smith", hours: 32, position: "Manager", avatar: "/placeholder.svg" },
    { id: "3", name: "Mike Johnson", hours: 24, position: "Stocker", avatar: "/placeholder.svg" },
    { id: "4", name: "Sarah Wilson", hours: 20, position: "Server", avatar: "/placeholder.svg" },
    { id: "5", name: "Alex Brown", hours: 16, position: "Bartender", avatar: "/placeholder.svg" },
  ]);
  
  // Mock positions
  const [positions] = useState([
    { id: "1", name: "Cashier" },
    { id: "2", name: "Manager" },
    { id: "3", name: "Stocker" },
    { id: "4", name: "Server" },
    { id: "5", name: "Bartender" },
    { id: "6", name: "Host" },
    { id: "7", name: "Cook" },
  ]);
  
  // Mock shifts
  const [shifts, setShifts] = useState<Shift[]>([
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
    },
    { 
      id: "shift4", 
      employeeId: "4", 
      day: "Wed", 
      startTime: "11:00", 
      endTime: "19:00", 
      position: "Server", 
      duration: "8h",
      status: { type: "approved", label: "Approved" } 
    },
    { 
      id: "shift5", 
      employeeId: "5", 
      day: "Thu", 
      startTime: "16:00", 
      endTime: "00:00", 
      position: "Bartender", 
      duration: "8h",
      status: { type: "denied", label: "Denied" } 
    },
    { 
      id: "shift6", 
      employeeId: "1", 
      day: "Fri", 
      startTime: "09:00", 
      endTime: "17:00", 
      position: "Cashier", 
      duration: "8h",
      status: { type: "approved", label: "Approved" } 
    }
  ]);
  
  // Handle date range navigation
  const handleDateRangeChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentDate(prevDate => subWeeks(prevDate, 1));
    } else {
      setCurrentDate(prevDate => addWeeks(prevDate, 1));
    }
  };
  
  // Handle opening shift modal
  const handleShiftClick = (shift: Shift) => {
    setSelectedShift(shift);
    setIsShiftModalOpen(true);
  };
  
  // Handle creating a new shift
  const handleCreateShift = () => {
    setSelectedShift(null);
    setIsShiftModalOpen(true);
  };
  
  // Handle saving a shift
  const handleSaveShift = (shiftData: Partial<Shift>) => {
    if (selectedShift) {
      // Update existing shift
      setShifts(prevShifts => 
        prevShifts.map(shift => 
          shift.id === selectedShift.id 
            ? { ...shift, ...shiftData } 
            : shift
        )
      );
      toast.success("Shift updated successfully");
    } else {
      // Create a new shift
      const newShift: Shift = {
        id: `shift${Date.now()}`,
        employeeId: shiftData.employeeId || "",
        day: shiftData.day || "Mon",
        startTime: shiftData.startTime || "",
        endTime: shiftData.endTime || "",
        position: shiftData.position || "",
        duration: calculateDuration(shiftData.startTime, shiftData.endTime),
        status: { type: "pending", label: "Pending" },
        note: shiftData.note
      };
      
      setShifts(prevShifts => [...prevShifts, newShift]);
      toast.success("New shift created");
    }
    
    setIsShiftModalOpen(false);
  };
  
  // Handle copying a shift
  const handleCopyShift = (shiftData: Partial<Shift>, applyToWeek: boolean) => {
    if (applyToWeek) {
      // Copy to every day of the week
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const newShifts: Shift[] = days.map(day => ({
        id: `shift${Date.now()}-${day}`,
        employeeId: shiftData.employeeId || "",
        day,
        startTime: shiftData.startTime || "",
        endTime: shiftData.endTime || "",
        position: shiftData.position || "",
        duration: calculateDuration(shiftData.startTime, shiftData.endTime),
        status: { type: "pending", label: "Pending" },
        note: shiftData.note
      }));
      
      setShifts(prevShifts => [...prevShifts, ...newShifts]);
      toast.success("Shift copied to entire week");
    } else {
      // Copy to selected day
      const newShift: Shift = {
        id: `shift${Date.now()}`,
        employeeId: shiftData.employeeId || "",
        day: shiftData.day || "Mon",
        startTime: shiftData.startTime || "",
        endTime: shiftData.endTime || "",
        position: shiftData.position || "",
        duration: calculateDuration(shiftData.startTime, shiftData.endTime),
        status: { type: "pending", label: "Pending" },
        note: shiftData.note
      };
      
      setShifts(prevShifts => [...prevShifts, newShift]);
      toast.success("Shift copied");
    }
  };
  
  // Handle deleting a shift
  const handleDeleteShift = (shiftId: string) => {
    setShifts(prevShifts => prevShifts.filter(shift => shift.id !== shiftId));
    setIsShiftModalOpen(false);
    toast.success("Shift deleted");
  };
  
  // Handle copying a previous schedule
  const handleCopySchedule = (weekOffset: number) => {
    // In a real application, we would fetch the shifts from the previous week
    // For now, we'll just duplicate the current shifts with new IDs
    const newShifts = shifts.map(shift => ({
      ...shift,
      id: `shift${Date.now()}-${shift.id}`
    }));
    
    setShifts(prevShifts => [...prevShifts, ...newShifts]);
    setIsCopyModalOpen(false);
    toast.success("Previous schedule copied");
  };
  
  // Calculate duration between start and end time
  const calculateDuration = (startTime?: string, endTime?: string): string => {
    if (!startTime || !endTime) return "0h";
    
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    
    let hours = endHour - startHour;
    let minutes = endMinute - startMinute;
    
    if (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }
    
    if (hours < 0) {
      hours += 24; // Handle overnight shifts
    }
    
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };
  
  // Calculate date range for display
  const getDateRange = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    
    return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
  };
  
  // Count unpublished shifts
  const unpublishedCount = shifts.filter(s => s.status?.type === "pending").length;
  
  return (
    <AppLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Schedule</h1>
          <Button onClick={() => setCreateModalOpen(true)}>Create New Schedule</Button>
        </div>
        
        <Tabs defaultValue="schedule" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="openShifts">Open Shifts</TabsTrigger>
            <TabsTrigger value="timeOff">Time Off Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule">
            <ScheduleHeader 
              dateRange={getDateRange()}
              viewType={viewType}
              onDateRangeChange={handleDateRangeChange}
              onPublish={() => setShowPublishConfirm(true)}
              publishCount={unpublishedCount}
              activeFilter={showFilterOptions}
              onFilterClick={() => setShowFilterOptions(!showFilterOptions)}
              onCopyToWeek={() => toast.info("Copy to week feature clicked")}
              onCopyPrevious={() => setIsCopyModalOpen(true)}
            />
            
            {showFilterOptions && (
              <div className="flex flex-wrap gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Positions</h3>
                  <div className="flex flex-wrap gap-2">
                    {positions.slice(0, 5).map((pos) => (
                      <div key={pos.id} className="flex items-center space-x-2">
                        <Checkbox id={`position-${pos.id}`} />
                        <label htmlFor={`position-${pos.id}`} className="text-sm">{pos.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-pending" />
                      <label htmlFor="status-pending" className="text-sm">Pending</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-approved" defaultChecked />
                      <label htmlFor="status-approved" className="text-sm">Approved</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-conflict" />
                      <label htmlFor="status-conflict" className="text-sm">Conflicts</label>
                    </div>
                  </div>
                </div>
                
                <div className="ml-auto">
                  <Button variant="outline" size="sm" className="mr-2">Reset</Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            )}
            
            <ScheduleGrid
              teamMembers={teamMembers}
              shifts={shifts}
              startDate={currentDate}
              viewType={viewType}
              onShiftClick={handleShiftClick}
              onCreateShift={handleCreateShift}
            />
          </TabsContent>
          
          <TabsContent value="openShifts">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-medium mb-4">Available Open Shifts</h2>
                <div className="space-y-3">
                  {shifts.filter(s => s.status?.type === "posted").map((shift) => (
                    <div key={shift.id} className="flex justify-between items-center p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                            {shift.position}
                          </Badge>
                          <span className="text-sm font-medium">{shift.day}, {shift.startTime} - {shift.endTime}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {shift.duration} • No requests yet
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-auto mr-2">
                        Request
                      </Button>
                      <Button size="sm">Assign</Button>
                    </div>
                  ))}
                  
                  {shifts.filter(s => s.status?.type === "posted").length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>No open shifts available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeOff">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-medium mb-4">Time Off Requests</h2>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter size={16} className="mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users size={16} className="mr-2" />
                      By Employee
                    </Button>
                  </div>
                  <Button>
                    Request Time Off
                  </Button>
                </div>
                
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="grid grid-cols-[1fr_auto_auto_auto] bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                    <div className="p-3 font-medium">Employee</div>
                    <div className="p-3 font-medium">Date Range</div>
                    <div className="p-3 font-medium">Status</div>
                    <div className="p-3 font-medium">Actions</div>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    <div className="grid grid-cols-[1fr_auto_auto_auto] items-center p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">JS</div>
                        <span>Jane Smith</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>Jun 15 - Jun 20, 2023</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
                        <Clock size={14} className="mr-1" />
                        Pending
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Deny</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[1fr_auto_auto_auto] items-center p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">JD</div>
                        <span>John Doe</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>Jun 10 - Jun 12, 2023</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                        <Check size={14} className="mr-1" />
                        Approved
                      </Badge>
                      <div>
                        <Button variant="ghost" size="sm">
                          View <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modals */}
      {isShiftModalOpen && (
        <ShiftModal
          isOpen={isShiftModalOpen}
          onClose={() => setIsShiftModalOpen(false)}
          shift={selectedShift || undefined}
          teamMembers={teamMembers}
          positions={positions}
          onSave={handleSaveShift}
          onCopy={handleCopyShift}
          onDelete={handleDeleteShift}
        />
      )}
      
      <CopyScheduleModal
        isOpen={isCopyModalOpen}
        onClose={() => setIsCopyModalOpen(false)}
        onCopy={handleCopySchedule}
        currentDate={currentDate}
      />
      
      <CreateScheduleModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateSchedule={() => {
          setCreateModalOpen(false);
          toast.success("New schedule created");
        }}
      />
      
      <AlertDialog open={showPublishConfirm} onOpenChange={setShowPublishConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish Schedule</AlertDialogTitle>
            <AlertDialogDescription>
              This will notify {unpublishedCount} employee(s) about their new shifts. 
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              toast.success("Schedule published successfully");
              // Update all pending shifts to approved
              setShifts(shifts.map(shift => 
                shift.status?.type === "pending" 
                  ? {...shift, status: { type: "approved", label: "Approved" }} 
                  : shift
              ));
            }}>
              Publish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default Schedule;
