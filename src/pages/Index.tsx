
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { CompanySetupStep } from "@/components/onboarding/steps/CompanySetupStep";
import { InviteTeamStep } from "@/components/onboarding/steps/InviteTeamStep";
import { ScheduleTemplateStep } from "@/components/onboarding/steps/ScheduleTemplateStep";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
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
  Briefcase
} from "lucide-react";
import { InviteModal } from "@/components/team/InviteModal";
import { CreateScheduleModal } from "@/components/schedule/CreateScheduleModal";
import { PositionsRolesModal } from "@/components/positions/PositionsRolesModal";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showPositionsModal, setShowPositionsModal] = useState(false);
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    toast({
      title: "Onboarding complete!",
      description: "You're all set to start using Shiftly.",
      variant: "default",
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
  
  const setupTasks = [
    { id: 1, title: "Complete company profile", completed: true },
    { id: 2, title: "Invite team members", completed: true },
    { id: 3, title: "Create your first schedule", completed: false },
    { id: 4, title: "Set up positions and roles", completed: false },
    { id: 5, title: "Configure notification preferences", completed: false },
  ];
  
  const completedTasks = setupTasks.filter(task => task.completed).length;
  const setupProgress = (completedTasks / setupTasks.length) * 100;
  
  const quickStats = [
    { title: "Team Members", value: "4", icon: Users, color: "bg-blue-500" },
    { title: "Published Shifts", value: "12", icon: Calendar, color: "bg-green-500" },
    { title: "Open Shifts", value: "3", icon: ClipboardList, color: "bg-yellow-500" },
    { title: "Unread Messages", value: "2", icon: MessageSquare, color: "bg-purple-500" },
  ];

  const handleStartFlow = (taskId: number) => {
    switch (taskId) {
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
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to Shiftly</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
              Your all-in-one scheduling solution
            </p>
          </div>
          <Button 
            className="bg-shiftly-blue hover:bg-shiftly-blue/90"
            onClick={() => setShowOnboarding(true)}
          >
            <CheckCircle2 size={16} className="mr-2" />
            Complete Setup
          </Button>
        </div>
        
        <Card>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`h-1 ${stat.color}`} />
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-3 ${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <Avatar>
                    <div className="bg-green-100 dark:bg-green-900 h-full w-full flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600 dark:text-green-300">LC</span>
                    </div>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Laura Castro</span>{" "}
                      <span className="text-gray-500 dark:text-gray-400">accepted a shift swap with</span>{" "}
                      <span className="font-medium">Leonardo DaVinci</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Today at 2:30 PM</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Avatar>
                    <div className="bg-blue-100 dark:bg-blue-900 h-full w-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-300">LD</span>
                    </div>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Leonardo DaVinci</span>{" "}
                      <span className="text-gray-500 dark:text-gray-400">requested time off for</span>{" "}
                      <span className="font-medium">Dec 24-26, 2024</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday at 4:45 PM</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Avatar>
                    <div className="bg-purple-100 dark:bg-purple-900 h-full w-full flex items-center justify-center">
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-300">OM</span>
                    </div>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Olivia Munoz</span>{" "}
                      <span className="text-gray-500 dark:text-gray-400">clocked in 5 minutes early for their shift</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Dec 5, 2024 at 7:55 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-shiftly-blue hover:bg-shiftly-blue/90">
                <Calendar size={16} className="mr-2" />
                Create New Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users size={16} className="mr-2" />
                Invite Team Members
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail size={16} className="mr-2" />
                Send Announcements
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart4 size={16} className="mr-2" />
                View Reports
              </Button>
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
        />
      )}

      {showScheduleModal && (
        <CreateScheduleModal 
          isOpen={showScheduleModal} 
          onClose={() => setShowScheduleModal(false)} 
        />
      )}

      {showPositionsModal && (
        <PositionsRolesModal 
          isOpen={showPositionsModal} 
          onClose={() => setShowPositionsModal(false)} 
        />
      )}
    </AppLayout>
  );
};

export default Index;
