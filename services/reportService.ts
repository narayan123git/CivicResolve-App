
import type { Report } from '../types';
import { ReportStatus, ReportPriority } from '../types';
import { MOCK_REPORTS } from '../constants';

let reports: Report[] = [...MOCK_REPORTS];
let nextId = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;

// Simulate API delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getReports = async (): Promise<Report[]> => {
  await delay(500);
  // Return reports sorted by submission date, newest first
  return [...reports].sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
};

export const createReport = async (reportData: Omit<Report, 'id' | 'status' | 'submittedAt' | 'resolvedAt'>): Promise<Report> => {
  await delay(1000);
  const newReport: Report = {
    ...reportData,
    id: nextId++,
    status: ReportStatus.Submitted,
    submittedAt: new Date(),
  };
  reports = [newReport, ...reports];
  return newReport;
};

export const updateReportStatus = (id: number, status: ReportStatus): Report | undefined => {
  const reportIndex = reports.findIndex(r => r.id === id);
  if (reportIndex !== -1) {
    const updatedReport = {
      ...reports[reportIndex],
      status,
      resolvedAt: status === ReportStatus.Resolved ? new Date() : undefined,
    };
    reports[reportIndex] = updatedReport;
    return updatedReport;
  }
  return undefined;
};
