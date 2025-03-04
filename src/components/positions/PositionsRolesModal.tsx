
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Plus, X, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface PositionsRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

interface Position {
  id: string;
  name: string;
  color: string;
}

export const PositionsRolesModal = ({ isOpen, onClose, onSubmit }: PositionsRolesModalProps) => {
  const [activeTab, setActiveTab] = useState("positions");
  const [newPositionName, setNewPositionName] = useState("");
  const [newPositionColor, setNewPositionColor] = useState("#3b82f6"); // Default blue
  const [positions, setPositions] = useState<Position[]>([
    { id: "1", name: "Cashier", color: "#3b82f6" },
    { id: "2", name: "Floor Staff", color: "#10b981" },
  ]);
  const [newRoleName, setNewRoleName] = useState("");
  const [roles, setRoles] = useState<string[]>(["Manager", "Supervisor", "Employee"]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const handleAddPosition = () => {
    if (newPositionName.trim() === "") return;
    
    setPositions([
      ...positions,
      {
        id: Date.now().toString(),
        name: newPositionName,
        color: newPositionColor,
      },
    ]);
    setNewPositionName("");
  };
  
  const handleRemovePosition = (id: string) => {
    setPositions(positions.filter(position => position.id !== id));
  };
  
  const handleAddRole = () => {
    if (newRoleName.trim() === "" || roles.includes(newRoleName)) return;
    
    setRoles([...roles, newRoleName]);
    setNewRoleName("");
  };
  
  const handleRemoveRole = (role: string) => {
    setRoles(roles.filter(r => r !== role));
  };
  
  const handleSaveChanges = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      
      toast({
        title: "Positions and roles saved!",
        description: `${positions.length} positions and ${roles.length} roles have been set up.`,
        variant: "default",
      });
      
      setTimeout(() => {
        if (onSubmit) {
          onSubmit();
        } else {
          onClose();
        }
      }, 1500);
    }, 1500);
  };
  
  const colorOptions = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#6b7280", // gray
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Set Up Positions & Roles</DialogTitle>
          <DialogDescription>
            Define the positions and roles in your organization to better manage schedules.
          </DialogDescription>
        </DialogHeader>
        
        {!isSuccess ? (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="positions">Positions</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="positions" className="space-y-4 mt-4">
                <div className="text-sm text-gray-500">
                  Positions are the specific jobs or responsibilities that employees perform (e.g., Cashier, Server).
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="newPosition" className="sr-only">New Position</Label>
                    <Input
                      id="newPosition"
                      placeholder="New position name"
                      value={newPositionName}
                      onChange={(e) => setNewPositionName(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-1">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`h-8 w-8 rounded-full border-2 ${
                          newPositionColor === color ? 'border-gray-900 dark:border-gray-100' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewPositionColor(color)}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleAddPosition}
                    disabled={newPositionName.trim() === ""}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {positions.map((position) => (
                    <div 
                      key={position.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ backgroundColor: position.color }}
                        />
                        <span>{position.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePosition(position.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                  
                  {positions.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No positions added yet. Add your first position above.
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="roles" className="space-y-4 mt-4">
                <div className="text-sm text-gray-500">
                  Roles determine what permissions and access levels team members have (e.g., Manager, Employee).
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="newRole" className="sr-only">New Role</Label>
                    <Input
                      id="newRole"
                      placeholder="New role name"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleAddRole}
                    disabled={newRoleName.trim() === "" || roles.includes(newRoleName)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {roles.map((role) => (
                    <Badge 
                      key={role} 
                      variant="secondary" 
                      className="flex items-center gap-1 px-3 py-1.5"
                    >
                      <Briefcase size={14} />
                      {role}
                      <X 
                        size={14} 
                        className="ml-1 cursor-pointer" 
                        onClick={() => handleRemoveRole(role)}
                      />
                    </Badge>
                  ))}
                  
                  {roles.length === 0 && (
                    <div className="text-center py-4 text-gray-500 w-full">
                      No roles added yet. Add your first role above.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveChanges} 
                disabled={positions.length === 0 || roles.length === 0 || isSaving}
                className="bg-shiftly-blue hover:bg-shiftly-blue/90"
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>Save Changes</>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-medium mb-2">Setup Complete!</h3>
            <p className="text-center text-gray-500 mb-6">
              Your positions and roles have been saved successfully.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
