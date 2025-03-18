
import React, { Component } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import '../../styles/settings/ProfileSettings.scss';

interface ProfileSettingsState {
  name: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
  bio: string;
  profilePicture: string;
}

export class ProfileSettings extends Component<{}, ProfileSettingsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: 'Alex Johnson',
      email: 'alex.johnson@shiftly.com',
      phoneNumber: '(555) 123-4567',
      jobTitle: 'Shift Supervisor',
      department: 'Operations',
      bio: 'I have been working with the team for 3 years. Passionate about efficient scheduling and team management.',
      profilePicture: ''
    };
  }
  
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the profile data to your backend
    console.log('Profile data saved:', this.state);
    // Show success message
    alert('Profile updated successfully');
  };
  
  render() {
    return (
      <div className="profile-settings">
        <h2 className="section-title">Profile Settings</h2>
        <p className="section-description">Update your personal information and how it appears on your profile.</p>
        
        <Card className="profile-card">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <div className="profile-picture-section">
                <div className="profile-picture-container">
                  {this.state.profilePicture ? (
                    <img src={this.state.profilePicture} alt="Profile" className="profile-picture" />
                  ) : (
                    <div className="profile-picture-placeholder">
                      <span>{this.state.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  )}
                  <div className="profile-picture-upload">
                    <Button size="sm" variant="outline" type="button" className="upload-button">
                      <Camera size={16} />
                      <span>Change</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="form-group-double">
                <div className="form-group">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group-double">
                <div className="form-group">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={this.state.jobTitle}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={this.state.department}
                  onChange={this.handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleInputChange}
                  rows={4}
                />
              </div>
              
              <div className="button-container">
                <Button type="submit" variant="default">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}
