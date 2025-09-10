
import React, { useState, useContext } from 'react';
import ReportList from './ReportList';
import ReportForm from './ReportForm';
import Modal from './Modal';
import { ICONS } from '../constants';
import { ReportContext } from '../App';

const CitizenView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reports } = useContext(ReportContext);
  
  // For demo, we assume all reports belong to the current "user"
  const citizenReports = reports;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Community Reports</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-transform transform hover:scale-105"
        >
          {ICONS.add}
          Report New Issue
        </button>
      </div>

      <p className="mb-6 text-gray-600">
        See an issue in your community? Report it here. View the status of your submitted reports below.
      </p>

      <ReportList reports={citizenReports} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit a New Report">
        <ReportForm onFormSubmit={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default CitizenView;
