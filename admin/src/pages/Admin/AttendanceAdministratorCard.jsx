import React, { useState, useEffect } from 'react';

const AttendanceAdministratorCard = () => {
  // Hardcoded administrator data
  const administrators = [
    {
      adminId: '1398612491',
      name: 'Niel Briones',
      timeIn: '7:43 AM',
      timeOut: '5:30 PM',
    },
    {
      adminId: '93213714',
      name: 'Chester C. Muñez',
      timeIn: '7:21 AM',
      timeOut: '5:15 PM',
    },
  ];

  const [timedInAdmins, setTimedInAdmins] = useState([]);
  const [timedOutAdmins, setTimedOutAdmins] = useState([]);
  const [isViewingTimeIn, setIsViewingTimeIn] = useState(true);

  // Simulate the data
  const simulateAdminData = () => {
    const timedIn = administrators.map(admin => ({
      adminId: admin.adminId,
      name: admin.name,
      timeIn: admin.timeIn,
    }));

    const timedOut = administrators.map(admin => ({
      adminId: admin.adminId,
      name: admin.name,
      timeOut: admin.timeOut,
    }));

    setTimedInAdmins(timedIn);
    setTimedOutAdmins(timedOut);
  };

  // Toggle between viewing time-in or time-out admins
  const toggleView = (view) => {
    setIsViewingTimeIn(view === 'timeIn');
  };

  useEffect(() => {
    simulateAdminData();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full">
      <div className="mb-4 flex justify-center">
        <button
          className="bg-green-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-green-600"
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
              <th className="px-4 py-2 text-left">Admin ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">{isViewingTimeIn ? 'Time-In' : 'Time-Out'}</th>
            </tr>
          </thead>
          <tbody>
            {isViewingTimeIn
              ? timedInAdmins.map((admin) => (
                  <tr key={admin.adminId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{admin.adminId}</td>
                    <td className="px-4 py-2">{admin.name}</td>
                    <td className="px-4 py-2">{admin.timeIn}</td>
                  </tr>
                ))
              : timedOutAdmins.map((admin) => (
                  <tr key={admin.adminId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{admin.adminId}</td>
                    <td className="px-4 py-2">{admin.name}</td>
                    <td className="px-4 py-2">{admin.timeOut}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceAdministratorCard;
