
import React, { Component } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MessageSquare, 
  UserPlus, 
  Clock, 
  ClipboardCheck, 
  Briefcase,
  Bell
} from "lucide-react";
import "../../styles/ActivityItem.scss";

export type ActivityType = 
  | "shift_created" 
  | "shift_assigned" 
  | "team_joined" 
  | "message_sent" 
  | "time_off_approved" 
  | "company_updated"
  | "announcement";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface ActivityItemProps {
  activity: ActivityItem;
}

export class ActivityItem extends Component<ActivityItemProps> {
  getIcon() {
    const { activity } = this.props;
    
    switch (activity.type) {
      case "shift_created":
      case "shift_assigned":
        return <Calendar className="h-4 w-4" />;
      case "team_joined":
        return <UserPlus className="h-4 w-4" />;
      case "message_sent":
        return <MessageSquare className="h-4 w-4" />;
      case "time_off_approved":
        return <Clock className="h-4 w-4" />;
      case "company_updated":
        return <Briefcase className="h-4 w-4" />;
      case "announcement":
        return <Bell className="h-4 w-4" />;
      default:
        return <ClipboardCheck className="h-4 w-4" />;
    }
  }

  getIconClassName() {
    const { activity } = this.props;
    
    switch (activity.type) {
      case "shift_created":
        return "activity-item__icon--shift-created";
      case "shift_assigned":
        return "activity-item__icon--shift-assigned";
      case "team_joined":
        return "activity-item__icon--team-joined";
      case "message_sent":
        return "activity-item__icon--message-sent";
      case "time_off_approved":
        return "activity-item__icon--time-off-approved";
      case "company_updated":
        return "activity-item__icon--company-updated";
      case "announcement":
        return "activity-item__icon--announcement";
      default:
        return "";
    }
  }

  render() {
    const { activity } = this.props;
    
    return (
      <div className="activity-item">
        <div className={`activity-item__icon ${this.getIconClassName()}`}>
          {this.getIcon()}
        </div>
        <div className="activity-item__content">
          <div className="activity-item__content-header">
            <p className="activity-item__content-header-title">{activity.title}</p>
            <span className="activity-item__content-header-timestamp">{activity.timestamp}</span>
          </div>
          <p className="activity-item__content-description">{activity.description}</p>
        </div>
      </div>
    );
  }
}
