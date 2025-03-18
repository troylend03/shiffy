
import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import '../../styles/settings/AppearanceSettings.scss';

type Theme = 'light' | 'dark' | 'system';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange';
type Density = 'compact' | 'comfortable' | 'spacious';

interface AppearanceSettingsState {
  theme: Theme;
  colorScheme: ColorScheme;
  density: Density;
  animationsEnabled: boolean;
}

export class AppearanceSettings extends Component<{}, AppearanceSettingsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      theme: 'system',
      colorScheme: 'blue',
      density: 'comfortable',
      animationsEnabled: true
    };
  }
  
  handleThemeChange = (value: Theme) => {
    this.setState({ theme: value });
  };
  
  handleColorSchemeChange = (value: ColorScheme) => {
    this.setState({ colorScheme: value });
  };
  
  handleDensityChange = (value: Density) => {
    this.setState({ density: value });
  };
  
  handleAnimationsToggle = () => {
    this.setState(prevState => ({
      animationsEnabled: !prevState.animationsEnabled
    }));
  };
  
  handleSave = () => {
    // Here you would save the appearance settings to your backend
    console.log('Appearance settings saved:', this.state);
    alert('Appearance settings updated successfully');
  };
  
  render() {
    const { theme, colorScheme, density, animationsEnabled } = this.state;
    
    return (
      <div className="appearance-settings">
        <h2 className="section-title">Appearance Settings</h2>
        <p className="section-description">Customize how Shiftly looks and feels for you.</p>
        
        <Card className="appearance-card">
          <CardHeader>
            <CardTitle>Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={theme} 
              onValueChange={(value) => this.handleThemeChange(value as Theme)}
              className="theme-options"
            >
              <div className={`theme-option ${theme === 'light' ? 'selected' : ''}`}>
                <div className="theme-preview theme-preview-light">
                  {theme === 'light' && <Check className="theme-check" size={18} />}
                </div>
                <div className="theme-details">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light">Light</Label>
                </div>
              </div>
              
              <div className={`theme-option ${theme === 'dark' ? 'selected' : ''}`}>
                <div className="theme-preview theme-preview-dark">
                  {theme === 'dark' && <Check className="theme-check" size={18} />}
                </div>
                <div className="theme-details">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark">Dark</Label>
                </div>
              </div>
              
              <div className={`theme-option ${theme === 'system' ? 'selected' : ''}`}>
                <div className="theme-preview theme-preview-system">
                  {theme === 'system' && <Check className="theme-check" size={18} />}
                </div>
                <div className="theme-details">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system">System Default</Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card className="appearance-card">
          <CardHeader>
            <CardTitle>Color Scheme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="color-scheme-options">
              <div 
                className={`color-option color-blue ${colorScheme === 'blue' ? 'selected' : ''}`}
                onClick={() => this.handleColorSchemeChange('blue')}
              >
                {colorScheme === 'blue' && <Check className="color-check" size={16} />}
              </div>
              <div 
                className={`color-option color-purple ${colorScheme === 'purple' ? 'selected' : ''}`}
                onClick={() => this.handleColorSchemeChange('purple')}
              >
                {colorScheme === 'purple' && <Check className="color-check" size={16} />}
              </div>
              <div 
                className={`color-option color-green ${colorScheme === 'green' ? 'selected' : ''}`}
                onClick={() => this.handleColorSchemeChange('green')}
              >
                {colorScheme === 'green' && <Check className="color-check" size={16} />}
              </div>
              <div 
                className={`color-option color-orange ${colorScheme === 'orange' ? 'selected' : ''}`}
                onClick={() => this.handleColorSchemeChange('orange')}
              >
                {colorScheme === 'orange' && <Check className="color-check" size={16} />}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="appearance-card">
          <CardHeader>
            <CardTitle>Layout Density</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={density} 
              onValueChange={(value) => this.handleDensityChange(value as Density)}
              className="density-options"
            >
              <div className="density-option">
                <RadioGroupItem value="compact" id="density-compact" />
                <Label htmlFor="density-compact">Compact</Label>
              </div>
              
              <div className="density-option">
                <RadioGroupItem value="comfortable" id="density-comfortable" />
                <Label htmlFor="density-comfortable">Comfortable</Label>
              </div>
              
              <div className="density-option">
                <RadioGroupItem value="spacious" id="density-spacious" />
                <Label htmlFor="density-spacious">Spacious</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card className="appearance-card">
          <CardHeader>
            <CardTitle>Animation & Effects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animation-toggle">
              <Button 
                variant={animationsEnabled ? "default" : "outline"}
                onClick={this.handleAnimationsToggle}
                className="toggle-button"
              >
                {animationsEnabled ? 'Enabled' : 'Disabled'}
              </Button>
              <p className="toggle-description">
                {animationsEnabled 
                  ? 'Animations are currently enabled. Interface will use transitions and effects.' 
                  : 'Animations are currently disabled. Interface will be more static.'}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="button-container">
          <Button onClick={this.handleSave}>Save Changes</Button>
        </div>
      </div>
    );
  }
}
