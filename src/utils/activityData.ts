
import type { ActivityItem, ActivityType } from "@/components/dashboard/ActivityItem";
import { format, subHours, subDays, subMinutes } from "date-fns";

// Helper function to format dates
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.round((now.getTime() - date.getTime()) / (1000 * 60));
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.round(diffInHours / 24);
  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
};

// Sample users
const users = [
  { id: "u1", name: "Sarah Chen", avatar: "" },
  { id: "u2", name: "Miguel Rodriguez", avatar: "" },
  { id: "u3", name: "James Wilson", avatar: "" },
  { id: "u4", name: "Ava Johnson", avatar: "" },
];

// Generate mock activity data
export const generateMockActivities = (count: number = 10): ActivityItem[] => {
  const activities: ActivityItem[] = [];
  const activityTypes: ActivityType[] = [
    "shift_created", 
    "shift_assigned", 
    "team_joined", 
    "message_sent", 
    "time_off_approved", 
    "company_updated",
    "announcement"
  ];
  
  for (let i = 0; i < count; i++) {
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const date = subMinutes(subHours(new Date(), i % 24), i * 7);
    
    let title = "";
    let description = "";
    
    switch (type) {
      case "shift_created":
        title = "New schedule created";
        description = `${user.name} created a new schedule for the week of ${format(subDays(new Date(), 7), 'MMM d')}.`;
        break;
      case "shift_assigned":
        title = "Shift assigned";
        description = `${user.name} was assigned to a ${Math.random() > 0.5 ? 'morning' : 'evening'} shift on ${format(subDays(new Date(), Math.floor(Math.random() * 7)), 'EEEE')}.`;
        break;
      case "team_joined":
        title = "New team member";
        description = `${user.name} joined the team.`;
        break;
      case "message_sent":
        title = "New message";
        description = `${user.name} sent a message to the team.`;
        break;
      case "time_off_approved":
        title = "Time off approved";
        description = `${user.name}'s time off request was approved.`;
        break;
      case "company_updated":
        title = "Company profile updated";
        description = "Company profile information was updated.";
        break;
      case "announcement":
        title = "New announcement";
        description = `${user.name} posted a new announcement to the team.`;
        break;
    }
    
    activities.push({
      id: `a${i+1}`,
      type,
      title,
      description,
      timestamp: formatTimeAgo(date),
      user
    });
  }
  
  return activities;
};
