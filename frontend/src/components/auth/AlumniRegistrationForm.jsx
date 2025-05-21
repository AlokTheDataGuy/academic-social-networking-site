import { useState } from 'react';
import PropTypes from 'prop-types';

const AlumniRegistrationForm = ({ formData, setFormData, error }) => {
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

  const [degreeOptions] = useState([
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
              placeholder="e.g. CS2015001"
            />
          </div>
        </div>

        <div>
          <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
            Graduation Year <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="graduationYear"
              name="graduationYear"
              required
              value={formData.graduationYear || ''}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Graduation Year</option>
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
            Degree <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <select
              id="degree"
              name="degree"
              required
              value={formData.degree || ''}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Degree</option>
              {degreeOptions.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
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

        <div>
          <label htmlFor="currentCompany" className="block text-sm font-medium text-gray-700">
            Current Company
          </label>
          <div className="mt-1">
            <input
              id="currentCompany"
              name="currentCompany"
              type="text"
              value={formData.currentCompany || ''}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Google"
            />
          </div>
        </div>

        <div>
          <label htmlFor="currentPosition" className="block text-sm font-medium text-gray-700">
            Current Position
          </label>
          <div className="mt-1">
            <input
              id="currentPosition"
              name="currentPosition"
              type="text"
              value={formData.currentPosition || ''}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Software Engineer"
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

AlumniRegistrationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default AlumniRegistrationForm;
