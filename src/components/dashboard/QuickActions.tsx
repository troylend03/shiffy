
import React, { Component } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Mail, 
  BarChart4,
  Briefcase,
  HelpCircle
} from "lucide-react";

interface QuickActionsProps {
  onCreateSchedule: () => void;
  onInviteTeam: () => void;
  onEditCompanyProfile: () => void;
  showTip: boolean;
  currentTip: number;
  onSkipTips: () => void;
  onNextTip: () => void;
  tipDetails: {
    title: string;
    description: string;
  };
}

interface QuickActionsState {}

export class QuickActions extends Component<QuickActionsProps, QuickActionsState> {
  render() {
    const { 
      onCreateSchedule, 
      onInviteTeam, 
      onEditCompanyProfile,
      showTip,
      currentTip,
      onSkipTips,
      onNextTip,
      tipDetails
    } = this.props;

    return (
      <Card id="quick-actions">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            className="w-full justify-start bg-shiftly-blue hover:bg-shiftly-blue/90"
            onClick={onCreateSchedule}
          >
            <Calendar size={16} className="mr-2" />
            Create New Schedule
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onInviteTeam}
          >
            <Users size={16} className="mr-2" />
            Invite Team Members
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onEditCompanyProfile}
          >
            <Briefcase size={16} className="mr-2" />
            Edit Company Profile
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Mail size={16} className="mr-2" />
            Send Announcements
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <BarChart4 size={16} className="mr-2" />
            View Reports
          </Button>
          
          {showTip && currentTip === 3 && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 z-10 shadow-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <HelpCircle size={16} />
                {tipDetails.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mt-1">
                {tipDetails.description}
              </p>
              <div className="flex justify-between mt-3">
                <Button variant="outline" size="sm" onClick={onSkipTips}>
                  Skip
                </Button>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={onNextTip}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}
