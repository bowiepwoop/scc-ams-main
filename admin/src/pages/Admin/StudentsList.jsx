import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const StudentsList = () => {
  const { students, aToken, getAllStudents, updateStudent, deleteStudent } = useContext(AdminContext);

  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null); // Renamed to better reflect student context

  useEffect(() => {
    if (aToken) {
      getAllStudents();
    }
  }, [aToken]);

  const handleEditClick = (student) => {
    if (!student._id) {
      console.error('Student ID is missing for the selected student.');
      return;
    }
    setCurrentStudent(student); // Set the selected student's data for editing
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!currentStudent._id) {
      console.error('Student ID is missing for the current student.');
      return;
    }

    // Pass the updated student data to the context update function
    await updateStudent(currentStudent);
    setIsEditing(false); // Close the modal
    setCurrentStudent(null); // Clear the form
    getAllStudents(); // Refresh the list after save
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent((prev) => ({
      ...prev,
      [name]: value, // Update the specific field of currentStudent
    }));
  };

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);
      getAllStudents();
    } catch (error) {
      console.error('Failed to delete student:', error.message);
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Students</h1>

      {/* Table Layout */}
      <table className="min-w-full table-auto border-collapse mt-5">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Number</th>
            <th className="px-4 py-2 text-left">Level</th>
            <th className="px-4 py-2 text-left">Section</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              {/* Image Column */}
              <td className="px-4 py-2">
                <img
                  className="w-16 h-16 object-cover rounded-full"
                  src={item.image ?? '/default-image.png'}
                  alt="Student"
                />
              </td>
              <td className="px-4 py-2">{item.name ?? 'No Name'}</td>
              <td className="px-4 py-2">{item.email ?? 'No Email'}</td>
              <td className="px-4 py-2">{item.number ?? 'No Number'}</td>
              <td className="px-4 py-2">{item.level ?? 'No Level'}</td>
              <td className="px-4 py-2">{item.section ?? 'No Section'}</td>
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
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Student Modal */}
      {isEditing && currentStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-9 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-medium">Edit Student</h2>
            <div className="mt-4">
              <label className="block">Name</label>
              <input
                className="border w-full p-2 rounded"
                name="name"
                value={currentStudent.name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block">Email</label>
              <input
                className="border w-full p-2 rounded"
                name="email"
                value={currentStudent.email || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block">Number</label>
              <input
                className="border w-full p-2 rounded"
                name="number"
                value={currentStudent.number || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block">Level</label>
              <select
                className="border rounded px-2 py-2 w-full"
                name="level"
                value={currentStudent.level || ''}
                onChange={handleChange}
              >
                <option value="Kindergarten">Kindergarten</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block">Section</label>
              <input
                className="border w-full p-2 rounded"
                name="section"
                value={currentStudent.section || ''}
                onChange={handleChange}
              />
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

export default StudentsList;
