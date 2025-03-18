
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'appearance';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      default:
        return <ProfileSettings />;
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        
        <div className="flex flex-col md:flex-row bg-card rounded-lg border shadow-sm overflow-hidden">
          <SettingsNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          <div className="flex-1 bg-muted/30 p-6 min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
