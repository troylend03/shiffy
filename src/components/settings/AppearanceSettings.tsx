
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

type Theme = 'light' | 'dark' | 'system';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange';
type Density = 'compact' | 'comfortable' | 'spacious';

interface AppearanceSettingsState {
  theme: Theme;
  colorScheme: ColorScheme;
  density: Density;
  animationsEnabled: boolean;
}

export const AppearanceSettings = () => {
  const [settings, setSettings] = useState<AppearanceSettingsState>({
    theme: 'system',
    colorScheme: 'blue',
    density: 'comfortable',
    animationsEnabled: true
  });
  
  const handleThemeChange = (value: Theme) => {
    setSettings(prev => ({ ...prev, theme: value }));
  };
  
  const handleColorSchemeChange = (value: ColorScheme) => {
    setSettings(prev => ({ ...prev, colorScheme: value }));
  };
  
  const handleDensityChange = (value: Density) => {
    setSettings(prev => ({ ...prev, density: value }));
  };
  
  const handleAnimationsToggle = () => {
    setSettings(prev => ({
      ...prev,
      animationsEnabled: !prev.animationsEnabled
    }));
  };
  
  const handleSave = () => {
    // Here you would save the appearance settings to your backend
    console.log('Appearance settings saved:', settings);
    toast.success('Appearance settings updated successfully');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Appearance Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize how Shiftly looks and feels for you.
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={settings.theme} 
            onValueChange={(value) => handleThemeChange(value as Theme)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div 
              className={`border rounded-md p-2 cursor-pointer transition-all ${
                settings.theme === 'light' ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              <div className="bg-[#f9fafb] h-20 rounded flex items-center justify-center mb-2 relative border">
                {settings.theme === 'light' && <Check className="text-primary" size={18} />}
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light">Light</Label>
              </div>
            </div>
            
            <div 
              className={`border rounded-md p-2 cursor-pointer transition-all ${
                settings.theme === 'dark' ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              <div className="bg-[#111827] h-20 rounded flex items-center justify-center mb-2 relative border border-gray-700">
                {settings.theme === 'dark' && <Check className="text-primary" size={18} />}
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark">Dark</Label>
              </div>
            </div>
            
            <div 
              className={`border rounded-md p-2 cursor-pointer transition-all ${
                settings.theme === 'system' ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              <div className="bg-gradient-to-r from-[#f9fafb] to-[#111827] h-20 rounded flex items-center justify-center mb-2 relative border">
                {settings.theme === 'system' && <Check className="text-primary" size={18} />}
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system">System Default</Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div 
              className={`h-10 w-10 rounded-full cursor-pointer bg-blue-500 transition-all flex items-center justify-center ${
                settings.colorScheme === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              onClick={() => handleColorSchemeChange('blue')}
            >
              {settings.colorScheme === 'blue' && <Check className="text-white" size={16} />}
            </div>
            <div 
              className={`h-10 w-10 rounded-full cursor-pointer bg-purple-500 transition-all flex items-center justify-center ${
                settings.colorScheme === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''
              }`}
              onClick={() => handleColorSchemeChange('purple')}
            >
              {settings.colorScheme === 'purple' && <Check className="text-white" size={16} />}
            </div>
            <div 
              className={`h-10 w-10 rounded-full cursor-pointer bg-green-500 transition-all flex items-center justify-center ${
                settings.colorScheme === 'green' ? 'ring-2 ring-offset-2 ring-green-500' : ''
              }`}
              onClick={() => handleColorSchemeChange('green')}
            >
              {settings.colorScheme === 'green' && <Check className="text-white" size={16} />}
            </div>
            <div 
              className={`h-10 w-10 rounded-full cursor-pointer bg-orange-500 transition-all flex items-center justify-center ${
                settings.colorScheme === 'orange' ? 'ring-2 ring-offset-2 ring-orange-500' : ''
              }`}
              onClick={() => handleColorSchemeChange('orange')}
            >
              {settings.colorScheme === 'orange' && <Check className="text-white" size={16} />}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Layout Density</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={settings.density} 
            onValueChange={(value) => handleDensityChange(value as Density)}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="density-compact" />
              <Label htmlFor="density-compact">Compact</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="density-comfortable" />
              <Label htmlFor="density-comfortable">Comfortable</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spacious" id="density-spacious" />
              <Label htmlFor="density-spacious">Spacious</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Animation & Effects</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Button 
              variant={settings.animationsEnabled ? "default" : "outline"}
              onClick={handleAnimationsToggle}
              className="mb-3"
            >
              {settings.animationsEnabled ? 'Enabled' : 'Disabled'}
            </Button>
            <p className="text-sm text-muted-foreground">
              {settings.animationsEnabled 
                ? 'Animations are currently enabled. Interface will use transitions and effects.' 
                : 'Animations are currently disabled. Interface will be more static.'}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};
