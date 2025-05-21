import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch events
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          title: 'Annual Yoga Conference',
          date: 'June 21, 2023',
          time: '9:00 AM - 5:00 PM',
          location: 'Main Auditorium',
          description: 'Join us for a day of yoga, meditation, and spiritual discussions with renowned yoga practitioners from around the world.',
          image: 'https://picsum.photos/800/400?random=1',
          attendees: 120,
          organizer: 'Department of Yoga Studies',
        },
        {
          id: 2,
          title: 'Research Methodology Workshop',
          date: 'July 5, 2023',
          time: '10:00 AM - 3:00 PM',
          location: 'Academic Block B',
          description: 'A comprehensive workshop on research methodologies, paper writing, and publication strategies for faculty and research scholars.',
          image: 'https://picsum.photos/800/400?random=2',
          attendees: 45,
          organizer: 'Research Department',
        },
        {
          id: 3,
          title: 'Alumni Meet 2023',
          date: 'July 15, 2023',
          time: '11:00 AM - 6:00 PM',
          location: 'Conference Hall',
          description: 'Annual gathering of DSVV alumni to reconnect, network, and share experiences with current students.',
          image: 'https://picsum.photos/800/400?random=3',
          attendees: 85,
          organizer: 'Alumni Association',
        },
        {
          id: 4,
          title: 'Cultural Festival: Sanskritik Mahotsav',
          date: 'August 10-12, 2023',
          time: 'All Day',
          location: 'University Campus',
          description: 'Three-day cultural extravaganza featuring traditional performances, art exhibitions, and workshops celebrating Indian heritage.',
          image: 'https://picsum.photos/800/400?random=4',
          attendees: 350,
          organizer: 'Cultural Committee',
        },
        {
          id: 5,
          title: 'International Conference on Holistic Education',
          date: 'September 5-7, 2023',
          time: '9:00 AM - 6:00 PM',
          location: 'Shantikunj Auditorium',
          description: 'Global conference bringing together educators, researchers, and practitioners to discuss innovations in holistic education approaches.',
          image: 'https://picsum.photos/800/400?random=5',
          attendees: 200,
          organizer: 'Department of Education',
        },
        {
          id: 6,
          title: 'Meditation Retreat',
          date: 'October 1-5, 2023',
          time: 'Residential',
          location: 'Meditation Center',
          description: 'Five-day intensive meditation retreat guided by experienced practitioners, focusing on ancient meditation techniques.',
          image: 'https://picsum.photos/800/400?random=6',
          attendees: 60,
          organizer: 'Spiritual Department',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Events header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Upcoming events section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div key={event.id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-5 flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        {event.attendees} attending
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  </div>
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Organized by: {event.organizer}</span>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar section */}
          <div className="bg-white shadow rounded-lg overflow-hidden p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Calendar</h2>
            <p className="text-gray-600 mb-4">
              View and filter upcoming events on our interactive calendar. Click on any event to see details and register.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500">
                Open Calendar View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
