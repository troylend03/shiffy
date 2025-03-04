import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Filter, ChevronLeft, ChevronRight, Users, Clock } from "lucide-react";
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { CreateScheduleModal } from "@/components/schedule/CreateScheduleModal";
import { ScheduleGrid } from "@/components/schedule/ScheduleGrid";
import { ScheduleHeader } from "@/components/schedule/ScheduleHeader";
import { ShiftModal } from "@/components/schedule/ShiftModal";
import { useToast } from "@/hooks/use-toast";

const mockTeamMembers = [
  { id: "1", name: "John Doe", position: "Cashier" },
  { id: "2", name: "Jane Smith", position: "Manager" },
  { id: "3", name: "Mike Johnson", position: "Stocker" }
];

const mockPositions = [
  { id: "1", name: "Cashier" },
  { id: "2", name: "Manager" },
  { id: "3", name: "Stocker" }
];

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<"week" | "day">("week");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [scheduleCreated, setScheduleCreated] = useState(false);
  const { toast } = useToast();

  const startDate = currentView === "week" 
    ? startOfWeek(currentDate, { weekStartsOn: 1 }) 
    : currentDate;
  
  const endDate = currentView === "week"
    ? endOfWeek(currentDate, { weekStartsOn: 1 })
    : currentDate;

  const handlePrevious = () => {
    if (currentView === "week") {
      setCurrentDate(subDays(currentDate, 7));
    } else {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (currentView === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCreateSchedule = (data: any) => {
    setScheduleCreated(true);
    setShowCreateModal(false);
    toast({
      title: "Schedule created!",
      description: `${data.scheduleName} has been created successfully.`,
    });
  };

  const handleCreateShift = () => {
    setShowShiftModal(true);
  };

  const handleSaveShift = (shiftData: any) => {
    setShowShiftModal(false);
    toast({
      title: "Shift created!",
      description: "The shift has been added to the schedule.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
              Create and manage your team's schedule
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex"
              onClick={handleToday}
            >
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              className="bg-shiftly-blue hover:bg-shiftly-blue/90"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Schedule
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
            <div>
              <CardTitle>
                {currentView === "week"
                  ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`
                  : format(currentDate, "EEEE, MMMM d, yyyy")}
              </CardTitle>
              <CardDescription>
                Manage shifts and assignments
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Tabs
                defaultValue="week"
                value={currentView}
                onValueChange={(value) => setCurrentView(value as "week" | "day")}
                className="w-[180px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {scheduleCreated ? (
              <div>
                <ScheduleHeader 
                  currentDate={startDate} 
                  viewType={currentView} 
                />
                <ScheduleGrid 
                  currentDate={startDate} 
                  viewType={currentView} 
                  onCreateShift={handleCreateShift}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
                  <Calendar className="h-12 w-12 text-shiftly-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No schedules yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                  Create your first schedule to start managing your team's shifts and streamline your scheduling process.
                </p>
                <Button 
                  className="bg-shiftly-blue hover:bg-shiftly-blue/90"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Schedule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {scheduleCreated && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Upcoming Shifts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Morning Shift</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tomorrow, 8:00 AM - 4:00 PM
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs font-medium mr-4">
                        Assigned
                      </div>
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm">3</span>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Evening Shift</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tomorrow, 4:00 PM - 12:00 AM
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded text-xs font-medium mr-4">
                        Open
                      </div>
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm">2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Schedule Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full justify-start"
                  onClick={handleCreateShift}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Shift
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Assignments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Copy Previous Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateScheduleModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateSchedule={handleCreateSchedule}
        />
      )}

      {showShiftModal && (
        <ShiftModal
          isOpen={showShiftModal}
          onClose={() => setShowShiftModal(false)}
          teamMembers={mockTeamMembers}
          positions={mockPositions}
          onSave={handleSaveShift}
        />
      )}
    </AppLayout>
  );
};

export default Schedule;
