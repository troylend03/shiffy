
import React, { Component } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityItem, type ActivityItem as ActivityItemType } from "./ActivityItem";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import "../../styles/RecentActivity.scss";

interface RecentActivityProps {
  activities: ActivityItemType[];
  maxItems?: number;
}

interface RecentActivityState {
  displayActivities: ActivityItemType[];
}

export class RecentActivity extends Component<RecentActivityProps, RecentActivityState> {
  static defaultProps = {
    maxItems: 5
  };

  constructor(props: RecentActivityProps) {
    super(props);
    this.state = {
      displayActivities: props.activities.slice(0, props.maxItems)
    };
  }

  componentDidUpdate(prevProps: RecentActivityProps) {
    if (prevProps.activities !== this.props.activities || prevProps.maxItems !== this.props.maxItems) {
      this.setState({
        displayActivities: this.props.activities.slice(0, this.props.maxItems)
      });
    }
  }

  render() {
    const { activities, maxItems } = this.props;
    const { displayActivities } = this.state;
    
    return (
      <Card className="recent-activity__card">
        <CardHeader className="recent-activity__card-header">
          <CardTitle className="recent-activity__card-header-title">Recent Activity</CardTitle>
          {activities.length > maxItems! && (
            <Button variant="ghost" size="sm" className="recent-activity__view-all">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="recent-activity__card-content">
          {displayActivities.length > 0 ? (
            displayActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="empty-state">
              No recent activity
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}
