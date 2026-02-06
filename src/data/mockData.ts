export type UserRole = 'admin' | 'organizer' | 'student';

export interface Event {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  organizer: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  maxParticipants: number;
  registeredCount: number;
  ticketPrice: number;
  sponsors: string[];
  staffAssigned: string[];
  volunteers: string[];
  attendees: number;
  income: number;
  expenses: number;
  image?: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  studentId: string;
  eventId: string;
  ticketId: string;
  registeredAt: string;
  attended: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  assignedEvents: string[];
}

export const events: Event[] = [
  {
    id: 'e1', name: 'Annual Day Celebration 2025', category: 'Annual Day',
    date: '2025-03-15', time: '10:00 AM - 6:00 PM', venue: 'Main Auditorium',
    description: 'Grand annual day celebration featuring cultural performances, awards ceremony, and guest lectures.',
    organizer: 'Cultural Committee', status: 'approved', maxParticipants: 500,
    registeredCount: 342, ticketPrice: 100, sponsors: ['TechCorp', 'EduFund'],
    staffAssigned: ['Dr. Sharma', 'Prof. Mehta', 'Ms. Rao'], volunteers: ['Amit K.', 'Priya S.', 'Raj M.', 'Neha T.'],
    attendees: 310, income: 34200, expenses: 18500,
  },
  {
    id: 'e2', name: "Teachers' Day Special", category: "Teachers' Day",
    date: '2025-09-05', time: '9:00 AM - 1:00 PM', venue: 'Seminar Hall A',
    description: 'A heartfelt tribute to our educators with performances, speeches, and surprises.',
    organizer: 'Student Council', status: 'approved', maxParticipants: 300,
    registeredCount: 256, ticketPrice: 0, sponsors: ['Alumni Association'],
    staffAssigned: ['Prof. Desai', 'Dr. Gupta'], volunteers: ['Sneha R.', 'Vikram P.'],
    attendees: 240, income: 5000, expenses: 3200,
  },
  {
    id: 'e3', name: "Children's Day Fun Fair", category: "Children's Day",
    date: '2025-11-14', time: '11:00 AM - 5:00 PM', venue: 'Campus Grounds',
    description: 'Games, competitions, food stalls, and entertainment for all.',
    organizer: 'Event Management Club', status: 'pending', maxParticipants: 800,
    registeredCount: 120, ticketPrice: 50, sponsors: ['FunZone', 'SnackBite'],
    staffAssigned: ['Ms. Iyer'], volunteers: ['Karan D.', 'Meera L.', 'Arjun N.'],
    attendees: 0, income: 6000, expenses: 4500,
  },
  {
    id: 'e4', name: 'Gandhi Jayanti Seminar', category: 'Jayanti',
    date: '2025-10-02', time: '10:00 AM - 12:00 PM', venue: 'Conference Room B',
    description: 'A seminar on Gandhian values and their relevance in modern society.',
    organizer: 'Philosophy Department', status: 'approved', maxParticipants: 150,
    registeredCount: 98, ticketPrice: 0, sponsors: [],
    staffAssigned: ['Dr. Patil', 'Prof. Joshi'], volunteers: ['Tanvi S.'],
    attendees: 88, income: 2000, expenses: 1200,
  },
  {
    id: 'e5', name: 'Tech Fest Innovate 2025', category: 'Tech Fest',
    date: '2025-04-20', time: '9:00 AM - 8:00 PM', venue: 'Engineering Block',
    description: 'Hackathons, workshops, project exhibitions, and coding competitions.',
    organizer: 'CS Department', status: 'approved', maxParticipants: 600,
    registeredCount: 478, ticketPrice: 200, sponsors: ['Google', 'Microsoft', 'Infosys'],
    staffAssigned: ['Dr. Kumar', 'Prof. Singh', 'Ms. Nair', 'Mr. Reddy'],
    volunteers: ['Aditya B.', 'Pooja K.', 'Siddharth M.', 'Kavya R.', 'Rohit G.'],
    attendees: 445, income: 95600, expenses: 42000,
  },
  {
    id: 'e6', name: 'Sports Day Championship', category: 'Sports Day',
    date: '2025-02-28', time: '7:00 AM - 5:00 PM', venue: 'Sports Complex',
    description: 'Inter-department sports competition with track & field, basketball, and cricket.',
    organizer: 'Sports Committee', status: 'completed', maxParticipants: 400,
    registeredCount: 380, ticketPrice: 50, sponsors: ['Nike', 'Gatorade'],
    staffAssigned: ['Coach Verma', 'Prof. Das'], volunteers: ['Suresh K.', 'Anita P.'],
    attendees: 365, income: 19000, expenses: 12000,
  },
];

export const participants: Participant[] = [
  { id: 'p1', name: 'Rahul Sharma', email: 'rahul@college.edu', studentId: 'STU001', eventId: 'e1', ticketId: 'TKT-2025-001', registeredAt: '2025-02-10', attended: true },
  { id: 'p2', name: 'Ananya Patel', email: 'ananya@college.edu', studentId: 'STU002', eventId: 'e1', ticketId: 'TKT-2025-002', registeredAt: '2025-02-11', attended: true },
  { id: 'p3', name: 'Vikram Singh', email: 'vikram@college.edu', studentId: 'STU003', eventId: 'e5', ticketId: 'TKT-2025-003', registeredAt: '2025-03-15', attended: false },
  { id: 'p4', name: 'Priya Menon', email: 'priya@college.edu', studentId: 'STU004', eventId: 'e5', ticketId: 'TKT-2025-004', registeredAt: '2025-03-16', attended: true },
  { id: 'p5', name: 'Arjun Nair', email: 'arjun@college.edu', studentId: 'STU005', eventId: 'e2', ticketId: 'TKT-2025-005', registeredAt: '2025-08-20', attended: true },
  { id: 'p6', name: 'Deepika Rao', email: 'deepika@college.edu', studentId: 'STU006', eventId: 'e6', ticketId: 'TKT-2025-006', registeredAt: '2025-02-01', attended: true },
  { id: 'p7', name: 'Karthik Iyer', email: 'karthik@college.edu', studentId: 'STU007', eventId: 'e1', ticketId: 'TKT-2025-007', registeredAt: '2025-02-12', attended: false },
  { id: 'p8', name: 'Neha Gupta', email: 'neha@college.edu', studentId: 'STU008', eventId: 'e3', ticketId: 'TKT-2025-008', registeredAt: '2025-10-01', attended: false },
];

export const staffMembers: StaffMember[] = [
  { id: 's1', name: 'Dr. Sharma', role: 'Head Coordinator', department: 'Management', assignedEvents: ['e1', 'e5'] },
  { id: 's2', name: 'Prof. Mehta', role: 'Stage Manager', department: 'Arts', assignedEvents: ['e1'] },
  { id: 's3', name: 'Ms. Rao', role: 'Registration Lead', department: 'Admin', assignedEvents: ['e1', 'e2'] },
  { id: 's4', name: 'Dr. Kumar', role: 'Technical Lead', department: 'Computer Science', assignedEvents: ['e5'] },
  { id: 's5', name: 'Coach Verma', role: 'Sports Director', department: 'Physical Education', assignedEvents: ['e6'] },
  { id: 's6', name: 'Prof. Desai', role: 'Cultural Advisor', department: 'Literature', assignedEvents: ['e2', 'e4'] },
];
