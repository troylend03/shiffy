
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PositionsRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const PositionsRolesModal: React.FC<PositionsRolesModalProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Positions and Roles</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="positionName">Position Name</Label>
            <Input id="positionName" placeholder="Enter position name" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save Positions</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
