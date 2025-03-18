
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

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

export const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettingsState>({
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
  });
  
  const handleToggle = (section: keyof NotificationSettingsState, id: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: prev[section].map(option => 
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    }));
  };
  
  const renderNotificationOptions = (
    options: NotificationOption[],
    section: keyof NotificationSettingsState
  ) => {
    return options.map(option => (
      <div key={option.id} className="flex justify-between items-center py-3">
        <div className="space-y-1">
          <Label htmlFor={option.id} className="font-medium">{option.label}</Label>
          <p className="text-sm text-muted-foreground">{option.description}</p>
        </div>
        <Switch
          id={option.id}
          checked={option.enabled}
          onCheckedChange={() => handleToggle(section, option.id)}
        />
      </div>
    ));
  };
  
  const handleSave = () => {
    // Here you would save the notification settings to your backend
    console.log('Notification settings saved:', settings);
    toast.success('Notification settings updated successfully');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Notification Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage how you receive notifications from Shiftly.
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {settings.emailNotifications.map((option, index) => (
            <React.Fragment key={option.id}>
              {index > 0 && <Separator />}
              <div className="flex justify-between items-center py-3">
                <div className="space-y-1">
                  <Label htmlFor={option.id} className="font-medium">{option.label}</Label>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <Switch
                  id={option.id}
                  checked={option.enabled}
                  onCheckedChange={() => handleToggle('emailNotifications', option.id)}
                />
              </div>
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {settings.pushNotifications.map((option, index) => (
            <React.Fragment key={option.id}>
              {index > 0 && <Separator />}
              <div className="flex justify-between items-center py-3">
                <div className="space-y-1">
                  <Label htmlFor={option.id} className="font-medium">{option.label}</Label>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <Switch
                  id={option.id}
                  checked={option.enabled}
                  onCheckedChange={() => handleToggle('pushNotifications', option.id)}
                />
              </div>
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>SMS Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {settings.smsNotifications.map((option, index) => (
            <React.Fragment key={option.id}>
              {index > 0 && <Separator />}
              <div className="flex justify-between items-center py-3">
                <div className="space-y-1">
                  <Label htmlFor={option.id} className="font-medium">{option.label}</Label>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <Switch
                  id={option.id}
                  checked={option.enabled}
                  onCheckedChange={() => handleToggle('smsNotifications', option.id)}
                />
              </div>
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};
