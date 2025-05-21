# DSVV Academic Social Network

A specialized social platform for Dev Sanskriti Vishwavidyalaya that connects students, faculty, and alumni in an academic-focused environment.

## Features

- User profiles with academic portfolios and achievements
- Content sharing with academic focus (no ads/distractions)
- Discussion forums with faculty verification system
- Academic Resources and Study Materials Hub
- Events Calendar with Event Registration
- Career center with values-aligned opportunities
- Alumni networking with mentorship capabilities
- "Sanskar Points" gamification system
- Wellness center with meditation/yoga resources

## Tech Stack

- **Frontend**: React with Vite, Tailwind CSS
- **Backend**: Node.js/Express with JWT authentication
- **Database**: MongoDB for content
- **Real-time**: Socket.io for messaging and notifications



## Project Structure

```
├── Frontend/                # React frontend
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   └── ...
├── Backend/                 # Express backend
│   ├── controllers/         # Request handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   └── server.js            # Entry point
└── ...
```

## Design

The platform follows DSVV's branding guidelines with a focus on:
- Modern UI with DSVV branding
- Responsive design for all devices
- Clean typography with Poppins as primary font
- Subtle animations for engagement
- Accessibility compliance

## Typography

- **Primary Font**: 'Poppins' (clean, modern, highly readable)
  - Headers: Poppins Semi-Bold
  - Body: Poppins Regular
  - Special elements: Poppins Light Italic

- **Secondary Font**: 'Yatra One' (for Sanskrit terms and cultural elements)
- **Tertiary Font**: 'Noto Sans Devanagari' (for Hindi/Sanskrit script)

## Key Pages

1. Login/Registration
2. Main Dashboard/Feed
3. User Profile
4. Academic Resources Hub
5. Discussion Forums ("Gyan Mandap")
6. Events Calendar
7. Career Center ("Karma Path")
8. Alumni Network
9. Wellness Center ("Prakrti")
11. Notifications & Messaging Center
12. Search & Discovery
13. Administration Dashboard
14. Patron Founder Page 
