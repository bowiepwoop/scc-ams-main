import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const TeachersList = () => {
  const { teachers, aToken, getAllTeachers, updateTeacher, deleteTeacher } = useContext(AdminContext);

  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllTeachers();
    }
  }, [aToken]); // Removed getAllTeachers from dependencies

  const handleEditClick = (admin) => {
    if (!admin._id) {
      console.error("Teacher ID is missing for the selected teacher.");
      return;
    }
    setCurrentAdmin(admin); // Set the selected teacher's data for editing
    setIsEditing(true);
  };
  
  const handleSave = async () => {
    if (!currentAdmin._id) {
      console.error("Teacher ID is missing for the current teacher.");
      return;
    }
  
    // Pass the updated teacher data to the context update function
    updateTeacher(currentAdmin); 
    setIsEditing(false); // Close the modal
    setCurrentAdmin(null); // Clear the form
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin((prev) => ({
      ...prev,
      [name]: value, // Update the specific field of currentAdmin
    }));
  };
  

  const handleDelete = async (teacherId) => {
    try {
      await deleteTeacher(teacherId); // Call the delete function from context
      getAllTeachers(); // Refresh the teacher list after deletion
    } catch (error) {
      console.error("Failed to delete teacher:", error.message);
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Teachers</h1>

      {/* Table Layout */}
      <table className="min-w-full table-auto border-collapse mt-5">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Number</th>
            <th className="px-4 py-2 text-left">Position</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              {/* Image Column */}
              <td className="px-4 py-2">
                <img
                  className="w-16 h-16 object-cover rounded-full"
                  src={item.image ?? '/default-image.png'} // Fallback to a default image
                  alt="Teacher"
                />
              </td>
              <td className="px-4 py-2">{item.name ?? 'No Name'}</td>
              <td className="px-4 py-2">{item.email ?? 'No Email'}</td>
              <td className="px-4 py-2">{item.number ?? 'No Number'}</td>
              <td className="px-4 py-2">{item.position ?? 'No Position'}</td>
              <td className="px-4 py-2">{item.address?.line1 ?? 'No Address Line 1'}</td>
              <td className="px-4 py-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(item._id)} // Call the delete function
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Teacher Modal */}
      {isEditing && currentAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-medium">Edit Teacher</h2>
            <div className="mt-4">
              <label className="block">Name</label>
              <input
                className="border w-full p-2 rounded"
                name="name"
                value={currentAdmin.name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block">Email</label>
              <input
                className="border w-full p-2 rounded"
                name="email"
                value={currentAdmin.email || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block">Number</label>
              <input
                className="border w-full p-2 rounded"
                name="number"
                value={currentAdmin.number || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block">Position</label>
              <select
                className="border rounded px-2 py-2 w-full"
                name="position"
                value={currentAdmin.position || ''}
                onChange={handleChange}
              >
                <option value="Primary Education Teacher">Primary Education Teacher</option>
                <option value="Secondary Education Teacher">Secondary Education Teacher</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersList;
