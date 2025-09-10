
import React, { useState } from 'react';
import type { Report } from '../types';
import { ReportStatus } from '../types';

interface MapViewProps {
  reports: Report[];
}

const MapView: React.FC<MapViewProps> = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Define map boundaries based on mock data range
  const latMin = 34.0;
  const latMax = 34.1;
  const lngMin = -118.3;
  const lngMax = -118.2;
  
  const getPosition = (lat: number, lng: number) => {
      const top = ((latMax - lat) / (latMax - latMin)) * 100;
      const left = ((lng - lngMin) / (lngMax - lngMin)) * 100;
      return { top: `${top}%`, left: `${left}%` };
  };

  const getPinColor = (status: ReportStatus) => {
      switch (status) {
          case ReportStatus.Submitted: return 'bg-yellow-500';
          case ReportStatus.InProgress: return 'bg-blue-500';
          case ReportStatus.Resolved: return 'bg-green-500';
          default: return 'bg-gray-500';
      }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Issue Map</h2>
      <div className="relative w-full h-96 md:h-[600px] bg-gray-200 rounded-md overflow-hidden">
        {/* Placeholder map background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://www.openstreetmap.org/assets/map-background-643e2e3e973f8f141804f553429307c5a35b13b140409a6332767c6990529e84.png')" }}
        ></div>
        {reports.map(report => (
          <div
            key={report.id}
            className="absolute transform -translate-x-1/2 -translate-y-full"
            style={getPosition(report.location.lat, report.location.lng)}
            onMouseEnter={() => setSelectedReport(report)}
            onMouseLeave={() => setSelectedReport(null)}
          >
            <div className={`w-4 h-4 rounded-full ${getPinColor(report.status)} cursor-pointer ring-2 ring-white`}></div>
            {selectedReport && selectedReport.id === report.id && (
              <div className="absolute bottom-full mb-2 w-48 bg-white p-2 rounded-md shadow-lg text-xs z-20 transform -translate-x-1/2 left-1/2">
                <p className="font-bold">{report.title}</p>
                <p>{report.category}</p>
                <p className="font-semibold">{report.status}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
