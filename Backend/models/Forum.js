const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide forum title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide forum description'],
    trim: true,
    maxlength: [5000, 'Description cannot be more than 5000 characters']
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: String,
    enum: ['academic', 'research', 'campus', 'career', 'wellness', 'other'],
    default: 'academic'
  },
  topics: [{
    title: {
      type: String,
      required: [true, 'Please provide topic title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Please provide topic content'],
      trim: true,
      maxlength: [5000, 'Content cannot be more than 5000 characters']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    replies: [{
      content: {
        type: String,
        required: [true, 'Please provide reply content'],
        trim: true,
        maxlength: [2000, 'Reply cannot be more than 2000 characters']
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
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
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    views: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    isClosed: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isPrivate: {
    type: Boolean,
    default: false
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
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

// Virtual for topic count
ForumSchema.virtual('topicCount').get(function() {
  return this.topics.length;
});

// Virtual for member count
ForumSchema.virtual('memberCount').get(function() {
  return this.members.length;
});

// Set virtuals to true when converting to JSON
ForumSchema.set('toJSON', { virtuals: true });
ForumSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Forum', ForumSchema);
