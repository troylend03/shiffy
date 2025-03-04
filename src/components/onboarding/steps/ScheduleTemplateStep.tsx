
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, Copy, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShiftTemplateProps {
  id: string;
  name: string;
  times: string;
  days: string[];
  color: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

const ShiftTemplate = ({
  id,
  name,
  times,
  days,
  color,
  selected,
  onSelect,
}: ShiftTemplateProps) => {
  return (
    <Card
      className={cn(
        "border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md",
        selected && "ring-2 ring-shiftly-blue dark:ring-blue-500"
      )}
      onClick={() => onSelect(id)}
    >
      <div className={`h-2 ${color}`} />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{name}</h3>
          <RadioGroupItem
            id={`template-${id}`}
            value={id}
            className="data-[state=checked]:border-shiftly-blue data-[state=checked]:bg-shiftly-blue"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock size={14} className="mr-2" />
          {times}
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar size={14} className="mr-2" />
          {days.join(", ")}
        </div>
      </div>
    </Card>
  );
};

export const ScheduleTemplateStep = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  
  const templates = [
    {
      id: "standard",
      name: "Standard Retail",
      times: "9:00 AM - 5:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      color: "bg-blue-500",
    },
    {
      id: "restaurant",
      name: "Restaurant",
      times: "11:00 AM - 10:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      color: "bg-green-500",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      times: "7:00 AM - 7:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      color: "bg-purple-500",
    },
    {
      id: "custom",
      name: "Custom",
      times: "Set your own",
      days: ["You decide"],
      color: "bg-gray-500",
    },
  ];
  
  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
  };
  
  return (
    <div className="space-y-6">
      <RadioGroup value={selectedTemplate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <ShiftTemplate
            key={template.id}
            {...template}
            selected={selectedTemplate === template.id}
            onSelect={handleSelectTemplate}
          />
        ))}
      </RadioGroup>
      
      <Separator />
      
      <div>
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Customize Schedule</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scheduleName">Schedule Name</Label>
            <Input
              id="scheduleName"
              placeholder="E.g., Main Store Schedule"
              defaultValue={
                selectedTemplate === "standard" 
                  ? "Retail Schedule" 
                  : selectedTemplate === "restaurant"
                  ? "Restaurant Schedule"
                  : selectedTemplate === "healthcare"
                  ? "Healthcare Schedule"
                  : ""
              }
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="templateStartTime">Default Start Time</Label>
              <Input
                id="templateStartTime"
                type="time"
                defaultValue={
                  selectedTemplate === "standard" 
                    ? "09:00" 
                    : selectedTemplate === "restaurant"
                    ? "11:00"
                    : selectedTemplate === "healthcare"
                    ? "07:00"
                    : ""
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="templateEndTime">Default End Time</Label>
              <Input
                id="templateEndTime"
                type="time"
                defaultValue={
                  selectedTemplate === "standard" 
                    ? "17:00" 
                    : selectedTemplate === "restaurant"
                    ? "22:00"
                    : selectedTemplate === "healthcare"
                    ? "19:00"
                    : ""
                }
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scheduleDays">Default Working Days</Label>
            <Select defaultValue="weekdays">
              <SelectTrigger id="scheduleDays">
                <SelectValue placeholder="Select days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays">Weekdays (Mon-Fri)</SelectItem>
                <SelectItem value="weekend">Weekend (Sat-Sun)</SelectItem>
                <SelectItem value="all">All Week (Mon-Sun)</SelectItem>
                <SelectItem value="custom">Custom Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 pt-4">
        <Button variant="outline" className="flex-1">
          <Copy size={16} className="mr-2" />
          Import from Another Location
        </Button>
        <Button variant="outline" className="flex-1">
          <Plus size={16} className="mr-2" />
          Create from Scratch
        </Button>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-start gap-3">
        <div className="bg-green-100 dark:bg-green-800 rounded-full p-2 mt-0.5">
          <ArrowRight size={16} className="text-green-600 dark:text-green-300" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-green-800 dark:text-green-300">
            Schedule templates save time
          </h4>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            You'll be able to customize your schedule and add positions after setup.
          </p>
        </div>
      </div>
    </div>
  );
};
