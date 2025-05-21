const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide resource title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide resource description'],
    trim: true,
    maxlength: [5000, 'Description cannot be more than 5000 characters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileUrl: {
    type: String,
    required: [true, 'Please provide resource file URL']
  },
  fileType: {
    type: String,
    enum: ['pdf', 'doc', 'ppt', 'image', 'video', 'audio', 'other'],
    required: [true, 'Please provide resource file type']
  },
  fileSize: {
    type: Number,
    required: [true, 'Please provide resource file size']
  },
  category: {
    type: String,
    enum: ['lecture', 'assignment', 'research', 'book', 'article', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true
  }],
  subject: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  downloads: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    downloadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: {
      type: String,
      trim: true,
      maxlength: [500, 'Review cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
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
});

// Virtual for average rating
ResourceSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) {
    return 0;
  }
  
  const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
});

// Virtual for download count
ResourceSchema.virtual('downloadCount').get(function() {
  return this.downloads.length;
});

// Set virtuals to true when converting to JSON
ResourceSchema.set('toJSON', { virtuals: true });
ResourceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Resource', ResourceSchema);
