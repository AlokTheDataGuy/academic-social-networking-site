import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const EventCard = ({ event, variant = 'default' }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };
  
  // Check if event is upcoming
  const isUpcoming = new Date(event.startDate) > new Date();
  
  // Check if event is happening today
  const isToday = () => {
    const today = new Date();
    const eventDate = new Date(event.startDate);
    return (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    );
  };
  
  // Check if event is happening now
  const isHappeningNow = () => {
    const now = new Date();
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    return now >= start && now <= end;
  };
  
  // Get event status badge
  const getEventStatus = () => {
    if (isHappeningNow()) {
      return <Badge variant="success" rounded>Happening Now</Badge>;
    }
    if (isToday()) {
      return <Badge variant="warning" rounded>Today</Badge>;
    }
    if (isUpcoming) {
      return <Badge variant="info" rounded>Upcoming</Badge>;
    }
    return <Badge variant="gray" rounded>Past</Badge>;
  };
  
  // Compact variant
  if (variant === 'compact') {
    return (
      <div className="flex items-center p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-secondary-600 rounded-lg flex flex-col items-center justify-center mr-4">
          <span className="text-xs font-medium">{new Date(event.startDate).toLocaleString('default', { month: 'short' })}</span>
          <span className="text-lg font-bold leading-none">{new Date(event.startDate).getDate()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <Link to={`/events/${event.id}`} className="text-sm font-medium text-gray-900 hover:text-secondary-600 truncate">
            {event.title}
          </Link>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <ClockIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>{formatTime(event.startDate)}</span>
            <span className="mx-1">•</span>
            <MapPinIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        {getEventStatus()}
      </div>
    );
  }
  
  // Calendar variant
  if (variant === 'calendar') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
        <div className="bg-primary-50 p-3 border-b border-gray-200">
          <div className="text-center">
            <span className="text-sm font-medium text-gray-700">{new Date(event.startDate).toLocaleString('default', { month: 'long' })}</span>
            <div className="text-3xl font-bold text-secondary-600">{new Date(event.startDate).getDate()}</div>
            <span className="text-xs text-gray-500">{new Date(event.startDate).toLocaleString('default', { weekday: 'long' })}</span>
          </div>
        </div>
        <div className="p-3">
          <Link to={`/events/${event.id}`} className="text-sm font-medium text-gray-900 hover:text-secondary-600 line-clamp-2">
            {event.title}
          </Link>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <ClockIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>{formatTime(event.startDate)}</span>
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <MapPinIcon className="h-3 w-3 mr-1" aria-hidden="true" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.attendees && (
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <UserGroupIcon className="h-3 w-3 mr-1" aria-hidden="true" />
              <span>{event.attendees} attending</span>
            </div>
          )}
          <div className="mt-3">
            {getEventStatus()}
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Event image */}
      {event.image && (
        <div className="relative h-48">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            {getEventStatus()}
          </div>
          {event.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="accent" rounded>Featured</Badge>
            </div>
          )}
        </div>
      )}
      
      {/* Event content */}
      <div className="p-4">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
          <span>{formatDate(event.startDate)}</span>
          <span className="mx-1">•</span>
          <ClockIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
          <span>{formatTime(event.startDate)}</span>
        </div>
        
        <Link to={`/events/${event.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-secondary-600 mb-2">
            {event.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
          <span className="truncate">{event.location}</span>
        </div>
        
        {/* Event organizer */}
        {event.organizer && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="font-medium">Organized by:</span>
            <span className="ml-1">{event.organizer}</span>
          </div>
        )}
        
        {/* Event tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.map((tag) => (
              <Link key={tag} to={`/events/tags/${tag}`}>
                <Badge variant="primary" size="sm">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
        
        {/* Event attendees */}
        {event.attendees && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <UserGroupIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
            <span>{event.attendees} attending</span>
          </div>
        )}
        
        {/* Event actions */}
        <div className="flex items-center justify-between mt-4">
          {isUpcoming ? (
            <Button
              variant={event.isRegistered ? "secondary" : "primary"}
              size="sm"
              fullWidth
            >
              {event.isRegistered ? (
                <span className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  Registered
                </span>
              ) : (
                'Register Now'
              )}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              to={`/events/${event.id}`}
              fullWidth
            >
              <span className="flex items-center justify-center">
                View Details
                <ArrowRightIcon className="h-4 w-4 ml-1" aria-hidden="true" />
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string,
    organizer: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    attendees: PropTypes.number,
    isRegistered: PropTypes.bool,
    featured: PropTypes.bool,
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact', 'calendar']),
};

export default EventCard;
