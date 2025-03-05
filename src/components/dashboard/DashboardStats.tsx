
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { Users, Calendar, CheckSquare, MessageSquare, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardStats as DashboardStatsType } from "@/utils/dashboardData";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description?: string;
  change?: number;
  iconColor: string;
  changeDirection?: "up" | "down" | "neutral";
}

// Format large numbers with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  description,
  change,
  changeDirection = "neutral"
}) => {
  const changeClass = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-500"
  };

  return (
    <Card>
      <div className={`h-1 ${iconColor}`}></div>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`rounded-full p-3 ${iconColor}/10`}>
            <Icon className={`h-6 w-6 ${iconColor} bg-clip-text text-transparent`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{value}</h3>
              {change !== undefined && (
                <p className={cn("text-xs font-medium", changeClass[changeDirection])}>
                  {changeDirection === 'up' ? '+' : changeDirection === 'down' ? '-' : ''}
                  {Math.abs(change)}%
                </p>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  // Colors for charts
  const COLORS = [
    '#8B5CF6', '#EC4899', '#F97316', '#10B981', '#3B82F6', 
    '#6366F1', '#9333EA', '#F59E0B', '#14B8A6', '#0EA5E9'
  ];
  
  // Format data for shift distribution by day
  const shiftsByDayData = Object.entries(stats.shifts.byDay).map(([day, count]) => ({
    day,
    shifts: count
  }));
  
  // Format data for team distribution by position
  const teamByPositionData = Object.entries(stats.teamMembers.byPosition)
    .map(([position, count]) => ({
      position,
      value: count
    }));
  
  // Labor hours comparison data
  const laborHoursData = [
    { name: 'Scheduled', hours: stats.labor.scheduledHours },
    { name: 'Actual', hours: stats.labor.actualHours },
    { name: 'Target', hours: stats.labor.targetHours }
  ];
  
  // Time off requests data
  const timeOffData = [
    { name: 'Pending', value: stats.timeOff.pending },
    { name: 'Approved', value: stats.timeOff.approved },
    { name: 'Denied', value: stats.timeOff.denied }
  ];

  // Custom tooltip for recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 shadow-sm rounded-md text-xs">
          <p className="font-medium">{`${label ? label : payload[0].name}`}</p>
          <p className="text-[#8B5CF6]">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Team Members"
          value={formatNumber(stats.teamMembers.total)}
          icon={Users}
          description={`${stats.teamMembers.active} active members`}
          iconColor="bg-violet-500"
          change={8}
          changeDirection="up"
        />
        <StatsCard
          title="Published Shifts"
          value={formatNumber(stats.shifts.published)}
          icon={Calendar}
          description={`${stats.shifts.open} open shifts`}
          iconColor="bg-pink-500"
          change={5}
          changeDirection="up"
        />
        <StatsCard
          title="Open Shifts"
          value={formatNumber(stats.shifts.open)}
          icon={CheckSquare}
          description="Needs to be filled"
          iconColor="bg-orange-500"
          change={2}
          changeDirection="down"
        />
        <StatsCard
          title="Unread Messages"
          value={formatNumber(stats.messages.unread)}
          icon={MessageSquare}
          description={`${stats.messages.total} total messages`}
          iconColor="bg-teal-500"
          change={12}
          changeDirection="up"
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shifts by Day of Week */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shifts by Day of Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shiftsByDayData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="shifts" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Team by Position */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team by Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={teamByPositionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {teamByPositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Labor Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Labor Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={laborHoursData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="hours" fill="#EC4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="font-medium text-gray-500">Scheduled</p>
                <p className="text-xl font-bold">{stats.labor.scheduledHours}h</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Actual</p>
                <p className="text-xl font-bold">{stats.labor.actualHours}h</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Overtime</p>
                <p className="text-xl font-bold">{stats.labor.overtimeHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Time Off Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Time Off Requests</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeOffData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#F97316" /> {/* Pending */}
                    <Cell fill="#10B981" /> {/* Approved */}
                    <Cell fill="#EF4444" /> {/* Denied */}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#F97316] mb-1"></div>
                <p className="font-medium text-gray-500">Pending</p>
                <p className="font-bold">{stats.timeOff.pending}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#10B981] mb-1"></div>
                <p className="font-medium text-gray-500">Approved</p>
                <p className="font-bold">{stats.timeOff.approved}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#EF4444] mb-1"></div>
                <p className="font-medium text-gray-500">Denied</p>
                <p className="font-bold">{stats.timeOff.denied}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
