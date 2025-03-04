import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, CalendarCheck, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, addDays } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSchedule?: (data: any) => void;
}

export const CreateScheduleModal = ({ isOpen, onClose, onCreateSchedule }: CreateScheduleModalProps) => {
  const [scheduleName, setScheduleName] = useState("Weekly Schedule");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 6));
  const [scheduleType, setScheduleType] = useState("weekly");
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const handleCreateSchedule = () => {
    setIsCreating(true);
    
    setTimeout(() => {
      setIsCreating(false);
      setIsSuccess(true);
      
      const scheduleData = {
        scheduleName,
        startDate,
        endDate,
        scheduleType
      };
      
      toast({
        title: "Schedule created!",
        description: `${scheduleName} has been created and is ready for you to add shifts.`,
        variant: "default",
      });
      
      setTimeout(() => {
        if (onCreateSchedule) {
          onCreateSchedule(scheduleData);
        } else {
          onClose();
        }
      }, 1500);
    }, 1500);
  };
  
  const isFormValid = () => {
    return scheduleName.trim() !== "" && startDate && endDate;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Your First Schedule</DialogTitle>
          <DialogDescription>
            Set up a schedule for your team and start assigning shifts.
          </DialogDescription>
        </DialogHeader>
        
        {!isSuccess ? (
          <>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="scheduleName">Schedule Name</Label>
                <Input
                  id="scheduleName"
                  placeholder="Weekly Schedule"
                  value={scheduleName}
                  onChange={(e) => setScheduleName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scheduleType">Schedule Type</Label>
                <Select value={scheduleType} onValueChange={setScheduleType}>
                  <SelectTrigger id="scheduleType">
                    <SelectValue placeholder="Select schedule type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly Schedule</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly Schedule</SelectItem>
                    <SelectItem value="monthly">Monthly Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => date && setStartDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => date && setEndDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3 mt-4">
                <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-2 mt-0.5">
                  <Clock size={16} className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Time-saving tip
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    After creating your first schedule, you can use it as a template for future schedules.
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateSchedule} 
                disabled={!isFormValid() || isCreating}
                className="bg-shiftly-blue hover:bg-shiftly-blue/90"
              >
                {isCreating ? (
                  <>Creating...</>
                ) : (
                  <>
                    <CalendarCheck size={16} className="mr-2" />
                    Create Schedule
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-medium mb-2">Schedule Created!</h3>
            <p className="text-center text-gray-500 mb-6">
              Your schedule has been created successfully. You can now start adding shifts.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
