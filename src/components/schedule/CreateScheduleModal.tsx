
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSchedule: (data: any) => void;
  isFirstTimeUser?: boolean;
}

export const CreateScheduleModal: React.FC<CreateScheduleModalProps> = ({ 
  isOpen, 
  onClose, 
  onCreateSchedule,
  isFirstTimeUser
}) => {
  const handleSubmit = () => {
    onCreateSchedule({ scheduleName: "Weekly Schedule" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Schedule</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="scheduleName">Schedule Name</Label>
            <Input id="scheduleName" placeholder="Enter schedule name" defaultValue="Weekly Schedule" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
