import React from 'react';
import type { Report } from '../types';
import { ReportStatus } from '../types';
import { ICONS, STATUSES } from '../constants';
import StatusBadge from './StatusBadge';

interface ReportCardProps {
  report: Report;
  isAdmin?: boolean;
  onStatusChange?: (id: number, status: ReportStatus) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, isAdmin = false, onStatusChange }) => {

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onStatusChange) {
      onStatusChange(report.id, e.target.value as ReportStatus);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl flex flex-col">
      <img className="h-48 w-full object-cover" src={report.imageUrl} alt={report.title} />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{report.category}</p>
            <StatusBadge status={report.status} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 truncate mb-2">{report.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{report.description}</p>
        
        <div className="border-t border-gray-200 pt-4 mt-auto space-y-3 text-xs text-gray-500">
           <div className="flex items-center">
             {ICONS.user} <span>Reported by {report.submittedBy}</span>
           </div>
           <div className="flex items-center">
             {ICONS.calendar} <span>{report.submittedAt.toLocaleDateString()}</span>
           </div>
           <div className="flex items-center">
             {ICONS.location} <span>{`Lat: ${report.location.lat.toFixed(4)}, Lng: ${report.location.lng.toFixed(4)}`}</span>
           </div>
           <div className="flex items-center font-semibold">
                <span className={`mr-1 ${report.priority === 'High' ? 'text-red-500' : report.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>●</span> Priority: {report.priority}
            </div>
        </div>

        {isAdmin && onStatusChange && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label htmlFor={`status-update-${report.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Update Status
            </label>
            <select
              id={`status-update-${report.id}`}
              value={report.status}
              onChange={handleStatusChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {STATUSES.map(stat => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;