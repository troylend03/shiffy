
import React, { Component } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { CompanySetupStep } from "@/components/onboarding/steps/CompanySetupStep";
import { InviteTeamStep } from "@/components/onboarding/steps/InviteTeamStep";
import { ScheduleTemplateStep } from "@/components/onboarding/steps/ScheduleTemplateStep";
import { useNotifications } from "@/contexts/NotificationContext";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { generateMockActivities } from "@/utils/activityData";
import type { ActivityItem } from "@/components/dashboard/ActivityItem";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { generateDashboardStats } from "@/utils/dashboardData";
import { useNavigate } from "react-router-dom";
import { InviteModal } from "@/components/team/InviteModal";
import { CreateScheduleModal } from "@/components/schedule/CreateScheduleModal";
import { PositionsRolesModal } from "@/components/positions/PositionsRolesModal";
import { CompanyProfileModal } from "@/components/company/CompanyProfileModal";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { SetupTasks } from "@/components/dashboard/SetupTasks";
import { QuickActions } from "@/components/dashboard/QuickActions";

interface SetupTask {
  id: number;
  title: string;
  completed: boolean;
}

interface IndexState {
  showOnboarding: boolean;
  showInviteModal: boolean;
  showScheduleModal: boolean;
  showPositionsModal: boolean;
  showCompanyProfileModal: boolean;
  setupTasks: SetupTask[];
  isFirstTimeUser: boolean;
  currentTip: number;
  showTips: boolean;
  activities: ActivityItem[];
  dashboardStats: any;
}

class Index extends Component<{}, IndexState> {
  private notificationContext = useNotifications();
  private navigate = useNavigate();
  
