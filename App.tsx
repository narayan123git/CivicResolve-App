
import React, { useState, useEffect, createContext, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import type { Report, UserRole } from './types';
import { getReports, updateReportStatus as updateReportStatusService, createReport as createReportService } from './services/reportService';
import Header from './components/Header';
import CitizenView from './components/CitizenView';
import AdminView from './components/AdminView';

export const ReportContext = createContext<{
  reports: Report[];
  // Fix: The Omit type was incorrect, it should not omit 'priority'.
  addReport: (report: Omit<Report, 'id' | 'status' | 'submittedAt' | 'resolvedAt'>) => Promise<Report>;
  updateReportStatus: (id: number, status: Report['status']) => void;
}>({
  reports: [],
  addReport: async () => new Promise(res => res({} as Report)),
  updateReportStatus: () => {},
});


const AppContent: React.FC = () => {
    const location = useLocation();
    const [role, setRole] = useState<UserRole>('citizen');

    useEffect(() => {
        if(location.pathname.includes('/admin')) {
            setRole('admin');
        } else {
            setRole('citizen');
        }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header currentRole={role} />
            <main className="p-4 sm:p-6 lg:p-8">
                <Routes>
                    <Route path="/" element={<CitizenView />} />
                    <Route path="/admin" element={<AdminView />} />
                </Routes>
            </main>
        </div>
    );
};

const App: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    const fetchedReports = await getReports();
    setReports(fetchedReports);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Fix: The Omit type for reportData was incorrect, it should not omit 'priority'.
  const addReport = async (reportData: Omit<Report, 'id' | 'status' | 'submittedAt' | 'resolvedAt'>) => {
    const newReport = await createReportService(reportData);
    setReports(prevReports => [newReport, ...prevReports]);
    return newReport;
  };

  const updateReportStatus = (id: number, status: Report['status']) => {
    const updatedReport = updateReportStatusService(id, status);
    if (updatedReport) {
      setReports(prevReports =>
        prevReports.map(r => (r.id === id ? updatedReport : r))
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <ReportContext.Provider value={{ reports, addReport, updateReportStatus }}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ReportContext.Provider>
  );
};

export default App;