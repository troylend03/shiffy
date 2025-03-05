import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock, DollarSign, Users, Bell, Settings, ChevronRight, Plus } from "lucide-react";
import { InviteModal } from "@/components/dashboard/InviteModal";
import { CompanyProfileModal } from "@/components/dashboard/CompanyProfileModal";

const Index = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  return (
    <AppLayout>
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowInviteModal(true)}>
              <Users className="mr-2 h-4 w-4" />
              Invite Team
            </Button>
            <Button onClick={() => setShowCompanyModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Schedule
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142.5</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">↑ 12%</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Labor Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,845.00</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500 font-medium">↑ 8%</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Shifts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-yellow-500 font-medium">⚠ Action needed</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>
                  Monday, June 12, 2023
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <div className="bg-blue-100 dark:bg-blue-900 h-full w-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-300">JD</span>
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Cashier</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">9:00 AM - 5:00 PM</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">8h</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <div className="bg-green-100 dark:bg-green-900 h-full w-full flex items-center justify-center">
                          <span className="text-xs font-medium text-green-600 dark:text-green-300">JS</span>
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jane Smith</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Manager</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">12:00 PM - 8:00 PM</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">8h</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <div className="bg-purple-100 dark:bg-purple-900 h-full w-full flex items-center justify-center">
                          <span className="text-xs font-medium text-purple-600 dark:text-purple-300">MJ</span>
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">Mike Johnson</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Stocker</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">4:00 PM - 10:00 PM</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">6h</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Schedule
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>
                  Time off and shift swap requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <div className="bg-green-100 dark:bg-green-900 h-full w-full flex items-center justify-center">
                          <span className="text-xs font-medium text-green-600 dark:text-green-300">JS</span>
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jane Smith</div>
                        <div className="flex items-center text-sm">
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
                            Time Off
                          </Badge>
                          <span className="ml-2 text-gray-500 dark:text-gray-400">Jun 15 - Jun 20</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <div className="bg-purple-100 dark:bg-purple-900 h-full w-full flex items-center justify-center">
                          <span className="text-xs font-medium text-purple-600 dark:text-purple-300">MJ</span>
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">Mike Johnson</div>
                        <div className="flex items-center text-sm">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                            Shift Swap
                          </Badge>
                          <span className="ml-2 text-gray-500 dark:text-gray-400">Jun 14 with Alex</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  View All Requests
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>
                  Updates from management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">New Schedule Published</div>
                      <Badge variant="outline">New</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      The schedule for next week (Jun 19 - Jun 25) has been published. Please review your shifts.
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Posted 2 hours ago by Admin
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Inventory Day</div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                        Important
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      We will be conducting inventory on Sunday, June 18. All hands on deck required.
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Posted 1 day ago by Manager
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  View All Announcements
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Create Schedule
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Team
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Payroll Report
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-blue-100 dark:bg-blue-900 h-full w-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-300">JD</span>
                      </div>
                    </Avatar>
                    <span>John Doe</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                    Available
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-green-100 dark:bg-green-900 h-full w-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-600 dark:text-green-300">JS</span>
                      </div>
                    </Avatar>
                    <span>Jane Smith</span>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                    Time Off
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-purple-100 dark:bg-purple-900 h-full w-full flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-300">MJ</span>
                      </div>
                    </Avatar>
                    <span>Mike Johnson</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
                    Limited
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-orange-100 dark:bg-orange-900 h-full w-full flex items-center justify-center">
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-300">SW</span>
                      </div>
                    </Avatar>
                    <span>Sarah Wilson</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                    Available
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                View All Team Members
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Modals */}
      {showInviteModal && (
        <InviteModal 
          isOpen={showInviteModal} 
          onClose={() => {
            setShowInviteModal(false);
            // Handle any post-invite logic here
          }} 
        />
      )}
      
      {showCompanyModal && (
        <CompanyProfileModal 
          isOpen={showCompanyModal} 
          onClose={() => {
            setShowCompanyModal(false);
            // Handle any post-save logic here
          }} 
        />
      )}
    </AppLayout>
  );
};

export default Index;
