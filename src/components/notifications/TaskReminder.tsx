
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, X, ArrowRight } from "lucide-react";
import { useNotifications, Notification } from "@/contexts/NotificationContext";

interface TaskReminderProps {
  notification: Notification;
}

export const TaskReminder = ({ notification }: TaskReminderProps) => {
  const { removeNotification } = useNotifications();

  const handleDismiss = () => {
    removeNotification(notification.id);
  };

  const handleAction = () => {
    if (notification.actionFn) {
      notification.actionFn();
    }
    if (notification.dismissible !== false) {
      removeNotification(notification.id);
    }
  };

  return (
    <Card className="shadow-md border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 dark:bg-amber-800 rounded-full p-2 mt-0.5">
              <AlertTriangle size={16} className="text-amber-600 dark:text-amber-300" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                {notification.title}
              </h4>
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                {notification.message}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {notification.actionText && (
              <Button 
                variant="ghost"
                size="sm" 
                onClick={handleAction}
                className="text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800"
              >
                {notification.actionText}
                <ArrowRight size={14} className="ml-1" />
              </Button>
            )}
            
            {notification.dismissible !== false && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-8 w-8 rounded-full text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800"
              >
                <X size={14} />
                <span className="sr-only">Dismiss</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
