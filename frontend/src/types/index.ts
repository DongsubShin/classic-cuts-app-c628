export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lastVisit?: string;
  totalSpent: number;
}

export interface Booking {
  id: string;
  clientId: string;
  serviceId: string;
  staffId: string;
  startTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Commission {
  id: string;
  staffId: string;
  amount: number;
  period: string;
  status: 'pending' | 'paid';
}

export interface SmsSettings {
  enabled: boolean;
  reminderHours: number;
  template: string;
}