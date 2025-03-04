
import React from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { TaskReminder } from "./TaskReminder";

export const NotificationCenter = () => {
  const { notifications } = useNotifications();
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <TaskReminder key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
