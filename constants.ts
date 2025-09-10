import React from 'react';
import type { Report } from './types';
import { ReportCategory, ReportStatus, ReportPriority } from './types';

export const MOCK_REPORTS: Report[] = [
  {
    id: 1,
    title: 'Large Pothole on Main St',
    description: 'A deep pothole near the crosswalk at Main St and 2nd Ave. It poses a risk to cyclists and cars.',
    category: ReportCategory.Pothole,
    status: ReportStatus.Submitted,
    priority: ReportPriority.High,
    location: { lat: 34.0522, lng: -118.2437 },
    imageUrl: 'https://picsum.photos/seed/pothole1/600/400',
    submittedAt: new Date('2023-10-26T08:00:00Z'),
    submittedBy: 'John Doe',
  },
  {
    id: 2,
    title: 'Streetlight out at Elm Park',
    description: 'The streetlight at the entrance of Elm Park is completely out. The area is very dark at night.',
    category: ReportCategory.Streetlight,
    status: ReportStatus.InProgress,
    priority: ReportPriority.Medium,
    location: { lat: 34.055, lng: -118.25 },
    imageUrl: 'https://picsum.photos/seed/light1/600/400',
    submittedAt: new Date('2023-10-25T19:30:00Z'),
    submittedBy: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Overflowing trash can',
    description: 'The public trash can at the bus stop on Ocean Blvd is overflowing with garbage.',
    category: ReportCategory.Trash,
    status: ReportStatus.Resolved,
    priority: ReportPriority.Low,
    location: { lat: 34.049, lng: -118.245 },
    imageUrl: 'https://picsum.photos/seed/trash1/600/400',
    submittedAt: new Date('2023-10-24T12:00:00Z'),
    resolvedAt: new Date('2023-10-25T14:00:00Z'),
    submittedBy: 'Alice Johnson',
  },
  {
    id: 4,
    title: 'Graffiti on library wall',
    description: 'Spray paint graffiti on the west-facing wall of the downtown public library.',
    category: ReportCategory.Graffiti,
    status: ReportStatus.Submitted,
    priority: ReportPriority.Medium,
    location: { lat: 34.058, lng: -118.24 },
    imageUrl: 'https://picsum.photos/seed/graffiti1/600/400',
    submittedAt: new Date('2023-10-27T10:15:00Z'),
    submittedBy: 'Bob Brown',
  },
  {
    id: 5,
    title: 'Broken swing at playground',
    description: 'One of the swings in Greenwood Park is broken and unsafe for children to use.',
    category: ReportCategory.Park,
    status: ReportStatus.InProgress,
    priority: ReportPriority.High,
    location: { lat: 34.06, lng: -118.26 },
    imageUrl: 'https://picsum.photos/seed/park1/600/400',
    submittedAt: new Date('2023-10-26T14:45:00Z'),
    submittedBy: 'Charlie Davis',
  },
];

export const CATEGORIES = Object.values(ReportCategory);
export const STATUSES = Object.values(ReportStatus);

// Converted JSX to React.createElement to be valid in a .ts file
export const ICONS = {
    location: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1 inline-block", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" })),
    calendar: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1 inline-block", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z", clipRule: "evenodd" })),
    user: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1 inline-block", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" })),
    add: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" })),
    dashboard: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" })),
    list: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", clipRule: "evenodd" })),
    map: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v12a1 1 0 00.293.707l6 6a1 1 0 001.414 0l6-6A1 1 0 0018 16V4a1 1 0 00-.293-.707l-6-6a1 1 0 00-1.414 0l-6 6z", clipRule: "evenodd" })),
    ai: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })),
};
