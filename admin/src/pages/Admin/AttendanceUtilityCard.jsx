import React, { useState, useEffect } from 'react';

const AttendanceUtilityCard = () => {
  
  const utilityStaff = [
    {
      utilityId: '10847189231',
      name: 'Christopher Laciapag',
      timeIn: '08:30 AM', 
      timeOut: '04:30 PM', 
    },
    {
      utilityId: '932163141',
      name: 'Vladi Jamani',
      timeIn: '09:15 AM', 
      timeOut: '05:00 PM', 
    },
  ];

  const [timedInUtilityStaff, setTimedInUtilityStaff] = useState([]);
  const [timedOutUtilityStaff, setTimedOutUtilityStaff] = useState([]);
  const [isViewingTimeIn, setIsViewingTimeIn] = useState(true);

  // Simulate the data for time-in and time-out
  const simulateUtilityData = () => {
    const timedIn = utilityStaff.map(utility => ({
      utilityId: utility.utilityId,
      name: utility.name,
      timeIn: utility.timeIn,
    }));

    const timedOut = utilityStaff.map(utility => ({
      utilityId: utility.utilityId,
      name: utility.name,
      timeOut: utility.timeOut,
    }));

    setTimedInUtilityStaff(timedIn);
    setTimedOutUtilityStaff(timedOut);
  };

  // Toggle between viewing time-in or time-out utility staff
  const toggleView = (view) => {
    setIsViewingTimeIn(view === 'timeIn');
  };

  useEffect(() => {
    simulateUtilityData();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full">
      <div className="mb-4 flex justify-center">
        <button
          className="bg-black text-white text-sm font-medium py-2 px-4 rounded mr-2 hover:bg-gray-200 hover:text-black"
          onClick={() => toggleView('timeIn')}
        >
          View Time-In
        </button>
        <button
          className="bg-red-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-red-600"
          onClick={() => toggleView('timeOut')}
        >
          View Time-Out
        </button>
      </div>

      {/* Display the Time-In or Time-Out results based on toggle */}
      <div>
        <table className="min-w-full table-auto border-collapse mt-5">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Utility ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">{isViewingTimeIn ? 'Time-In' : 'Time-Out'}</th>
            </tr>
          </thead>
          <tbody>
            {isViewingTimeIn
              ? timedInUtilityStaff.map((utility) => (
                  <tr key={utility.utilityId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{utility.utilityId}</td>
                    <td className="px-4 py-2">{utility.name}</td>
                    <td className="px-4 py-2">{utility.timeIn}</td>
                  </tr>
                ))
              : timedOutUtilityStaff.map((utility) => (
                  <tr key={utility.utilityId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{utility.utilityId}</td>
                    <td className="px-4 py-2">{utility.name}</td>
                    <td className="px-4 py-2">{utility.timeOut}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceUtilityCard;
