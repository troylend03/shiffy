
import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Shield, Key, AlertCircle } from 'lucide-react';
import '../../styles/settings/SecuritySettings.scss';

interface SecuritySettingsState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactor: boolean;
  sessionExpiry: string;
  showNotificationForLogins: boolean;
}

export class SecuritySettings extends Component<{}, SecuritySettingsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactor: false,
      sessionExpiry: '1 week',
      showNotificationForLogins: true
    };
  }
  
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  
  handleCheckboxChange = (name: string, checked: boolean) => {
    this.setState({ ...this.state, [name]: checked });
  };
  
  handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (this.state.newPassword !== this.state.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (this.state.newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    
    // Here you would call your API to change the password
    console.log('Password change requested');
    alert('Password changed successfully');
    
    // Reset form
    this.setState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  render() {
    return (
      <div className="security-settings">
        <h2 className="section-title">Security Settings</h2>
        <p className="section-description">Protect your account and maintain control over your data access.</p>
        
        <Card className="security-card">
          <CardHeader>
            <CardTitle className="card-title-with-icon">
              <Key size={18} />
              <span>Change Password</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={this.handleChangePassword}>
              <div className="form-group">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={this.state.currentPassword}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={this.state.newPassword}
                  onChange={this.handleInputChange}
                  required
                />
                <p className="input-hint">Password must be at least 8 characters long</p>
              </div>
              
              <div className="form-group">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="security-card">
          <CardHeader>
            <CardTitle className="card-title-with-icon">
              <Shield size={18} />
              <span>Security Options</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="security-option">
              <div className="security-option-info">
                <Label htmlFor="twoFactor" className="security-label">Two-Factor Authentication</Label>
                <p className="security-description">Add an extra layer of security to your account</p>
              </div>
              <div className="security-option-control">
                {this.state.twoFactor ? (
                  <Button size="sm" variant="outline" onClick={() => this.handleCheckboxChange('twoFactor', false)}>Disable</Button>
                ) : (
                  <Button size="sm" onClick={() => this.handleCheckboxChange('twoFactor', true)}>Enable</Button>
                )}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="security-option">
              <div className="security-option-info">
                <Label htmlFor="sessionExpiry" className="security-label">Session Expiry</Label>
                <p className="security-description">Automatically sign out after period of inactivity</p>
              </div>
              <div className="security-option-control">
                <select 
                  id="sessionExpiry"
                  value={this.state.sessionExpiry}
                  onChange={(e) => this.setState({ sessionExpiry: e.target.value })}
                  className="security-select"
                >
                  <option value="1 day">1 day</option>
                  <option value="1 week">1 week</option>
                  <option value="30 days">30 days</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="security-option">
              <div className="security-option-info">
                <Label className="security-label">Login Notifications</Label>
                <p className="security-description">Get notified of new logins to your account</p>
              </div>
              <div className="security-option-control">
                <div className="checkbox-with-label">
                  <Checkbox 
                    id="showNotificationForLogins"
                    checked={this.state.showNotificationForLogins}
                    onCheckedChange={(checked) => 
                      this.handleCheckboxChange('showNotificationForLogins', Boolean(checked))
                    }
                  />
                  <label htmlFor="showNotificationForLogins">Enable</label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="security-card">
          <CardHeader>
            <CardTitle className="card-title-with-icon">
              <AlertCircle size={18} />
              <span>Account Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="activity-log">
              <p className="activity-log-empty">Your recent login activity will appear here</p>
              <Button variant="outline" size="sm">View Full Activity Log</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
