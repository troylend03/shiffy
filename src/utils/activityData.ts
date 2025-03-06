
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

export type ActivityType = 'shift_created' | 'shift_assigned' | 'team_joined' | 'message_sent' | 'time_off_approved' | 'company_updated' | 'announcement';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

export function generateMockActivities(count: number = 10): ActivityItem[] {
  const activityTypes: ActivityType[] = [
    'shift_created',
    'shift_assigned',
    'team_joined',
    'message_sent',
    'time_off_approved',
    'company_updated',
    'announcement'
  ];

  return Array.from({ length: count }, (_, i) => {
    const type = faker.helpers.arrayElement(activityTypes);
    const date = faker.date.recent({ days: 7 });
    
    let title = '';
    let description = '';
    
    switch (type) {
      case 'shift_created':
        title = 'New schedule created';
        description = `${faker.person.fullName()} created a new schedule for the week of ${format(date, 'MMM d')}`;
        break;
      case 'shift_assigned':
        title = 'Shift assigned';
        description = `${faker.person.fullName()} was assigned to ${faker.helpers.arrayElement(['morning', 'afternoon', 'evening'])} shift on ${format(date, 'MMM d')}`;
        break;
      case 'team_joined':
        title = 'New team member';
        description = `${faker.person.fullName()} joined the team as ${faker.helpers.arrayElement(['Cashier', 'Manager', 'Stocker', 'Customer Service'])}`;
        break;
      case 'message_sent':
        title = 'New message';
        description = `${faker.person.fullName()} sent a message about ${faker.lorem.words(3)}`;
        break;
      case 'time_off_approved':
        title = 'Time off approved';
        description = `${faker.person.fullName()}'s time off request for ${format(date, 'MMM d')} was approved`;
        break;
      case 'company_updated':
        title = 'Company profile updated';
        description = `${faker.person.fullName()} updated the company ${faker.helpers.arrayElement(['address', 'phone number', 'email', 'logo'])}`;
        break;
      case 'announcement':
        title = 'New announcement';
        description = `${faker.person.fullName()} posted an announcement: ${faker.lorem.sentence(5)}`;
        break;
    }
    
    return {
      id: faker.string.uuid(),
      type,
      title,
      description,
      timestamp: format(date, 'MMM d, h:mm a'),
      user: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar()
      }
    };
  });
}
