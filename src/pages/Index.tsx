import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { CompanySetupStep } from "@/components/onboarding/steps/CompanySetupStep";
import { InviteTeamStep } from "@/components/onboarding/steps/InviteTeamStep";
import { ScheduleTemplateStep } from "@/components/onboarding/steps/ScheduleTemplateStep";
import { Progress } from "@/components/ui/progress";
import { useNotifications } from "@/contexts/NotificationContext";
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Mail, 
  Users, 
  BarChart4,
  MessageSquare,
  ClipboardList,
  Briefcase,
  HelpCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { generateMockActivities } from "@/utils/activityData";
import type { ActivityItem } from "@/components/dashboard/ActivityItem";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { generateDashboardStats } from "@/utils/dashboardData";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showPositionsModal, setShowPositionsModal] = useState(false);
  const [showCompanyProfileModal, setShowCompanyProfileModal] = useState(false);
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  
  const [setupTasks, setSetupTasks] = useState([
    { id: 1, title: "Complete company profile", completed: false },
    { id: 2, title: "Invite team members", completed: false },
    { id: 3, title: "Create your first schedule", completed: false },
    { id: 4, title: "Set up positions and roles", completed: false },
    { id: 5, title: "Configure notification preferences", completed: false },
  ]);
  
  const completedTasks = setupTasks.filter(task => task.completed).length;
  const setupProgress = (completedTasks / setupTasks.length) * 100;
  
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);
  const [showTips, setShowTips] = useState(true);
  
  const onboardingTips = [
    {
      title: "Welcome to Shiftly",
      description: "Let's get you started with creating your perfect scheduling solution!",
      element: "welcome-card",
    },
    {
      title: "Complete Your Setup",
      description: "Work through these tasks to set up your Shiftly account completely.",
      element: "setup-tasks",
    },
    {
      title: "Quick Stats",
      description: "Monitor your team and scheduling activity at a glance.",
      element: "quick-stats",
    },
    {
      title: "Quick Actions",
      description: "Access common tasks and actions directly from this menu.",
      element: "quick-actions",
    },
  ];

  const nextTip = () => {
    if (currentTip < onboardingTips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      setShowTips(false);
      localStorage.setItem('shiftlyOnboardingComplete', 'true');
    }
  };

  const skipTips = () => {
    setShowTips(false);
    localStorage.setItem('shiftlyOnboardingComplete', 'true');
  };

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('shiftlyOnboardingComplete');
    if (onboardingComplete === 'true') {
      setIsFirstTimeUser(false);
      setShowTips(false);
    }
  }, []);

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    addNotification({
      title: "Onboarding complete!",
      message: "You're all set to start using Shiftly.",
      type: "success",
    });
  };

  const handleStartFlow = (taskId: number) => {
    switch (taskId) {
      case 1: // Complete company profile
        setShowCompanyProfileModal(true);
        break;
      case 2: // Invite team members
        setShowInviteModal(true);
        break;
      case 3: // Create your first schedule
        setShowScheduleModal(true);
        break;
      case 4: // Set up positions and roles
        setShowPositionsModal(true);
        break;
      default:
        setShowOnboarding(true);
    }
  };
  
  const markTaskCompleted = (taskId: number) => {
    setSetupTasks(setupTasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  const handleCompleteCompanyProfile = () => {
    markTaskCompleted(1);
    setShowCompanyProfileModal(false);
    addNotification({
      title: "Company profile updated",
      message: "Your company profile has been saved successfully.",
      type: "success",
    });
  };

  const handleInviteTeamMembers = () => {
    markTaskCompleted(2);
    setShowInviteModal(false);
    addNotification({
      title: "Team invitations sent",
      message: "Invitations have been sent to your team members.",
      type: "success",
    });
  };

  const handleCreateSchedule = (data: any) => {
    markTaskCompleted(3);
    setShowScheduleModal(false);
    
    setTimeout(() => {
      navigate("/schedule");
    }, 1000);
  };

  const handleSetupPositions = () => {
    markTaskCompleted(4);
    setShowPositionsModal(false);
    addNotification({
      title: "Positions and roles configured",
      message: "Your positions and roles have been set up successfully.",
      type: "success",
    });
  };
  
  const onboardingSteps = [
    {
      title: "Company Setup",
      description: "Tell us about your business to customize your experience.",
      component: <CompanySetupStep />,
    },
    {
      title: "Invite Your Team",
      description: "Add team members so they can view and manage their schedules.",
      component: <InviteTeamStep />,
    },
    {
      title: "Create Schedule Template",
      description: "Set up your default schedule to save time each week.",
      component: <ScheduleTemplateStep />,
    },
  ];
  
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [dashboardStats, setDashboardStats] = useState(generateDashboardStats());

  useEffect(() => {
    setActivities(generateMockActivities(8));
    setDashboardStats(generateDashboardStats());
  }, []);

  return (
    <AppLayout>
      <TooltipProvider>
        <div className="space-y-8">
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
                    <Button variant="outline" size="sm" onClick={() => setShowTips(true)}>
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
                onClick={() => setShowOnboarding(true)}
              >
                <CheckCircle2 size={16} className="mr-2" />
                Complete Setup
              </Button>
            </div>
            
            {showTips && currentTip === 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 z-10 shadow-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <HelpCircle size={16} />
                  {onboardingTips[currentTip].title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mt-1">
                  {onboardingTips[currentTip].description}
                </p>
                <div className="flex justify-between mt-3">
                  <Button variant="outline" size="sm" onClick={skipTips}>
                    Skip
                  </Button>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={nextTip}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <DashboardStats stats={dashboardStats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card id="setup-tasks">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Getting Started</CardTitle>
                  <CardDescription>
                    Complete these tasks to get the most out of Shiftly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Setup progress</span>
                        <span className="font-medium">
                          {completedTasks}/{setupTasks.length} tasks
                        </span>
                      </div>
                      <Progress value={setupProgress} className="h-2" />
                    </div>
                    
                    <div className="space-y-3">
                      {setupTasks.map((task) => (
                        <div 
                          key={task.id} 
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div 
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                              task.completed 
                                ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            }`}
                          >
                            {task.completed ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <ArrowRight size={16} />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${task.completed ? "text-gray-500 dark:text-gray-400 line-through" : ""}`}>
                              {task.title}
                            </p>
                          </div>
                          {!task.completed && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-shiftly-blue"
                              onClick={() => handleStartFlow(task.id)}
                            >
                              Start
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            
              <div className="mt-6">
                <RecentActivity activities={activities} />
              </div>
            </div>
            
            <Card id="quick-actions">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full justify-start bg-shiftly-blue hover:bg-shiftly-blue/90"
                  onClick={() => setShowScheduleModal(true)}
                >
                  <Calendar size={16} className="mr-2" />
                  Create New Schedule
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowInviteModal(true)}
                >
                  <Users size={16} className="mr-2" />
                  Invite Team Members
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowCompanyProfileModal(true)}
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
                
                {showTips && currentTip === 3 && (
                  <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 z-10 shadow-lg">
                    <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2">
                      <HelpCircle size={16} />
                      {onboardingTips[currentTip].title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 mt-1">
                      {onboardingTips[currentTip].description}
                    </p>
                    <div className="flex justify-between mt-3">
                      <Button variant="outline" size="sm" onClick={skipTips}>
                        Skip
                      </Button>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={nextTip}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {showOnboarding && (
          <OnboardingWizard
            steps={onboardingSteps}
            onComplete={handleCompleteOnboarding}
            onCancel={() => setShowOnboarding(false)}
          />
        )}

        {showInviteModal && (
          <InviteModal 
            isOpen={showInviteModal} 
            onClose={() => setShowInviteModal(false)}
            onInvite={handleInviteTeamMembers}
          />
        )}

        {showScheduleModal && (
          <CreateScheduleModal 
            isOpen={showScheduleModal} 
            onClose={() => setShowScheduleModal(false)}
            onCreateSchedule={handleCreateSchedule}
            isFirstTimeUser={isFirstTimeUser}
          />
        )}

        {showPositionsModal && (
          <PositionsRolesModal 
            isOpen={showPositionsModal} 
            onClose={() => setShowPositionsModal(false)}
            onSubmit={handleSetupPositions}
          />
        )}

        {showCompanyProfileModal && (
          <CompanyProfileModal
            isOpen={showCompanyProfileModal}
            onClose={() => setShowCompanyProfileModal(false)}
            onSave={handleCompleteCompanyProfile}
          />
        )}
      </TooltipProvider>
    </AppLayout>
  );
};

export default Index;
