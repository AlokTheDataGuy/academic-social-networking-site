import { useState } from 'react';
import PropTypes from 'prop-types';

const StudentRegistrationForm = ({ formData, setFormData, error }) => {
  const [departmentOptions] = useState([
    'Computer Science',
    'Yoga & Holistic Health',
    'Psychology',
    'Management',
    'Education',
    'Sanskrit & Indic Studies',
    'Tourism Management',
    'Mass Communication',
    'Music & Performing Arts',
    'Other'
  ]);

  const [programOptions] = useState([
    'B.Tech',
    'BCA',
    'B.Sc',
    'BA',
    'BBA',
    'M.Tech',
    'MCA',
    'M.Sc',
    'MA',
    'MBA',
    'Ph.D',
    'Diploma',
    'Certificate Course'
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
            Roll Number <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              required
              value={formData.rollNumber || ''}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. CS2023001"
            />
          </div>
        </div>

        <div>
          <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
            Batch Year <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="batch"
              name="batch"
              required
              value={formData.batch || ''}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Batch Year</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="program" className="block text-sm font-medium text-gray-700">
            Program <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="program"
              name="program"
              required
              value={formData.program || ''}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Program</option>
              {programOptions.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
            Current Semester <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="semester"
              name="semester"
              required
              value={formData.semester || ''}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Semester</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="department"
              name="department"
              required
              value={formData.department || ''}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Department</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

StudentRegistrationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default StudentRegistrationForm;
