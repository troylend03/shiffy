
import React, { Component } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScheduleHeader } from "@/components/schedule/ScheduleHeader";
import { ScheduleGrid } from "@/components/schedule/ScheduleGrid";
import { ShiftModal } from "@/components/schedule/ShiftModal";
import { CreateScheduleModal } from "@/components/schedule/CreateScheduleModal";
import { CopyScheduleModal } from "@/components/schedule/CopyScheduleModal";
import { Calendar, Clock, Plus, Copy } from "lucide-react";
import { format, startOfWeek, addWeeks, subWeeks } from "date-fns";
import type { Shift, ShiftStatus } from "@/types/shift";
import { useNotifications } from "@/contexts/NotificationContext";

interface ScheduleState {
  currentDate: Date;
  currentView: "day" | "week" | "month";
  showCreateModal: boolean;
  showShiftModal: boolean;
  showCopyScheduleModal: boolean;
  scheduleCreated: boolean;
  shifts: Shift[];
  selectedShift: Shift | null;
}

class Schedule extends Component<{}, ScheduleState> {
  private notificationContext = useNotifications();
  
  constructor(props: {}) {
    super(props);
    
    this.state = {
      currentDate: new Date(),
      currentView: "week",
      showCreateModal: false,
      showShiftModal: false,
      showCopyScheduleModal: false,
      scheduleCreated: localStorage.getItem("scheduleCreated") === "true",
      shifts: [],
      selectedShift: null
    };
  }
  
  componentDidMount() {
    // Generate sample shifts if needed
    if (this.state.shifts.length === 0) {
      this.generateSampleShifts();
    }
  }

