
import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import '../../styles/settings/NotificationSettings.scss';

interface NotificationOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface NotificationSettingsState {
  emailNotifications: NotificationOption[];
  pushNotifications: NotificationOption[];
  smsNotifications: NotificationOption[];
}

export class NotificationSettings extends Component<{}, NotificationSettingsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      emailNotifications: [
        {
          id: 'shift-assignments',
          label: 'Shift Assignments',
          description: 'Receive an email when you are assigned to a new shift',
          enabled: true
        },
        {
          id: 'schedule-changes',
          label: 'Schedule Changes',
          description: 'Receive an email when your schedule has changed',
          enabled: true
        },
        {
          id: 'shift-reminders',
          label: 'Shift Reminders',
          description: 'Receive reminders before your shifts start',
          enabled: true
        },
        {
          id: 'time-off-requests',
          label: 'Time Off Requests',
          description: 'Receive updates about your time off requests',
          enabled: true
        }
      ],
      pushNotifications: [
        {
          id: 'push-shift-assignments',
          label: 'Shift Assignments',
          description: 'Receive a notification when you are assigned to a new shift',
          enabled: true
        },
        {
          id: 'push-schedule-changes',
          label: 'Schedule Changes',
          description: 'Receive a notification when your schedule has changed',
          enabled: true
        },
        {
          id: 'push-shift-reminders',
          label: 'Shift Reminders',
          description: 'Receive reminders before your shifts start',
          enabled: false
        }
      ],
      smsNotifications: [
        {
          id: 'sms-urgent-updates',
          label: 'Urgent Updates',
          description: 'Receive SMS for urgent schedule changes',
          enabled: false
        },
        {
          id: 'sms-shift-reminders',
          label: 'Shift Reminders',
          description: 'Receive SMS reminders before your shifts start',
          enabled: false
        }
      ]
    };
  }
  
  handleToggle = (section: keyof NotificationSettingsState, id: string) => {
    this.setState(prevState => ({
      ...prevState,
      [section]: prevState[section].map(option => 
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    }));
  };
  
  renderNotificationOptions = (
    options: NotificationOption[],
    section: keyof NotificationSettingsState
  ) => {
    return options.map(option => (
      <div key={option.id} className="notification-option">
        <div className="notification-option-info">
          <Label htmlFor={option.id} className="notification-label">{option.label}</Label>
          <p className="notification-description">{option.description}</p>
        </div>
        <Switch
          id={option.id}
          checked={option.enabled}
          onCheckedChange={() => this.handleToggle(section, option.id)}
        />
      </div>
    ));
  };
  
  handleSave = () => {
    // Here you would save the notification settings to your backend
    console.log('Notification settings saved:', this.state);
    // Show success message
    alert('Notification settings updated successfully');
  };
  
  render() {
    return (
      <div className="notification-settings">
        <h2 className="section-title">Notification Settings</h2>
        <p className="section-description">Manage how you receive notifications from Shiftly.</p>
        
        <Card className="notification-card">
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {this.renderNotificationOptions(this.state.emailNotifications, 'emailNotifications')}
          </CardContent>
        </Card>
        
        <Card className="notification-card">
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {this.renderNotificationOptions(this.state.pushNotifications, 'pushNotifications')}
          </CardContent>
        </Card>
        
        <Card className="notification-card">
          <CardHeader>
            <CardTitle>SMS Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {this.renderNotificationOptions(this.state.smsNotifications, 'smsNotifications')}
          </CardContent>
        </Card>
        
        <div className="button-container">
          <Button onClick={this.handleSave}>Save Changes</Button>
        </div>
      </div>
    );
  }
}
