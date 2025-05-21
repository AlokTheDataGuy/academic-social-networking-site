import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerBg from '../../assets/images/register_background.jpg';
import dsvvLogo from '../../assets/images/dsvv_logo.png';
import logoText from '../../assets/images/logo-text.png';
import logoTextWhite from '../../assets/images/logo-text-white.png';
import StudentRegistrationForm from '../../components/auth/StudentRegistrationForm';
import FacultyRegistrationForm from '../../components/auth/FacultyRegistrationForm';
import AlumniRegistrationForm from '../../components/auth/AlumniRegistrationForm';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Reset field-specific errors when user type changes
  useEffect(() => {
    setFieldError('');
  }, [formData.userType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    setError('');
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setFieldError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldError('');

    try {
      // Validate user type specific fields
      let isValid = true;

      switch (formData.userType) {
        case 'student':
          if (!formData.rollNumber || !formData.batch || !formData.program || !formData.semester || !formData.department) {
            setFieldError('Please fill in all required student information');
            isValid = false;
          }
          break;
        case 'faculty':
          if (!formData.employeeId || !formData.designation || !formData.department || !formData.joiningDate) {
            setFieldError('Please fill in all required faculty information');
            isValid = false;
          }
          break;
        case 'alumni':
          if (!formData.rollNumber || !formData.graduationYear || !formData.degree || !formData.department) {
            setFieldError('Please fill in all required alumni information');
            isValid = false;
          }
          break;
      }

      if (!isValid) {
        setLoading(false);
        return;
      }

      // Simulate API call
      setTimeout(() => {
        // For demo purposes, hardcode a successful registration
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          userType: formData.userType
        }));
        localStorage.setItem('token', 'demo-token');
        setLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={registerBg}
          alt="DSVV Campus"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute mb-10 inset-0 flex flex-col justify-center items-center text-white">
          <img className="h-32 m-4 w-auto" src={dsvvLogo} alt="DSVV Logo" />

          <h1 className="relative z-50 font-extrabold font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight" style={{ textShadow: '0 0 15px rgba(0,0,0,0.5)' }}>
                <span className="ml-14">DSVV</span>
                <span className="block text-accent-400 mt-1" style={{ textShadow: '0 0 15px rgba(204,156,0,0.5)' }}>Connect</span>
              </h1>
          <p className="font-extrabold text-xl max-w-md text-center italic font-medium text-white mt-5">
Connect, Learn, Grow, Transform          </p>
        </div>
      </div>

      {/* Back to Home link - positioned at top left */}
      <div className="absolute top-4 right-4 z-10">
        <Link to="/" className="text-sm font-medium text-secondary-600 hover:text-secondary-500 flex items-center bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm transition-all duration-300 hover:bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">

          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-secondary-600 hover:text-secondary-500">
              sign in to your existing account
            </Link>
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="mt-6">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                        I am a <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <select
                          id="userType"
                          name="userType"
                          value={formData.userType}
                          onChange={handleChange}
                          className="input-field"
                        >
                          <option value="student">Student</option>
                          <option value="faculty">Faculty</option>
                          <option value="alumni">Alumni</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        required
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                        I agree to the{' '}
                        <Link to="/terms" className="font-medium text-secondary-600 hover:text-secondary-500">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="font-medium text-secondary-600 hover:text-secondary-500">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {formData.userType === 'student' ? 'Student Information' :
                          formData.userType === 'faculty' ? 'Faculty Information' :
                            'Alumni Information'}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Please provide your {formData.userType} details
                      </p>
                    </div>

                    {formData.userType === 'student' && (
                      <StudentRegistrationForm
                        formData={formData}
                        setFormData={setFormData}
                        error={fieldError}
                      />
                    )}

                    {formData.userType === 'faculty' && (
                      <FacultyRegistrationForm
                        formData={formData}
                        setFormData={setFormData}
                        error={fieldError}
                      />
                    )}

                    {formData.userType === 'alumni' && (
                      <AlumniRegistrationForm
                        formData={formData}
                        setFormData={setFormData}
                        error={fieldError}
                      />
                    )}

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Creating account...' : 'Create account'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
