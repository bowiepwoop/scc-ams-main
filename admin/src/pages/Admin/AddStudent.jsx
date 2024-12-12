import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RFIDReaderInput } from 'rfid-reader-input';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AddStudent = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [level, setLevel] = useState('Primary');
  const [section, setSection] = useState(''); // New state for Section
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [code, setCode] = useState(''); // RFID serial state
  const [openCardReaderWindow, setOpenCardReaderWindow] = useState(false); // RFID reader modal state

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const handleOpenRFID = () => {
    setOpenCardReaderWindow(true);
  };

  const handleCloseRFID = () => {
    setOpenCardReaderWindow(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();

      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('level', level);
      formData.append('section', section); // Append section data
      formData.append('number', Number(number));
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
      formData.append('code', code); // Include RFID serial in the form

      const { data } = await axios.post(backendUrl + '/api/admin/add-student', formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setLevel('');
        setSection(''); // Reset section state
        setNumber('');
        setCode(''); // Reset RFID serial state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Student</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden />
          <p>Upload User Picture</p>
        </div>

        {/* RFID Reader Section */}
        <div className="mb-4">
          <p className="font-medium">Scan RFID Card</p>
          <div className="flex items-center gap-4">
            <input
              value={code}
              className="border rounded px-3 py-2 w-full"
              type="text"
              placeholder="RFID Serial"
              readOnly
            />
            <button
              type="button"
              onClick={handleOpenRFID}
              className="bg-customRed text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Open RFID Scanner
            </button>
          </div>
          <RFIDReaderInput
            isOpen={openCardReaderWindow}
            onRequestClose={handleCloseRFID}
            handleCodeCardRFID={setCode}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 rounded">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Student Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Student Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Set Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Student Number</p>
              <input
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Number"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Level</p>
              <select
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                className="border rounded px-2 py-2"
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

            {/* Section Field */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Section</p>
              <input
                onChange={(e) => setSection(e.target.value)}
                value={section}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Section"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="bg-customRed px-10 py-3 mt-4 text-white rounded">
          Add student
        </button>
      </div>
    </form>
  );
};

export default AddStudent;