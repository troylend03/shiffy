
import React, { Component } from 'react';
import { User, Bell, Shield, Paintbrush } from 'lucide-react';
import '../../styles/settings/SettingsNav.scss';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'appearance';

interface SettingsNavProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export class SettingsNav extends Component<SettingsNavProps> {
  navItems = [
    {
      id: 'profile' as SettingsTab,
      label: 'Profile',
      icon: User
    },
    {
      id: 'notifications' as SettingsTab,
      label: 'Notifications',
      icon: Bell
    },
    {
      id: 'security' as SettingsTab,
      label: 'Security',
      icon: Shield
    },
    {
      id: 'appearance' as SettingsTab,
      label: 'Appearance',
      icon: Paintbrush
    }
  ];
  
  render() {
    const { activeTab, onTabChange } = this.props;
    
    return (
      <div className="settings-nav">
        <ul className="settings-nav-list">
          {this.navItems.map((item) => (
            <li 
              key={item.id}
              className={`settings-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
