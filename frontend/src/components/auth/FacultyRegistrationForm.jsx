import { useState } from 'react';
import PropTypes from 'prop-types';

const FacultyRegistrationForm = ({ formData, setFormData, error }) => {
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

  const [designationOptions] = useState([
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Visiting Faculty',
    'Research Associate',
    'Lab Assistant',
    'Other'
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
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
            Employee ID <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              required
              value={formData.employeeId || ''}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. FAC2023001"
            />
          </div>
        </div>

        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
            Designation <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="designation"
              name="designation"
              required
              value={formData.designation || ''}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Designation</option>
              {designationOptions.map((designation) => (
                <option key={designation} value={designation}>
                  {designation}
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

        <div className="sm:col-span-2">
          <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
            Joining Date <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="joiningDate"
              name="joiningDate"
              type="date"
              required
              value={formData.joiningDate || ''}
              onChange={handleChange}
              className="input-field"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
            Specialization (comma separated)
          </label>
          <div className="mt-1">
            <input
              id="specialization"
              name="specialization"
              type="text"
              value={formData.specialization || ''}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Machine Learning, Data Science, Artificial Intelligence"
            />
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

FacultyRegistrationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default FacultyRegistrationForm;
