
import React from 'react';
import { User, Bell, Shield, Paintbrush } from 'lucide-react';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'appearance';

interface SettingsNavProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export const SettingsNav = ({ activeTab, onTabChange }: SettingsNavProps) => {
  const navItems = [
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
  
  return (
    <div className="w-full md:w-60 bg-card border-b md:border-b-0 md:border-r border-border">
      <nav className="py-2">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li 
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors
                ${activeTab === item.id 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
