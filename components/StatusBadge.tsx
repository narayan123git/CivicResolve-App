
import React from 'react';
import { ReportStatus } from '../types';

interface StatusBadgeProps {
  status: ReportStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case ReportStatus.Submitted:
        return 'bg-yellow-100 text-yellow-800';
      case ReportStatus.InProgress:
        return 'bg-blue-100 text-blue-800';
      case ReportStatus.Resolved:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
