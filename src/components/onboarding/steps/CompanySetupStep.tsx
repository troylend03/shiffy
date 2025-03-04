
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const CompanySetupStep = () => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [locations, setLocations] = useState(1);
  
  const industries = [
    "Retail",
    "Food Service",
    "Healthcare",
    "Hospitality",
    "Manufacturing",
    "Other",
  ];
  
  const handleAddLocation = () => {
    setLocations(locations + 1);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          placeholder="Enter your company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((ind) => (
              <SelectItem key={ind} value={ind.toLowerCase()}>
                {ind}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Locations</Label>
        {Array.from({ length: locations }).map((_, index) => (
          <div key={index} className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`locationName${index}`}>Location Name</Label>
              <Input
                id={`locationName${index}`}
                placeholder={`Location ${index + 1}`}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`address${index}`}>Address</Label>
                <Input
                  id={`address${index}`}
                  placeholder="Street address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`city${index}`}>City</Label>
                <Input
                  id={`city${index}`}
                  placeholder="City"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`state${index}`}>State</Label>
                <Input
                  id={`state${index}`}
                  placeholder="State/Province"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`zip${index}`}>ZIP/Postal Code</Label>
                <Input
                  id={`zip${index}`}
                  placeholder="ZIP/Postal Code"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          className="mt-3 text-shiftly-blue hover:text-shiftly-blue/90 text-sm font-medium flex items-center"
          onClick={handleAddLocation}
        >
          + Add another location
        </button>
      </div>
      
      <div className="flex items-start space-x-2">
        <Checkbox id="defaultLocation" />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="defaultLocation"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set as default location
          </Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This will be the primary location for scheduling
          </p>
        </div>
      </div>
    </div>
  );
};
