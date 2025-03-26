
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Upload, Plus, Trash2, X, Send, CheckCircle, UserPlus, Clipboard, Phone } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvites?: (data: any) => void;
}

export const InviteModal = ({ isOpen, onClose, onSendInvites }: InviteModalProps) => {
  const [activeTab, setActiveTab] = useState("individual");
  const [invites, setInvites] = useState<Array<{ email: string; role: string; name: string; phone: string }>>([
    { email: "", role: "employee", name: "", phone: "" }
  ]);
  const [bulkEmails, setBulkEmails] = useState("");
  const [bulkRole, setBulkRole] = useState("employee");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inviteLink, setInviteLink] = useState("https://shiftly.app/join?code=ABC123XYZ");
  const [linkCopied, setLinkCopied] = useState(false);
  const { addNotification } = useNotifications();
  
  const roles = [
    { id: "employee", name: "Employee" },
    { id: "manager", name: "Manager" },
    { id: "admin", name: "Admin" }
  ];
  
  const handleAddInvite = () => {
    setInvites([...invites, { email: "", role: "employee", name: "", phone: "" }]);
  };
  
  const handleRemoveInvite = (index: number) => {
    const newInvites = [...invites];
    newInvites.splice(index, 1);
    setInvites(newInvites);
  };
  
  const handleInviteChange = (index: number, field: "email" | "role" | "name" | "phone", value: string) => {
    const newInvites = [...invites];
    newInvites[index][field] = value;
    setInvites(newInvites);
  };
  
  const extractEmails = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = bulkEmails.match(emailRegex) || [];
    return matches.map(email => email.trim()).filter(Boolean);
  };
  
  const removeBulkEmail = (emailToRemove: string) => {
    const emails = extractEmails().filter(email => email !== emailToRemove);
    setBulkEmails(emails.join(", "));
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    
    addNotification({
      title: "Link copied!",
      message: "Invite link has been copied to clipboard.",
      type: "success",
    });
    
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };
  
  const handleSendInvites = () => {
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      
      const count = activeTab === "individual" 
        ? invites.filter(inv => inv.email.trim()).length 
        : extractEmails().length;
      
      addNotification({
        title: "Invitations sent!",
        message: `${count} team members have been invited to join your team.`,
        type: "success",
      });
      
      if (onSendInvites) {
        onSendInvites(invites);
      }
      
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1500);
  };
  
  const isFormValid = () => {
    if (activeTab === "individual") {
      return invites.some(invite => invite.email.trim() !== "");
    } else {
      return extractEmails().length > 0;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-shiftly-blue" />
            Invite Team Members
          </DialogTitle>
          <DialogDescription>
            Invite your team members to join Shiftly and access their schedules.
          </DialogDescription>
        </DialogHeader>
        
        {!isSuccess ? (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Invite</TabsTrigger>
                <TabsTrigger value="link">Invite Link</TabsTrigger>
              </TabsList>
              
              <TabsContent value="individual" className="space-y-4 mt-4">
                {invites.map((invite, index) => (
                  <div key={index} className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`}>Name (optional)</Label>
                      <Input
                        id={`name-${index}`}
                        placeholder="Employee name"
                        value={invite.name}
                        onChange={(e) => handleInviteChange(index, "name", e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`email-${index}`}>Email address</Label>
                        <Input
                          id={`email-${index}`}
                          placeholder="Email address"
                          type="email"
                          value={invite.email}
                          onChange={(e) => handleInviteChange(index, "email", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`phone-${index}`}>Phone number (optional)</Label>
                        <Input
                          id={`phone-${index}`}
                          placeholder="(555) 123-4567"
                          type="tel"
                          value={invite.phone}
                          onChange={(e) => handleInviteChange(index, "phone", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2 items-start">
                      <div className="flex-1">
                        <Label htmlFor={`role-${index}`}>Role</Label>
                        <Select 
                          value={invite.role} 
                          onValueChange={(value) => handleInviteChange(index, "role", value)}
                        >
                          <SelectTrigger id={`role-${index}`} className="mt-1">
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
              
              <TabsContent value="bulk" className="space-y-4 mt-4">
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
                    rows={5}
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Enter multiple email addresses separated by commas, spaces, or new lines
                  </p>
                  <p className="text-xs text-gray-500">
                    Note: For bulk invites, phone numbers can be added after team members join.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bulkRole">Role for all invitees</Label>
                  <Select value={bulkRole} onValueChange={setBulkRole}>
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
                      {extractEmails().map((email, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <Mail size={12} />
                          {email}
                          <X 
                            size={12} 
                            className="ml-1 cursor-pointer" 
                            onClick={() => removeBulkEmail(email)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="link" className="space-y-4 mt-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-2 mt-0.5">
                    <Mail size={16} className="text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Share invite link</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      Anyone with this link can join your organization. You can set their role after they join.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inviteLink">Invitation link</Label>
                  <div className="flex">
                    <Input
                      id="inviteLink"
                      value={inviteLink}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button 
                      onClick={handleCopyLink}
                      className={`rounded-l-none ${linkCopied ? 'bg-green-600' : 'bg-shiftly-blue'}`}
                    >
                      {linkCopied ? (
                        <>
                          <CheckCircle size={16} className="mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Clipboard size={16} className="mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultRole">Default role for link invites</Label>
                  <Select defaultValue="employee">
                    <SelectTrigger id="defaultRole">
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
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleCopyLink}
                  >
                    {linkCopied ? "Link Copied!" : "Copy Invite Link"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {activeTab !== "link" && (
                <Button 
                  onClick={handleSendInvites} 
                  disabled={!isFormValid() || isSending}
                  className="bg-shiftly-blue hover:bg-shiftly-blue/90"
                >
                  {isSending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Invitations
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-medium mb-2">Invitations Sent!</h3>
            <p className="text-center text-gray-500 mb-6">
              Your team members will receive an email with instructions to join Shiftly.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
