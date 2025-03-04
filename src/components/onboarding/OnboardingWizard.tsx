
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  title: string;
  description: string;
  component: React.ReactNode;
}

interface OnboardingWizardProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onCancel?: () => void;
  showSkip?: boolean;
}

export const OnboardingWizard = ({
  steps,
  onComplete,
  onCancel,
  showSkip = true,
}: OnboardingWizardProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;
  
  const handleNext = () => {
    setCompletedSteps([...completedSteps, currentStepIndex]);
    
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    setCurrentStepIndex(currentStepIndex - 1);
  };
  
  const handleSkip = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl animate-scale-up">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-2xl font-bold">{steps[currentStepIndex].title}</CardTitle>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
          <CardDescription className="text-base">
            {steps[currentStepIndex].description}
          </CardDescription>
          <Progress value={progressPercentage} className="h-1 mt-4" />
        </CardHeader>
        
        <CardContent className="pt-2 pb-6 min-h-[300px]">
          {steps[currentStepIndex].component}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
          <div>
            {!isFirstStep && (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            )}
            
            {onCancel && isFirstStep && (
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            {showSkip && !completedSteps.includes(currentStepIndex) && (
              <Button variant="ghost" onClick={handleSkip}>
                {isLastStep ? "Skip for now" : "Skip"}
              </Button>
            )}
            
            <Button 
              onClick={handleNext}
              className={cn("bg-shiftly-blue hover:bg-shiftly-blue/90")}
            >
              {isLastStep ? (
                <>
                  <CheckCircle2 size={16} className="mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
