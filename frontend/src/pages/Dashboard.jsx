import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUserType) {
      setUserType(storedUserType);
    }

    // Simulate API calls
    setTimeout(() => {
      // Mock data
      setPosts([
        {
          id: 1,
          author: 'Dr. Pranav Pandya',
          authorRole: 'Faculty',
          content: 'Just published a new research paper on "The Impact of Meditation on Academic Performance". Check it out in the resources section!',
          likes: 24,
          comments: 8,
          time: '2 hours ago',
        },
        {
          id: 2,
          author: 'Aditya Sharma',
          authorRole: 'Student',
          content: 'Looking for study partners for the upcoming Sanskrit literature exam. Anyone interested can join our study group in the library tomorrow at 4 PM.',
          likes: 15,
          comments: 12,
          time: '5 hours ago',
        },
        {
          id: 3,
          author: 'Meera Patel',
          authorRole: 'Alumni',
          content: 'Excited to announce that my company is offering 5 internship positions exclusively for DSVV students. Details in the Career Center!',
          likes: 45,
          comments: 7,
          time: '1 day ago',
        },
      ]);

      setEvents([
        {
          id: 1,
          title: 'Annual Yoga Conference',
          date: 'June 21, 2023',
          location: 'Main Auditorium',
          attendees: 120,
        },
        {
          id: 2,
          title: 'Research Methodology Workshop',
          date: 'July 5, 2023',
          location: 'Academic Block B',
          attendees: 45,
        },
        {
          id: 3,
          title: 'Alumni Meet 2023',
          date: 'July 15, 2023',
          location: 'Conference Hall',
          attendees: 85,
        },
      ]);

      setResources([
        {
          id: 1,
          title: 'Introduction to Vedic Mathematics',
          type: 'PDF',
          downloads: 156,
          author: 'Dr. Suresh Joshi',
        },
        {
          id: 2,
          title: 'Meditation Techniques for Students',
          type: 'Video',
          views: 230,
          author: 'Prof. Radha Sharma',
        },
        {
          id: 3,
          title: 'Sanskrit Grammar Basics',
          type: 'PDF',
          downloads: 98,
          author: 'Dr. Anand Mishra',
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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main content - Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create post card */}
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-secondary-500 focus-within:ring-1 focus-within:ring-secondary-500">
                      <textarea
                        rows={3}
                        name="comment"
                        id="comment"
                        className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                        placeholder="Share something with the community..."
                      />
                      <div className="py-2 px-3 border-t border-gray-200 flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-500 hover:text-secondary-600 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-500 hover:text-secondary-600 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                            </svg>
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${post.author.replace(' ', '+')}&background=random`}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <p className="text-sm text-gray-500">{post.authorRole} • {post.time}</p>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-700">
                        <p>{post.content}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between">
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm text-gray-500 hover:text-secondary-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                          </svg>
                          {post.likes}
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center text-sm text-gray-500 hover:text-secondary-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                          </svg>
                          {post.comments}
                        </button>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-secondary-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User profile card */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-medium text-gray-900">{user?.name || 'Guest User'}</p>
                      <p className="text-sm text-gray-500">
                        {userType === 'student' ? 'Student' :
                         userType === 'faculty' ? 'Faculty' :
                         userType === 'alumni' ? 'Alumni' :
                         userType === 'admin' ? 'Administrator' : 'Guest'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">125</p>
                      <p className="text-xs text-gray-500">Connections</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">48</p>
                      <p className="text-xs text-gray-500">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">350</p>
                      <p className="text-xs text-gray-500">Sanskar Points</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/profile"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* Upcoming events */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
                  <div className="mt-4 space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {event.date}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {event.location}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                          </svg>
                          {event.attendees} attending
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/events"
                      className="text-sm font-medium text-secondary-600 hover:text-secondary-500"
                    >
                      View all events →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Popular resources */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Popular Resources</h3>
                  <div className="mt-4 space-y-4">
                    {resources.map((resource) => (
                      <div key={resource.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                          {resource.type}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                          {resource.author}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          {resource.downloads ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              {resource.downloads} downloads
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {resource.views} views
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/resources"
                      className="text-sm font-medium text-secondary-600 hover:text-secondary-500"
                    >
                      View all resources →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
