
import React, { Component } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, HelpCircle } from "lucide-react";

interface WelcomeCardProps {
  isFirstTimeUser: boolean;
  showTips: boolean;
  currentTip: number;
  onStartSetup: () => void;
  onStartGuide: () => void;
  onSkipTips: () => void;
  onNextTip: () => void;
  tipDetails: {
    title: string;
    description: string;
  } | null;
}

interface WelcomeCardState {}

export class WelcomeCard extends Component<WelcomeCardProps, WelcomeCardState> {
  render() {
    const { 
      isFirstTimeUser, 
      showTips, 
      currentTip, 
      onStartSetup, 
      onStartGuide,
      onSkipTips,
      onNextTip,
      tipDetails
    } = this.props;

    return (
      <div id="welcome-card" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Shiftly</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            Your all-in-one scheduling solution
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isFirstTimeUser && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onStartGuide}>
                  <HelpCircle size={16} className="mr-2" />
                  Guide Me
                </Button>
              </TooltipTrigger>
              <TooltipContent className="p-2">
                <p>Start the interactive guide</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Button 
            className="bg-shiftly-blue hover:bg-shiftly-blue/90"
            onClick={onStartSetup}
          >
            <CheckCircle2 size={16} className="mr-2" />
            Complete Setup
          </Button>
        </div>
        
        {showTips && currentTip === 0 && tipDetails && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 z-10 shadow-lg">
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
      </div>
    );
  }
}
