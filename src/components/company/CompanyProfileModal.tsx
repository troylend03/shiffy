
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useNotifications } from "@/contexts/NotificationContext";
import { Building, CheckCircle, Globe, MapPin, Save, Upload } from "lucide-react";

interface CompanyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export const CompanyProfileModal = ({ isOpen, onClose, onSave }: CompanyProfileModalProps) => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [locations, setLocations] = useState([{ name: "", address: "", city: "", state: "", zip: "", isDefault: false }]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addNotification } = useNotifications();
  
  const industries = [
    "Retail",
    "Food Service",
    "Healthcare",
    "Hospitality",
    "Manufacturing",
    "Education",
    "Professional Services",
    "Technology",
    "Other",
  ];
  
  const handleAddLocation = () => {
    setLocations([...locations, { name: "", address: "", city: "", state: "", zip: "", isDefault: false }]);
  };
  
  const handleRemoveLocation = (index: number) => {
    if (locations.length === 1) return;
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };
  
  const handleLocationChange = (index: number, field: string, value: string | boolean) => {
    const newLocations = [...locations];
    // @ts-ignore - We know the field exists
    newLocations[index][field] = value;
    
    // If setting a location as default, make sure other locations are not default
    if (field === "isDefault" && value === true) {
      newLocations.forEach((loc, i) => {
        if (i !== index) loc.isDefault = false;
      });
    }
    
    setLocations(newLocations);
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };
  
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      
      addNotification({
        title: "Company profile saved!",
        message: "Your company profile has been successfully updated.",
        type: "success",
      });
      
      if (onSave) {
        onSave();
      }
      
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1500);
  };
  
  const isFormValid = () => {
    // Basic validation - at minimum company name and industry
    return companyName.trim() !== "" && industry !== "";
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Company Profile</DialogTitle>
          <DialogDescription>
            Complete your company profile to customize your scheduling experience.
          </DialogDescription>
        </DialogHeader>
        
        {!isSuccess ? (
          <div className="space-y-6 py-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
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
              
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your business"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Globe size={16} />
                    </span>
                    <Input
                      id="website"
                      placeholder="www.example.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => document.getElementById('logo')?.click()}
                    >
                      <Upload size={16} className="mr-2" />
                      {logo ? 'Change Logo' : 'Upload Logo'}
                    </Button>
                    <input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    {logo && <span className="text-sm text-gray-500">{logo.name}</span>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Locations</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddLocation}
                >
                  <MapPin size={16} className="mr-2" />
                  Add Location
                </Button>
              </div>
              
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Location {index + 1}</h4>
                      {locations.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveLocation(index)}
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Remove location</span>
                          <MapPin size={16} className="text-destructive" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`location-name-${index}`}>Location Name</Label>
                        <Input
                          id={`location-name-${index}`}
                          placeholder="Main Store, Downtown Branch, etc."
                          value={location.name}
                          onChange={(e) => handleLocationChange(index, "name", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`location-address-${index}`}>Street Address</Label>
                        <Input
                          id={`location-address-${index}`}
                          placeholder="123 Main St"
                          value={location.address}
                          onChange={(e) => handleLocationChange(index, "address", e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`location-city-${index}`}>City</Label>
                          <Input
                            id={`location-city-${index}`}
                            placeholder="City"
                            value={location.city}
                            onChange={(e) => handleLocationChange(index, "city", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`location-state-${index}`}>State/Province</Label>
                          <Input
                            id={`location-state-${index}`}
                            placeholder="State/Province"
                            value={location.state}
                            onChange={(e) => handleLocationChange(index, "state", e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`location-zip-${index}`}>ZIP/Postal Code</Label>
                        <Input
                          id={`location-zip-${index}`}
                          placeholder="ZIP/Postal Code"
                          value={location.zip}
                          onChange={(e) => handleLocationChange(index, "zip", e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`location-default-${index}`}
                          checked={location.isDefault}
                          onCheckedChange={(checked) => 
                            handleLocationChange(index, "isDefault", checked === true)
                          }
                        />
                        <Label
                          htmlFor={`location-default-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Set as default location
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveProfile} 
                disabled={!isFormValid() || isSaving}
                className="bg-shiftly-blue hover:bg-shiftly-blue/90"
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-medium mb-2">Profile Saved!</h3>
            <p className="text-center text-gray-500 mb-6">
              Your company profile has been updated successfully.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
