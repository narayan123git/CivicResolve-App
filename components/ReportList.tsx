
import React from 'react';
import ReportCard from './ReportCard';
import type { Report } from '../types';
import { ReportStatus } from '../types';

interface ReportListProps {
  reports: Report[];
  isAdmin?: boolean;
  onStatusChange?: (id: number, status: ReportStatus) => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, isAdmin = false, onStatusChange }) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900">No Reports Found</h3>
        <p className="mt-1 text-sm text-gray-500">There are no reports matching the current filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          isAdmin={isAdmin}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default ReportList;
