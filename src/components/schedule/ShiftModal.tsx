
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Shift } from "./ScheduleGrid";
import { X, Copy, Calendar, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift?: Shift;
  teamMembers: Array<{ id: string; name: string; avatar?: string }>;
  positions: Array<{ id: string; name: string }>;
  onSave: (shiftData: Partial<Shift>) => void;
  onCopy?: (shiftData: Partial<Shift>, applyToWeek: boolean) => void;
  onDelete?: (shiftId: string) => void;
}

export const ShiftModal = ({
  isOpen,
  onClose,
  shift,
  teamMembers,
  positions,
  onSave,
  onCopy,
  onDelete,
}: ShiftModalProps) => {
  const { toast } = useToast();
  const isEditMode = !!shift;
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState(shift?.employeeId || "");
  const [startTime, setStartTime] = useState(shift?.startTime || "");
  const [endTime, setEndTime] = useState(shift?.endTime || "");
  const [position, setPosition] = useState(shift?.position || "");
  const [notes, setNotes] = useState(shift?.note || "");
  const [activeTab, setActiveTab] = useState("shiftDetails");
  const [showCopyOptions, setShowCopyOptions] = useState(false);
  const [applyToWeek, setApplyToWeek] = useState(false);
  
  // Days of the week for the recurrence option
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDays, setSelectedDays] = useState<string[]>(days);

  const handleSave = () => {
    // Validate required fields
    if (!selectedTeamMemberId || !startTime || !endTime || !position) {
      toast({
        title: "Missing required fields",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    onSave({
      employeeId: selectedTeamMemberId,
      startTime,
      endTime,
      position,
      note: notes,
    });
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy({
        employeeId: selectedTeamMemberId,
        startTime,
        endTime,
        position,
        note: notes,
      }, applyToWeek);
      setShowCopyOptions(false);
      toast({
        title: "Shift copied",
        description: applyToWeek ? "Shift has been copied to the entire week." : "Shift has been copied."
      });
    }
  };

  const handleDelete = () => {
    if (shift && onDelete) {
      onDelete(shift.id);
    }
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            {isEditMode ? "Edit Shift" : "Add New Shift"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shiftDetails">Shift Details</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="shiftDetails" className="p-6 pt-4 space-y-4">
            {showCopyOptions ? (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm">
                  <h3 className="font-medium flex items-center mb-2">
                    <Calendar size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
                    Copy Shift Options
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    You can copy this shift to other days or apply it to the entire week.
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="copyToWeek" className="cursor-pointer">Apply to entire week</Label>
                    <Switch id="copyToWeek" checked={applyToWeek} onCheckedChange={setApplyToWeek} />
                  </div>
                  
                  {!applyToWeek && (
                    <div className="space-y-2">
                      <Label>Select days</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {days.map((day) => (
                          <Button
                            key={day}
                            type="button"
                            variant={selectedDays.includes(day) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleDay(day)}
                            className="min-w-[45px]"
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" onClick={() => setShowCopyOptions(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCopy}>
                      <Copy size={16} className="mr-2" />
                      Copy Shift
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assignTo">Assign To</Label>
                  <Select value={selectedTeamMemberId} onValueChange={setSelectedTeamMemberId}>
                    <SelectTrigger id="assignTo" className="w-full">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              {member.avatar ? (
                                <img src={member.avatar} alt={member.name} />
                              ) : (
                                <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                    {member.name.split(" ").map((n) => n[0]).join("")}
                                  </span>
                                </div>
                              )}
                            </Avatar>
                            <span>{member.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger id="position" className="w-full">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos.id} value={pos.name}>
                          {pos.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applyTo">Apply To</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {days.map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={selectedDays.includes(day) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleDay(day)}
                        className="min-w-[45px]"
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Shift Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any important information about this shift"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="chat" className="h-[400px] p-6 pt-4">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <div className="bg-blue-100 dark:bg-blue-900 h-full w-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-300">MB</span>
                    </div>
                  </Avatar>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Manager</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Hi, I need someone to cover the morning shift this Wednesday. Are you available?
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Yesterday at 10:45 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Yes, I can cover it. What time is the shift?
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Yesterday at 11:15 AM</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <div className="bg-green-100 dark:bg-green-900 h-full w-full flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600 dark:text-green-300">LD</span>
                    </div>
                  </Avatar>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-6 pt-0">
          {isEditMode && onDelete && (
            <Button variant="destructive" onClick={handleDelete} className="mr-auto">
              <X size={16} className="mr-2" />
              Delete
            </Button>
          )}
          
          <Button variant="outline" onClick={onClose} className="mr-2">
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          
          {isEditMode && onCopy && (
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={() => setShowCopyOptions(true)}
            >
              <Copy size={16} className="mr-2" />
              Copy Shift
            </Button>
          )}
          
          <Button onClick={handleSave} className="bg-shiftly-blue hover:bg-shiftly-blue/90">
            <Check size={16} className="mr-2" />
            {isEditMode ? "Save Changes" : "Create Shift"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
