
import React, { Component } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import '../styles/settings/Settings.scss';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'appearance';

interface SettingsState {
  activeTab: SettingsTab;
}

class Settings extends Component<{}, SettingsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeTab: 'profile'
    };
  }
  
  setActiveTab = (tab: SettingsTab) => {
    this.setState({ activeTab: tab });
  };
  
  renderTabContent() {
    const { activeTab } = this.state;
    
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
  }
  
  render() {
    return (
      <AppLayout>
        <div className="settings-container">
          <h1 className="settings-title">Settings</h1>
          
          <div className="settings-content">
            <SettingsNav 
              activeTab={this.state.activeTab} 
              onTabChange={this.setActiveTab} 
            />
            <div className="settings-panel">
              {this.renderTabContent()}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
}

export default Settings;
