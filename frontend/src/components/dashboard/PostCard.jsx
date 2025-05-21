import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon, 
  BookmarkIcon,
  CheckBadgeIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [saved, setSaved] = useState(post.isSaved || false);
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };
  
  const handleComment = () => {
    setShowComments(!showComments);
  };
  
  const handleShare = () => {
    // Share functionality would go here
    console.log('Share post:', post.id);
  };
  
  // Format date to relative time (e.g., "2 hours ago")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar 
            src={post.author.profilePicture} 
            alt={post.author.name} 
            size="md" 
            status={post.author.isOnline ? "online" : undefined}
          />
          <div className="ml-3">
            <div className="flex items-center">
              <Link to={`/profile/${post.author.id}`} className="text-sm font-medium text-gray-900 hover:underline">
                {post.author.name}
              </Link>
              {post.author.isVerified && (
                <CheckBadgeIcon className="ml-1 h-4 w-4 text-secondary-600" aria-hidden="true" />
              )}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <span>{formatDate(post.createdAt)}</span>
              <span className="mx-1">•</span>
              <span className="capitalize">{post.author.userType}</span>
              {post.isVerified && (
                <Badge variant="success" size="sm" className="ml-2">Verified</Badge>
              )}
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      
      {/* Post content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/tags/${tag}`}>
                <Badge variant="primary" size="sm" rounded>
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Post media */}
      {post.media && post.media.length > 0 && (
        <div className={`grid ${post.media.length === 1 ? 'grid-cols-1' : post.media.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-1`}>
          {post.media.map((media, index) => (
            <div 
              key={index} 
              className={`${post.media.length === 1 ? 'col-span-1' : post.media.length === 2 ? 'col-span-1' : index === 0 ? 'col-span-3' : 'col-span-1'} overflow-hidden`}
            >
              <img 
                src={media} 
                alt={`Post media ${index + 1}`} 
                className="w-full h-full object-cover"
                style={{ maxHeight: post.media.length === 1 ? '500px' : '250px' }}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Post stats */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <span>{likesCount} likes</span>
          <span className="mx-2">•</span>
          <span>{post.commentsCount || 0} comments</span>
        </div>
        {post.views && (
          <div>{post.views} views</div>
        )}
      </div>
      
      {/* Post actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
        <button
          className={`flex items-center text-sm font-medium ${liked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={handleLike}
        >
          {liked ? (
            <HeartIconSolid className="h-5 w-5 mr-1" aria-hidden="true" />
          ) : (
            <HeartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
          )}
          <span>Like</span>
        </button>
        
        <button
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          onClick={handleComment}
        >
          <ChatBubbleLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
          <span>Comment</span>
        </button>
        
        <button
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          onClick={handleShare}
        >
          <ShareIcon className="h-5 w-5 mr-1" aria-hidden="true" />
          <span>Share</span>
        </button>
        
        <button
          className={`flex items-center text-sm font-medium ${saved ? 'text-secondary-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={handleSave}
        >
          <BookmarkIcon className="h-5 w-5 mr-1" aria-hidden="true" />
          <span>Save</span>
        </button>
      </div>
      
      {/* Comments section (conditionally rendered) */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          {/* Comment input */}
          <div className="flex items-start space-x-3 mb-4">
            <Avatar 
              src="https://picsum.photos/200/200?random=1" 
              alt="Your avatar" 
              size="sm" 
            />
            <div className="flex-1">
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:border-transparent"
                placeholder="Write a comment..."
                rows={2}
              />
              <div className="mt-2 flex justify-end">
                <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-3 py-1 rounded-md text-sm font-medium">
                  Post
                </button>
              </div>
            </div>
          </div>
          
          {/* Comments list */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar 
                    src={comment.author.profilePicture} 
                    alt={comment.author.name} 
                    size="sm" 
                  />
                  <div className="flex-1">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                      <div className="flex items-center">
                        <Link to={`/profile/${comment.author.id}`} className="text-sm font-medium text-gray-900 hover:underline">
                          {comment.author.name}
                        </Link>
                        {comment.author.isVerified && (
                          <CheckBadgeIcon className="ml-1 h-4 w-4 text-secondary-600" aria-hidden="true" />
                        )}
                      </div>
                      <p className="text-sm text-gray-800">{comment.content}</p>
                    </div>
                    <div className="mt-1 flex items-center space-x-3 text-xs text-gray-500">
                      <span>{formatDate(comment.createdAt)}</span>
                      <button className="hover:text-gray-700">Like</button>
                      <button className="hover:text-gray-700">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
      userType: PropTypes.string.isRequired,
      isVerified: PropTypes.bool,
      isOnline: PropTypes.bool,
    }).isRequired,
    content: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string.isRequired,
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    views: PropTypes.number,
    isVerified: PropTypes.bool,
    isLiked: PropTypes.bool,
    isSaved: PropTypes.bool,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          profilePicture: PropTypes.string,
          isVerified: PropTypes.bool,
        }).isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default PostCard;
