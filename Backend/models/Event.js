const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide event description'],
    trim: true,
    maxlength: [5000, 'Description cannot be more than 5000 characters']
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide event start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide event end date']
  },
  location: {
    type: String,
    required: [true, 'Please provide event location'],
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['academic', 'cultural', 'sports', 'workshop', 'seminar', 'other'],
    default: 'academic'
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['going', 'interested', 'not going'],
      default: 'interested'
    }
  }],
  maxAttendees: {
    type: Number,
    default: 0 // 0 means unlimited
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);
