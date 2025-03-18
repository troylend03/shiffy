
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Shield, Key, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SecuritySettingsState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactor: boolean;
  sessionExpiry: string;
  showNotificationForLogins: boolean;
}

export const SecuritySettings = () => {
  const [formData, setFormData] = useState<SecuritySettingsState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
    sessionExpiry: '1 week',
    showNotificationForLogins: true
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    // Here you would call your API to change the password
    console.log('Password change requested');
    toast.success('Password changed successfully');
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Security Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Protect your account and maintain control over your data access.
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center space-y-0 gap-2">
          <Key size={18} className="text-muted-foreground" />
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Button type="submit">Update Password</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center space-y-0 gap-2">
          <Shield size={18} className="text-muted-foreground" />
          <CardTitle>Security Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label className="font-medium">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <div>
              {formData.twoFactor ? (
                <Button size="sm" variant="outline" onClick={() => handleCheckboxChange('twoFactor', false)}>Disable</Button>
              ) : (
                <Button size="sm" onClick={() => handleCheckboxChange('twoFactor', true)}>Enable</Button>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label className="font-medium">Session Expiry</Label>
              <p className="text-sm text-muted-foreground">Automatically sign out after period of inactivity</p>
            </div>
            <div>
              <Select 
                value={formData.sessionExpiry}
                onValueChange={(value) => handleSelectChange('sessionExpiry', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select expiry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="30 days">30 days</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label className="font-medium">Login Notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified of new logins to your account</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showNotificationForLogins"
                checked={formData.showNotificationForLogins}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('showNotificationForLogins', Boolean(checked))
                }
              />
              <label htmlFor="showNotificationForLogins" className="text-sm">Enable</label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 gap-2">
          <AlertCircle size={18} className="text-muted-foreground" />
          <CardTitle>Account Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-md p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">Your recent login activity will appear here</p>
            <Button variant="outline" size="sm">View Full Activity Log</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
