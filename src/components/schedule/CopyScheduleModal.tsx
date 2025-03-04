
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Copy, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { format, subWeeks, addWeeks } from "date-fns";

interface CopyScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: (weekOffset: number) => void;
  currentDate: Date;
}

export const CopyScheduleModal = ({
  isOpen,
  onClose,
  onCopy,
  currentDate,
}: CopyScheduleModalProps) => {
  const [weekOffset, setWeekOffset] = useState(-1); // Default to previous week
  const [selectedPeriod, setSelectedPeriod] = useState<"1" | "2" | "4">("1");
  
  // Calculate the date range for the selected week offset
  const getDateRangeForOffset = (offset: number) => {
    const targetDate = offset < 0 
      ? subWeeks(currentDate, Math.abs(offset))
      : addWeeks(currentDate, offset);
    
    const startOfWeekDate = new Date(targetDate);
    startOfWeekDate.setDate(startOfWeekDate.getDate() - startOfWeekDate.getDay() + 1); // Monday
    
    const endOfWeekDate = new Date(startOfWeekDate);
    endOfWeekDate.setDate(endOfWeekDate.getDate() + 6); // Sunday
    
    return `${format(startOfWeekDate, "MMM d")} - ${format(endOfWeekDate, "MMM d, yyyy")}`;
  };
  
  const handleNavigateWeek = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setWeekOffset(weekOffset - 1);
    } else {
      setWeekOffset(Math.min(weekOffset + 1, -1)); // Don't allow going past current week
    }
  };
  
  const handleCopy = () => {
    onCopy(weekOffset);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Copy Previous Schedule</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Select a previous schedule to copy</Label>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleNavigateWeek("prev")}
                className="h-9 w-9"
              >
                <ChevronLeft size={16} />
              </Button>
              
              <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-md p-3 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                  <Calendar size={16} className="text-shiftly-blue" />
                  <span>{getDateRangeForOffset(weekOffset)}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {weekOffset === -1 ? "Previous Week" : `${Math.abs(weekOffset)} Weeks Ago`}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleNavigateWeek("next")}
                disabled={weekOffset >= -1}
                className="h-9 w-9"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="copyPeriod">Copy for</Label>
            <Select value={selectedPeriod} onValueChange={(value: "1" | "2" | "4") => setSelectedPeriod(value)}>
              <SelectTrigger id="copyPeriod">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Week</SelectItem>
                <SelectItem value="2">2 Weeks</SelectItem>
                <SelectItem value="4">4 Weeks</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This will copy the schedule for {selectedPeriod} {parseInt(selectedPeriod) === 1 ? "week" : "weeks"} starting from the current week.
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm">
            <h3 className="font-medium flex items-center">
              <Copy size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
              What gets copied
            </h3>
            <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 pl-6 list-disc">
              <li>All shifts and assignments</li>
              <li>Shift times and durations</li>
              <li>Employee positions</li>
              <li>Notes and special instructions</li>
            </ul>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              You can review and modify the copied schedule before publishing.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button onClick={handleCopy} className="bg-shiftly-blue hover:bg-shiftly-blue/90">
            <Check size={16} className="mr-2" />
            Copy Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
