
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityItem, type ActivityItem as ActivityItemType } from "./ActivityItem";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RecentActivityProps {
  activities: ActivityItemType[];
  maxItems?: number;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities, maxItems = 5 }) => {
  const displayActivities = activities.slice(0, maxItems);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Activity</CardTitle>
        {activities.length > maxItems && (
          <Button variant="ghost" size="sm" className="text-shiftly-blue">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {displayActivities.length > 0 ? (
          displayActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="flex items-center justify-center h-40 text-gray-500">
            No recent activity
          </div>
        )}
      </CardContent>
    </Card>
  );
};