  onboardingTips = [
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
  
  onboardingSteps = [
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
  
  constructor(props: {}) {
    super(props);
    
    this.state = {
      showOnboarding: false,
      showInviteModal: false,
      showScheduleModal: false,
      showPositionsModal: false,
      showCompanyProfileModal: false,
      setupTasks: [
        { id: 1, title: "Complete company profile", completed: false },
        { id: 2, title: "Invite team members", completed: false },
        { id: 3, title: "Create your first schedule", completed: false },
        { id: 4, title: "Set up positions and roles", completed: false },
        { id: 5, title: "Configure notification preferences", completed: false },
      ],
      isFirstTimeUser: true,
      currentTip: 0,
      showTips: true,
      activities: [],
      dashboardStats: generateDashboardStats()
    };
  }
  
  componentDidMount() {
    // Check onboarding status
    const onboardingComplete = localStorage.getItem('shiftlyOnboardingComplete');
    if (onboardingComplete === 'true') {
      this.setState({
        isFirstTimeUser: false,
        showTips: false
      });
    }
    
    // Load activities and stats
    this.setState({
      activities: generateMockActivities(8),
      dashboardStats: generateDashboardStats()
    });
  }
  
  nextTip = () => {
    const { currentTip } = this.state;
    
    if (currentTip < this.onboardingTips.length - 1) {
      this.setState({ currentTip: currentTip + 1 });
    } else {
      this.setState({ showTips: false });
      localStorage.setItem('shiftlyOnboardingComplete', 'true');
    }
  };

  skipTips = () => {
    this.setState({ showTips: false });
    localStorage.setItem('shiftlyOnboardingComplete', 'true');
  };
  
  handleCompleteOnboarding = () => {
    this.setState({ showOnboarding: false });
    this.notificationContext.addNotification({
      title: "Onboarding complete!",
      message: "You're all set to start using Shiftly.",
      type: "success",
    });
  };

  handleStartFlow = (taskId: number) => {
    switch (taskId) {
      case 1: // Complete company profile
        this.setState({ showCompanyProfileModal: true });
        break;
      case 2: // Invite team members
        this.setState({ showInviteModal: true });
        break;
      case 3: // Create your first schedule
        this.setState({ showScheduleModal: true });
        break;
      case 4: // Set up positions and roles
        this.setState({ showPositionsModal: true });
        break;
      default:
        this.setState({ showOnboarding: true });
    }
  };
  
  markTaskCompleted = (taskId: number) => {
    this.setState(prevState => ({
      setupTasks: prevState.setupTasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    }));
  };

  handleCompleteCompanyProfile = () => {
    this.markTaskCompleted(1);
    this.setState({ showCompanyProfileModal: false });
    this.notificationContext.addNotification({
      title: "Company profile updated",
      message: "Your company profile has been saved successfully.",
      type: "success",
    });
  };

  handleInviteTeamMembers = () => {
    this.markTaskCompleted(2);
    this.setState({ showInviteModal: false });
    this.notificationContext.addNotification({
      title: "Team invitations sent",
      message: "Invitations have been sent to your team members.",
      type: "success",
    });
  };

  handleCreateSchedule = (data: any) => {
    this.markTaskCompleted(3);
    this.setState({ showScheduleModal: false });
    
    setTimeout(() => {
      this.navigate("/schedule");
    }, 1000);
  };

  handleSetupPositions = () => {
    this.markTaskCompleted(4);
    this.setState({ showPositionsModal: false });
    this.notificationContext.addNotification({
      title: "Positions and roles configured",
      message: "Your positions and roles have been set up successfully.",
      type: "success",
    });
  };
  
  getSetupProgress = () => {
    const { setupTasks } = this.state;
    const completedTasks = setupTasks.filter(task => task.completed).length;
    return (completedTasks / setupTasks.length) * 100;
  };
  
  getCurrentTipDetails = () => {
    const { currentTip } = this.state;
    if (currentTip >= 0 && currentTip < this.onboardingTips.length) {
      return {
        title: this.onboardingTips[currentTip].title,
        description: this.onboardingTips[currentTip].description
      };
    }
    return null;
  };

  render() {
    const { 
      showOnboarding, 
      showInviteModal, 
      showScheduleModal, 
      showPositionsModal, 
      showCompanyProfileModal,
      setupTasks,
      isFirstTimeUser,
      currentTip,
      showTips,
      activities,
      dashboardStats
    } = this.state;
    
    const setupProgress = this.getSetupProgress();
    const tipDetails = this.getCurrentTipDetails();

    return (
      <AppLayout>
        <TooltipProvider>
          <div className="space-y-8">
            <WelcomeCard 
              isFirstTimeUser={isFirstTimeUser}
              showTips={showTips}
              currentTip={currentTip}
              onStartSetup={() => this.setState({ showOnboarding: true })}
              onStartGuide={() => this.setState({ showTips: true })}
              onSkipTips={this.skipTips}
              onNextTip={this.nextTip}
              tipDetails={tipDetails}
            />
            
            <DashboardStats stats={dashboardStats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SetupTasks 
                  setupTasks={setupTasks}
                  setupProgress={setupProgress}
                  onStartTask={this.handleStartFlow}
                />
              
                <div className="mt-6">
                  <RecentActivity activities={activities} />
                </div>
              </div>
              
              <QuickActions 
                onCreateSchedule={() => this.setState({ showScheduleModal: true })}
                onInviteTeam={() => this.setState({ showInviteModal: true })}
                onEditCompanyProfile={() => this.setState({ showCompanyProfileModal: true })}
                showTip={showTips}
                currentTip={currentTip}
                onSkipTips={this.skipTips}
                onNextTip={this.nextTip}
                tipDetails={tipDetails ? {
                  title: tipDetails.title,
                  description: tipDetails.description
                } : { title: "", description: "" }}
              />
            </div>
          </div>
          
          {showOnboarding && (
            <OnboardingWizard
              steps={this.onboardingSteps}
              onComplete={this.handleCompleteOnboarding}
              onCancel={() => this.setState({ showOnboarding: false })}
            />
          )}

          {showInviteModal && (
            <InviteModal 
              isOpen={showInviteModal} 
              onClose={() => this.setState({ showInviteModal: false })}
              onInvite={this.handleInviteTeamMembers}
            />
          )}

          {showScheduleModal && (
            <CreateScheduleModal 
              isOpen={showScheduleModal} 
              onClose={() => this.setState({ showScheduleModal: false })}
              onCreateSchedule={this.handleCreateSchedule}
              isFirstTimeUser={isFirstTimeUser}
            />
          )}

          {showPositionsModal && (
            <PositionsRolesModal 
              isOpen={showPositionsModal} 
              onClose={() => this.setState({ showPositionsModal: false })}
              onSubmit={this.handleSetupPositions}
            />
          )}

          {showCompanyProfileModal && (
            <CompanyProfileModal
              isOpen={showCompanyProfileModal}
              onClose={() => this.setState({ showCompanyProfileModal: false })}
              onSave={this.handleCompleteCompanyProfile}
            />
          )}
        </TooltipProvider>
      </AppLayout>
    );
  }
}

export default Index;
