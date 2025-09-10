
export enum ReportStatus {
  Submitted = 'Submitted',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export enum ReportCategory {
  Pothole = 'Pothole',
  Streetlight = 'Streetlight Outage',
  Trash = 'Trash & Recycling',
  Graffiti = 'Graffiti',
  Park = 'Park Maintenance',
  Other = 'Other',
}

export enum ReportPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface Report {
  id: number;
  title: string;
  description: string;
  category: ReportCategory;
  status: ReportStatus;
  priority: ReportPriority;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  submittedAt: Date;
  resolvedAt?: Date;
  submittedBy: string; // User's name or ID
}

export type UserRole = 'citizen' | 'admin';