  handleDateChange = (direction: "prev" | "next") => {
    const { currentDate, currentView } = this.state;
    let newDate;
    
    if (currentView === "day") {
      newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (currentView === "week") {
      newDate = direction === "next" 
        ? addWeeks(currentDate, 1) 
        : subWeeks(currentDate, 1);
    } else {
      newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    
    this.setState({ currentDate: newDate });
  };

  handleViewChange = (view: "day" | "week" | "month") => {
    this.setState({ currentView: view });
  };

  handleShiftClick = (shift: Shift) => {
    this.setState({ 
      selectedShift: shift,
      showShiftModal: true
    });
  };

  handleCloseShiftModal = () => {
    this.setState({ showShiftModal: false });
  };

  handleUpdateShift = (updatedShift: Shift) => {
    const { shifts, selectedShift } = this.state;
    
    if (!selectedShift) {
      return;
    }
    
    const updatedShifts = shifts.map(shift => 
      shift.id === selectedShift.id ? updatedShift : shift
    );
    
    this.setState({ 
      shifts: updatedShifts,
      showShiftModal: false 
    });
    
    this.notificationContext.addNotification({
      title: "Shift Updated",
      message: `The shift for ${updatedShift.employee.name} has been updated.`,
      type: "success",
    });
  };

  handleCreateSchedule = (data: any) => {
    this.setState({ 
      showCreateModal: false,
      scheduleCreated: true 
    });
    
    localStorage.setItem("scheduleCreated", "true");
    
    this.notificationContext.addNotification({
      title: "Schedule Created",
      message: "Your new schedule has been created successfully.",
      type: "success",
    });
    
    // Generate sample shifts if none exist
    if (this.state.shifts.length === 0) {
      this.generateSampleShifts();
    }
  };

  handleShowCreateModal = () => {
    this.setState({ showCreateModal: true });
  };

  handleCopySchedule = (weekOffset: number) => {
    // In a real app, we would copy shifts from the selected week
    this.notificationContext.addNotification({
      title: "Schedule Copied",
      message: "The schedule has been copied successfully.",
      type: "success",
    });
    
    // For demo purposes, regenerate shifts
    this.generateSampleShifts();
    this.setState({ showCopyScheduleModal: false });
  };

  generateSampleShifts = () => {
    const { currentDate, shifts } = this.state;
    const employees = [
      { id: "emp1", name: "Sarah Johnson", avatar: "/placeholder.svg", position: "Manager" },
      { id: "emp2", name: "Michael Chen", avatar: "/placeholder.svg", position: "Associate" },
      { id: "emp3", name: "Emma Garcia", avatar: "/placeholder.svg", position: "Supervisor" },
      { id: "emp4", name: "James Wilson", avatar: "/placeholder.svg", position: "Associate" },
      { id: "emp5", name: "Olivia Martinez", avatar: "/placeholder.svg", position: "Assistant Manager" },
    ];
    
    const shiftTypes = ["Morning", "Afternoon", "Evening", "Night"];
    const statuses: ShiftStatus[] = ["scheduled", "completed", "missed", "open"];
    
    const monday = startOfWeek(currentDate, { weekStartsOn: 1 });
    const sampleShifts: Shift[] = [];
    
    // Generate shifts for each employee for the week
    employees.forEach(employee => {
      // 3-5 shifts per employee per week
      const shiftsCount = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < shiftsCount; i++) {
        const day = Math.floor(Math.random() * 7); // 0-6 (Monday to Sunday)
        const shiftDate = new Date(monday);
        shiftDate.setDate(monday.getDate() + day);
        
        const shiftType = shiftTypes[Math.floor(Math.random() * shiftTypes.length)];
        const status = Math.random() > 0.8 ? statuses[Math.floor(Math.random() * statuses.length)] : "scheduled";
        
        let startHour, endHour;
        
        switch (shiftType) {
          case "Morning":
            startHour = 8;
            endHour = 16;
            break;
          case "Afternoon":
            startHour = 12;
            endHour = 20;
            break;
          case "Evening":
            startHour = 16;
            endHour = 24;
            break;
          case "Night":
            startHour = 22;
            endHour = 6; // Next day
            break;
          default:
            startHour = 9;
            endHour = 17;
        }
        
        const startTime = new Date(shiftDate);
        startTime.setHours(startHour, 0, 0, 0);
        
        const endTime = new Date(shiftDate);
        if (endHour < startHour) {
          endTime.setDate(shiftDate.getDate() + 1); // Next day
        }
        endTime.setHours(endHour, 0, 0, 0);
        
        sampleShifts.push({
          id: `shift-${employee.id}-${day}-${i}`,
          employee,
          start: startTime,
          end: endTime,
          type: shiftType,
          status,
          notes: Math.random() > 0.7 ? "Priority shift" : "",
        });
      }
    });
    
    this.setState({ shifts: sampleShifts });
  };

  render() {
    const { 
      currentDate, 
      currentView, 
      showCreateModal,
      showShiftModal,
      showCopyScheduleModal,
      scheduleCreated,
      shifts,
      selectedShift 
    } = this.state;
    
    const currentDateDisplay = format(currentDate, "MMMM d, yyyy");
    
    return (
      <AppLayout>
        <TooltipProvider>
          <div className="h-full overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
                <p className="text-muted-foreground">{currentDateDisplay}</p>
              </div>
              
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => this.setState({ showCopyScheduleModal: true })}
                    >
                      <Copy size={16} />
                      Copy Schedule
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy a previous schedule</p>
                  </TooltipContent>
                </Tooltip>
                
                <Button 
                  className="gap-2 bg-shiftly-blue hover:bg-shiftly-blue/90"
                  onClick={this.handleShowCreateModal}
                >
                  <Plus size={16} />
                  Add Shift
                </Button>
              </div>
            </div>
            
            <ScheduleHeader 
              currentDate={currentDate}
              onDateChange={this.handleDateChange}
              currentView={currentView}
              onViewChange={this.handleViewChange}
            />
            
            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 rounded-md border mt-4">
              {scheduleCreated ? (
                <ScheduleGrid
                  shifts={shifts}
                  currentDate={currentDate}
                  currentView={currentView}
                  onShiftClick={this.handleShiftClick}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Calendar size={64} className="text-gray-300 dark:text-gray-700 mb-4" />
                  <h2 className="text-xl font-medium mb-2">No Schedule Created Yet</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Create your first schedule to start managing your team's shifts efficiently.
                  </p>
                  <Button 
                    className="gap-2 bg-shiftly-blue hover:bg-shiftly-blue/90"
                    onClick={this.handleShowCreateModal}
                  >
                    <Plus size={16} />
                    Create Schedule
                  </Button>
                </div>
              )}
            </div>
            
            {selectedShift && showShiftModal && (
              <ShiftModal
                shift={selectedShift}
                isOpen={showShiftModal}
                onClose={this.handleCloseShiftModal}
                onSave={this.handleUpdateShift}
              />
            )}
            
            <CreateScheduleModal
              isOpen={showCreateModal}
              onClose={() => this.setState({ showCreateModal: false })}
              onCreateSchedule={this.handleCreateSchedule}
              isFirstTimeUser={!scheduleCreated}
            />
            
            <CopyScheduleModal
              isOpen={showCopyScheduleModal}
              onClose={() => this.setState({ showCopyScheduleModal: false })}
              onCopy={this.handleCopySchedule}
              currentDate={currentDate}
            />
          </div>
        </TooltipProvider>
      </AppLayout>
    );
  }
}

export default Schedule;
