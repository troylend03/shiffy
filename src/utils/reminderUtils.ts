
import { Notification } from "@/contexts/NotificationContext";

export type ReminderType = 
  | "onboarding_incomplete" 
  | "schedule_creation" 
  | "invite_team" 
  | "first_publish" 
  | "shift_requests";

export interface ReminderTemplate {
  type: ReminderType;
  title: string;
  message: string;
  notificationType: Notification["type"];
  actionText?: string;
  dismissible?: boolean;
  autoDismiss?: boolean;
  autoDismissTimeout?: number;
}

// Map of reminder templates for different reminders
export const reminderTemplates: Record<ReminderType, ReminderTemplate> = {
  onboarding_incomplete: {
    type: "onboarding_incomplete",
    title: "Complete your onboarding",
    message: "Finish setting up your account to get the most out of Shiftly.",
    notificationType: "info",
    actionText: "Continue Setup",
    dismissible: true,
  },
  schedule_creation: {
    type: "schedule_creation",
    title: "Create your first schedule",
    message: "Your team is waiting for their schedule. Create your first schedule to keep everyone informed.",
    notificationType: "warning",
    actionText: "Create Schedule",
    dismissible: true,
  },
  invite_team: {
    type: "invite_team",
    title: "Invite your team",
    message: "Add team members so they can view and manage their schedules.",
    notificationType: "info",
    actionText: "Invite Team",
    dismissible: true,
  },
  first_publish: {
    type: "first_publish",
    title: "Publish your schedule",
    message: "Your schedule is ready to be published. Publish it so your team can see their shifts.",
    notificationType: "info",
    actionText: "Publish Schedule",
    dismissible: true,
  },
  shift_requests: {
    type: "shift_requests",
    title: "Pending shift requests",
    message: "You have shift swap requests waiting for your approval.",
    notificationType: "warning",
    actionText: "View Requests",
    dismissible: true,
    autoDismiss: false,
  },
};

// Function to create reminder based on type
export const createReminder = (
  type: ReminderType, 
  overrides: Partial<Omit<Notification, "id" | "type">> = {}
): Omit<Notification, "id"> => {
  const template = reminderTemplates[type];
  
  return {
    title: template.title,
    message: template.message,
    type: template.notificationType,
    actionText: template.actionText,
    dismissible: template.dismissible ?? true,
    autoDismiss: template.autoDismiss ?? true,
    autoDismissTimeout: template.autoDismissTimeout ?? 5000,
    ...overrides,
  };
};
