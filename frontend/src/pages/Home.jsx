import { Link } from 'react-router-dom';
import heroImage from '../assets/images/home-hero.jpg';
import studentIcon from '../assets/images/student.png';
import facultyIcon from '../assets/images/faculty.png';
import alumniIcon from '../assets/images/alumni.png';

export default function Home() {
const features = [
    {
      name: 'Academic Portfolios',
      description: 'Showcase your academic achievements, research interests, and professional skills.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
    },
    {
      name: 'Discussion Forums',
      description: 'Engage in academic conversations with faculty verification for quality content.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
    },
    {
      name: 'Academic Resources',
      description: 'Access a curated library of study materials, research papers, and educational content.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      name: 'Events Calendar',
      description: 'Stay updated with academic events, workshops, seminars, and register directly.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      ),
    },
    {
      name: 'Career Center',
      description: 'Discover internships and job opportunities aligned with DSVV values and principles.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
    },
    {
      name: 'Wellness Center',
      description: 'Access resources for meditation, yoga, and holistic well-being practices.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      name: 'Spirituality Center',
      description: 'Explore spiritual practices, philosophy, and access resources for inner growth and transformation.',
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" className="w-6 h-6">
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="50" fontFamily="Devanagari, serif">ॐ</text>
    </svg>
      ),
    },
    {
      name: 'Networking Hub',
      description: 'Connect with alumni, industry experts, and like-minded individuals for personal and professional growth.',
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
</svg>

      ),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
     <div className="relative min-h-[100vh] md:min-h-[110vh] flex flex-col">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="h-full w-full object-cover"
            src={heroImage}
            alt="DSVV Campus"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-[100vh] md:h-[110vh] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">

            {/* Atom animation with title as nucleus */}
            <div className="relative flex justify-center items-center h-[180px] sm:h-[200px] md:h-[250px] lg:h-[300px]">
              {/* Main heading as nucleus - brought forward with higher z-index */}
              <h1 className="relative z-50 font-extrabold font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight" style={{ textShadow: '0 0 15px rgba(0,0,0,0.5)' }}>
                <span>DSVV<span className="block text-accent-400 mt-1" style={{ textShadow: '0 0 15px rgba(204,156,0,0.5)' }}>Connect</span></span>
              </h1>

              {/* Electron orbits - all pushed to the back */}
              <div className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full animate-spin-slow z-1" style={{ animationDuration: '15s', transform: 'rotateZ(30deg)' }}>
                <div className="absolute h-full w-full rounded-full" style={{ border: '1px solid rgba(255,255,255,0.1)' }}></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-500 to-secondary-600 flex items-center justify-center shadow-lg shadow-secondary-500/20 animate-pulse-glow">
                    {features[0].icon}
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-500 to-secondary-600 flex items-center justify-center shadow-lg shadow-secondary-500/20 animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                    {features[1].icon}
                  </div>
                </div>
              </div>

              <div className="absolute w-[280px] h-[160px] sm:w-[350px] sm:h-[200px] md:w-[450px] md:h-[250px] lg:w-[550px] lg:h-[300px] animate-spin-slow z-1" style={{ animationDuration: '25s', transform: 'rotateX(70deg) rotateY(20deg) rotateZ(15deg)' }}>
                <div className="absolute h-full w-full rounded-full" style={{ border: '1px solid rgba(255,255,255,0.1)' }}></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center shadow-lg shadow-red-500/20 animate-pulse-glow">
                    {features[2].icon}
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center shadow-lg shadow-red-500/20 animate-pulse-glow" style={{ animationDelay: '0.7s' }}>
                    {features[3].icon}
                  </div>
                </div>
              </div>

              <div className="absolute w-[160px] h-[280px] sm:w-[200px] sm:h-[350px] md:w-[250px] md:h-[450px] lg:w-[300px] lg:h-[550px] animate-reverse-spin-slow z-1" style={{ animationDuration: '20s', transform: 'rotateX(10deg) rotateY(80deg) rotateZ(-15deg)' }}>
                <div className="absolute h-full w-full rounded-full" style={{ border: '1px solid rgba(255,255,255,0.1)' }}></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 animate-pulse-glow">
                    {features[4].icon}
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 animate-pulse-glow" style={{ animationDelay: '0.3s' }}>
                    {features[5].icon}
                  </div>
                </div>
              </div>

              <div className="absolute w-[320px] h-[200px] sm:w-[400px] sm:h-[250px] md:w-[500px] md:h-[300px] lg:w-[600px] lg:h-[350px] animate-reverse-spin-slow z-1" style={{ animationDuration: '30s', transform: 'rotateX(45deg) rotateY(30deg) rotateZ(60deg)' }}>
                <div className="absolute h-full w-full rounded-full" style={{ border: '1px solid rgba(255,255,255,0.1)' }}></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20 animate-pulse-glow">
                    {features[6].icon}
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20 animate-pulse-glow" style={{ animationDelay: '0.9s' }}>
                    {features[7].icon}
                  </div>
                </div>
              </div>
            </div>

            {/* Slogan with custom font - brought forward and closer to title */}
            <p className="-mt-8 sm:-mt-12 -mb-1 text-sm sm:text-2xl font-extrabold italic font-medium text-white tracking-wide z-50 relative" style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
              Where Academic Excellence Meets Spiritual Wisdom
            </p>

            {/* Description with improved readability - brought forward - hidden on mobile */}
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white font-montserrat font-light leading-relaxed z-50 relative hidden sm:block" style={{ textShadow: '0 0 8px rgba(0,0,0,0.5)' }}>
A dedicated social platform for Dev Sanskriti Vishwavidyalaya to connect students, faculty, and alumni in an academic setting.           
 </p>

            {/* Modern CTA buttons with hover effects */}
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 relative z-50">
              <Link
                to="/register"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-gradient-to-r from-secondary-600 to-secondary-700 text-white font-montserrat font-semibold tracking-wide shadow-lg shadow-secondary-700/30 hover:shadow-xl hover:shadow-secondary-700/40 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
              >
                Join Now
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-montserrat font-semibold tracking-wide hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Arrow scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <a
            href="#features"
            className="group flex flex-col items-center"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Features section */}
      <div id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-50 mb-4">
              <span className="text-secondary-600 text-sm font-montserrat font-medium tracking-wide">Discover What We Offer</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-playfair font-bold text-gray-900 sm:text-5xl sm:tracking-tight">
              Everything you need for academic success
            </h2>
            <p className="max-w-xl mt-5 mx-auto text-base sm:text-xl text-gray-500 font-montserrat font-light px-4 sm:px-0">
              DSVV Connect provides a distraction-free environment focused on academic growth and holistic development.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary-100 relative overflow-hidden"
                >
                  {/* Decorative background pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary-50/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon with gradient background */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg shadow-md mb-6 group-hover:shadow-secondary-500/20 transition-all duration-300 group-hover:scale-110">
                      <div className="h-6 w-6 text-white" aria-hidden="true">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Feature number */}
                    <span className="absolute -top-2 -left-2 text-4xl font-playfair font-bold text-gray-100 opacity-50">
                      {index + 1}
                    </span>

                    {/* Feature content */}
                    <h3 className="text-xl font-montserrat font-semibold text-gray-900 mb-4">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 font-montserrat leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User types section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-secondary-600 tracking-wide uppercase">For Everyone</h2>
            <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Designed for the DSVV community
            </p>
            <p className="max-w-xl mt-5 mx-auto text-base sm:text-xl text-gray-500 px-4 sm:px-0">
              Whether you're a student, faculty member, or alumni, DSVV Connect has features tailored for you.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Students */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-center">
                    <img src={studentIcon} alt="Student" className="h-24 w-24" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-center text-gray-900">Students</h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Access to academic resources</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Connect with peers and faculty</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Discover internship opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Faculty */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-center">
                    <img src={facultyIcon} alt="Faculty" className="h-24 w-24" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-center text-gray-900">Faculty</h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Share academic materials</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Moderate discussion forums</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Announce events and workshops</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Alumni */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-center">
                    <img src={alumniIcon} alt="Alumni" className="h-24 w-24" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-center text-gray-900">Alumni</h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Mentor current students</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Post job opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600">Stay connected with alma mater</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-secondary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-accent-500">Join DSVV Connect today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-secondary-600 bg-white hover:bg-gray-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-secondary-700 hover:bg-secondary-800"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
