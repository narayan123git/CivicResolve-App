
import React, { useState, useMemo, useContext } from 'react';
import ReportList from './ReportList';
import MapView from './MapView';
import AnalyticsDashboard from './AnalyticsDashboard';
import { ReportContext } from '../App';
import type { Report } from '../types';
import { ReportCategory, ReportStatus } from '../types';
import { CATEGORIES, STATUSES, ICONS } from '../constants';

const AdminView: React.FC = () => {
  const { reports, updateReportStatus } = useContext(ReportContext);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'dashboard'>('dashboard');

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const categoryMatch = filterCategory === 'all' || report.category === filterCategory;
      const statusMatch = filterStatus === 'all' || report.status === filterStatus;
      return categoryMatch && statusMatch;
    });
  }, [reports, filterCategory, filterStatus]);

  const handleStatusChange = (id: number, status: ReportStatus) => {
    updateReportStatus(id, status);
  };
  
  const renderView = () => {
    switch (viewMode) {
      case 'dashboard':
        return <AnalyticsDashboard reports={filteredReports} />;
      case 'list':
        return <ReportList reports={filteredReports} onStatusChange={handleStatusChange} isAdmin={true} />;
      case 'map':
        return <MapView reports={filteredReports} />;
      default:
        return null;
    }
  };

  const ViewModeButton: React.FC<{mode: 'list' | 'map' | 'dashboard', icon: React.ReactNode, label: string}> = ({ mode, icon, label }) => (
      <button 
          onClick={() => setViewMode(mode)}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === mode ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          aria-label={`Switch to ${label} view`}
      >
          {icon}
          <span>{label}</span>
      </button>
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Administrator Dashboard</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                <ViewModeButton mode="dashboard" icon={ICONS.dashboard} label="Dashboard" />
                <ViewModeButton mode="list" icon={ICONS.list} label="List" />
                <ViewModeButton mode="map" icon={ICONS.map} label="Map" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div>
                    <label htmlFor="category-filter" className="sr-only">Filter by category</label>
                    <select
                        id="category-filter"
                        value={filterCategory}
                        onChange={e => setFilterCategory(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        <option value="all">All Categories</option>
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                    <select
                        id="status-filter"
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        <option value="all">All Statuses</option>
                        {STATUSES.map(stat => <option key={stat} value={stat}>{stat}</option>)}
                    </select>
                </div>
            </div>
        </div>
      </div>
      
      <div className="mt-6">
        {renderView()}
      </div>
    </div>
  );
};

export default AdminView;
