
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shift } from "./ScheduleGrid";
import { X, Copy } from "lucide-react";

interface ShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift?: Shift;
  teamMembers: Array<{ id: string; name: string; avatar?: string }>;
  positions: Array<{ id: string; name: string }>;
  onSave: (shiftData: Partial<Shift>) => void;
}

export const ShiftModal = ({
  isOpen,
  onClose,
  shift,
  teamMembers,
  positions,
  onSave,
}: ShiftModalProps) => {
  const isEditMode = !!shift;
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState(shift?.employeeId || "");
  const [startTime, setStartTime] = useState(shift?.startTime || "");
  const [endTime, setEndTime] = useState(shift?.endTime || "");
  const [position, setPosition] = useState(shift?.position || "");
  const [notes, setNotes] = useState(shift?.note || "");
  const [activeTab, setActiveTab] = useState("shiftDetails");
  
  // Days of the week for the recurrence option
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDays, setSelectedDays] = useState<string[]>(days);

  const handleSave = () => {
    onSave({
      employeeId: selectedTeamMemberId,
      startTime,
      endTime,
      position,
      note: notes,
    });
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
          <Button variant="outline" onClick={onClose} className="mr-2">
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          {isEditMode && (
            <Button variant="outline" className="mr-2">
              <Copy size={16} className="mr-2" />
              Copy Shift
            </Button>
          )}
          <Button onClick={handleSave} className="bg-shiftly-blue hover:bg-shiftly-blue/90">
            {isEditMode ? "Save Changes" : "Create Shift"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
