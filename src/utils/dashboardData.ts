
import { faker } from '@faker-js/faker';
import { format, subDays, addDays, startOfWeek, endOfWeek } from 'date-fns';

export type TeamMember = {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: Date;
  hoursScheduled: number;
  hoursWorked: number;
};

export type ShiftData = {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'published' | 'open' | 'in-progress' | 'completed' | 'canceled';
  duration: number; // in hours
};

export type MessageData = {
  id: string;
  from: string;
  fromId: string;
  avatar?: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
};

export type DashboardStats = {
  teamMembers: {
    total: number;
    active: number;
    inactive: number;
    pending: number;
    byPosition: Record<string, number>;
    recentlyAdded: TeamMember[];
  };
  shifts: {
    total: number;
    published: number;
    open: number;
    inProgress: number;
    completed: number;
    canceled: number;
    byDay: Record<string, number>;
    byPosition: Record<string, number>;
    upcoming: ShiftData[];
  };
  messages: {
    total: number;
    unread: number;
    recent: MessageData[];
  };
  labor: {
    scheduledHours: number;
    actualHours: number;
    targetHours: number;
    scheduledCost: number;
    actualCost: number;
    targetCost: number;
    overtimeHours: number;
  };
  timeOff: {
    pending: number;
    approved: number;
    denied: number;
  };
};

const positions = [
  'Manager',
  'Assistant Manager',
  'Shift Lead',
  'Cashier',
  'Stock Clerk',
  'Customer Service',
  'Cleaner'
];

export function generateTeamMembers(count: number = 15): TeamMember[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    position: faker.helpers.arrayElement(positions),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    joinedAt: faker.date.past({ years: 2 }),
    hoursScheduled: faker.number.int({ min: 10, max: 40 }),
    hoursWorked: faker.number.int({ min: 10, max: 40 }),
  }));
}

export function generateShifts(teamMembers: TeamMember[], count: number = 30): ShiftData[] {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  
  return Array.from({ length: count }, () => {
    const employee = faker.helpers.arrayElement(teamMembers);
    const shiftDate = faker.date.between({ from: subDays(weekStart, 7), to: addDays(weekEnd, 14) });
    const duration = faker.number.int({ min: 4, max: 9 });
    const startHour = faker.number.int({ min: 6, max: 16 });
    const startTime = `${startHour}:00`;
    const endTime = `${startHour + duration}:00`;
    
    return {
      id: faker.string.uuid(),
      employeeId: employee.id,
      employeeName: employee.name,
      position: employee.position,
      date: shiftDate,
      startTime,
      endTime,
      status: faker.helpers.arrayElement(['published', 'open', 'in-progress', 'completed', 'canceled']),
      duration,
    };
  });
}

export function generateMessages(teamMembers: TeamMember[], count: number = 20): MessageData[] {
  return Array.from({ length: count }, () => {
    const sender = faker.helpers.arrayElement(teamMembers);
    return {
      id: faker.string.uuid(),
      from: sender.name,
      fromId: sender.id,
      avatar: sender.avatar,
      subject: faker.lorem.sentence(4),
      content: faker.lorem.paragraph(2),
      timestamp: faker.date.recent({ days: 14 }),
      read: faker.datatype.boolean(),
    };
  });
}

export function generateDashboardStats(): DashboardStats {
  const teamMembers = generateTeamMembers(15);
  const shifts = generateShifts(teamMembers, 80);
  const messages = generateMessages(teamMembers, 25);
  
  // Team member stats
  const teamMembersByStatus = teamMembers.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const teamMembersByPosition = teamMembers.reduce((acc, member) => {
    acc[member.position] = (acc[member.position] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Shift stats
  const shiftsByStatus = shifts.reduce((acc, shift) => {
    acc[shift.status] = (acc[shift.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const shiftsByDay = shifts.reduce((acc, shift) => {
    const day = format(shift.date, 'EEE');
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const shiftsByPosition = shifts.reduce((acc, shift) => {
    acc[shift.position] = (acc[shift.position] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Upcoming shifts (next 7 days)
  const today = new Date();
  const upcomingShifts = shifts
    .filter(shift => shift.date >= today && shift.date <= addDays(today, 7) && shift.status !== 'canceled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);
  
  // Message stats
  const unreadMessages = messages.filter(msg => !msg.read).length;
  
  // Labor stats
  const scheduledHours = teamMembers.reduce((sum, tm) => sum + tm.hoursScheduled, 0);
  const actualHours = teamMembers.reduce((sum, tm) => sum + tm.hoursWorked, 0);
  const targetHours = Math.round(scheduledHours * 0.95);
  const avgHourlyRate = 15;
  
  return {
    teamMembers: {
      total: teamMembers.length,
      active: teamMembersByStatus['active'] || 0,
      inactive: teamMembersByStatus['inactive'] || 0,
      pending: teamMembersByStatus['pending'] || 0,
      byPosition: teamMembersByPosition,
      recentlyAdded: teamMembers
        .sort((a, b) => b.joinedAt.getTime() - a.joinedAt.getTime())
        .slice(0, 3),
    },
    shifts: {
      total: shifts.length,
      published: shiftsByStatus['published'] || 0,
      open: shiftsByStatus['open'] || 0,
      inProgress: shiftsByStatus['in-progress'] || 0,
      completed: shiftsByStatus['completed'] || 0,
      canceled: shiftsByStatus['canceled'] || 0,
      byDay: shiftsByDay,
      byPosition: shiftsByPosition,
      upcoming: upcomingShifts,
    },
    messages: {
      total: messages.length,
      unread: unreadMessages,
      recent: messages
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 5),
    },
    labor: {
      scheduledHours,
      actualHours,
      targetHours,
      scheduledCost: scheduledHours * avgHourlyRate,
      actualCost: actualHours * avgHourlyRate,
      targetCost: targetHours * avgHourlyRate,
      overtimeHours: Math.max(0, actualHours - scheduledHours),
    },
    timeOff: {
      pending: faker.number.int({ min: 0, max: 5 }),
      approved: faker.number.int({ min: 3, max: 8 }),
      denied: faker.number.int({ min: 0, max: 2 }),
    },
  };
}
