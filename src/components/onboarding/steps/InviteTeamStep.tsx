
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, Mail, X, Phone } from "lucide-react";

export const InviteTeamStep = () => {
  const [activeTab, setActiveTab] = useState("individual");
  const [invites, setInvites] = useState<Array<{ email: string; role: string; phone: string }>>([
    { email: "", role: "employee", phone: "" }
  ]);
  const [bulkEmails, setBulkEmails] = useState("");
  
  const roles = [
    { id: "employee", name: "Employee" },
    { id: "manager", name: "Manager" },
    { id: "admin", name: "Admin" }
  ];
  
  const handleAddInvite = () => {
    setInvites([...invites, { email: "", role: "employee", phone: "" }]);
  };
  
  const handleRemoveInvite = (index: number) => {
    const newInvites = [...invites];
    newInvites.splice(index, 1);
    setInvites(newInvites);
  };
  
  const handleInviteChange = (index: number, field: "email" | "role" | "phone", value: string) => {
    const newInvites = [...invites];
    newInvites[index][field] = value;
    setInvites(newInvites);
  };
  
  const extractEmails = () => {
    // Parse the bulk emails textarea to extract emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = bulkEmails.match(emailRegex) || [];
    return matches.map(email => email.trim()).filter(Boolean);
  };
  
  const emailCount = activeTab === "individual" ? invites.filter(inv => inv.email).length : extractEmails().length;
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual">Individual Invites</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Invite</TabsTrigger>
        </TabsList>
        
        <TabsContent value="individual" className="space-y-4 pt-4">
          {invites.map((invite, index) => (
            <div key={index} className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`email${index}`}>
                    Email
                  </Label>
                  <div className="flex">
                    <Input
                      id={`email${index}`}
                      placeholder="Email address"
                      type="email"
                      value={invite.email}
                      onChange={(e) => handleInviteChange(index, "email", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`phone${index}`} className="flex items-center">
                    Phone <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id={`phone${index}`}
                    placeholder="(555) 123-4567"
                    type="tel"
                    value={invite.phone}
                    onChange={(e) => handleInviteChange(index, "phone", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <div>
                  <Label htmlFor={`role${index}`}>
                    Role
                  </Label>
                  <Select 
                    value={invite.role} 
                    onValueChange={(value) => handleInviteChange(index, "role", value)}
                  >
                    <SelectTrigger id={`role${index}`} className="mt-1 w-32">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveInvite(index)}
                  disabled={invites.length === 1}
                  className="mt-7"
                >
                  <Trash2 size={16} />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddInvite}
            className="mt-2"
          >
            <Plus size={16} className="mr-2" />
            Add Another
          </Button>
        </TabsContent>
        
        <TabsContent value="bulk" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="bulkEmails">Enter or paste email addresses</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-xs text-shiftly-blue hover:text-shiftly-blue/90 hover:bg-transparent"
              >
                <Upload size={14} className="mr-1" />
                Upload CSV
              </Button>
            </div>
            <Textarea
              id="bulkEmails"
              placeholder="Enter email addresses separated by commas, spaces, or new lines"
              rows={6}
              value={bulkEmails}
              onChange={(e) => setBulkEmails(e.target.value)}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter multiple email addresses separated by commas, spaces, or new lines
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Note: For bulk invites, phone numbers will be required after team members join.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bulkRole">Role for all invitees</Label>
            <Select defaultValue="employee">
              <SelectTrigger id="bulkRole">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {extractEmails().length > 0 && (
            <div className="pt-2">
              <Label>Detected emails:</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {extractEmails().slice(0, 5).map((email, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Mail size={12} />
                    {email}
                    <X size={12} className="ml-1 cursor-pointer" />
                  </Badge>
                ))}
                {extractEmails().length > 5 && (
                  <Badge variant="outline">+{extractEmails().length - 5} more</Badge>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
        <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-2 mt-0.5">
          <Mail size={16} className="text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Ready to invite {emailCount} team members</h4>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            Team members will receive an invitation email with instructions to create their account.
          </p>
        </div>
      </div>
    </div>
  );
};
