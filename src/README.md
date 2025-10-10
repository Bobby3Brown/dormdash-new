# DormDash - Student Accommodation Platform

A comprehensive student accommodation platform for Nigeria that connects students with verified landlords and agents.

## Features

- **Property Search**: Advanced filtering by location, price range, property type, and amenities
- **Verification System**: Safety badges for verified landlords and properties
- **Boosting Services**: Three-tier property promotion (Basic ₦1,500, Pro ₦3,000, Premium ₦5,000)
- **Role-Based Dashboards**: 
  - Landlord Dashboard: Property management and analytics
  - Agent Dashboard: Client and commission tracking
  - Admin Dashboard: Platform administration
- **Secure Authentication**: Role-based permissions and user management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **WhatsApp Integration**: Quick contact functionality for property inquiries

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Project Structure

```
/
├── App.tsx                     # Main application with routing
├── types/
│   └── index.ts               # TypeScript definitions
├── data/
│   ├── constants.ts           # App constants
│   ├── mockProperties.ts      # Sample property data
│   ├── mockUsers.ts           # Sample user data
│   ├── navigation.ts          # Navigation configuration
│   └── index.ts              # Barrel exports
├── utils/
│   └── helpers.ts            # Utility functions
├── hooks/
│   ├── useWhatsAppContact.ts # WhatsApp integration hook
│   └── index.ts              # Barrel exports
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Main navigation
│   │   └── Footer.tsx        # Site footer
│   ├── home/
│   │   └── HomePage.tsx      # Landing page
│   ├── PropertySearch.tsx     # Property search & filters
│   ├── PropertyDetail.tsx     # Property details view
│   ├── LandlordDashboard.tsx # Landlord management
│   ├── AgentDashboard.tsx    # Agent management
│   ├── AdminDashboard.tsx    # Admin panel
│   ├── AuthPage.tsx          # Authentication
│   ├── BoostingServices.tsx  # Property boosting
│   └── ui/                   # Reusable UI components
└── styles/
    └── globals.css           # Global styles
```

## Getting Started

The application is configured for immediate use with mock data. User roles can be switched using the role selector in the header for testing different dashboard views.

### Available User Roles

- **Student**: Browse and search properties
- **Landlord**: List and manage properties
- **Agent**: Manage clients and track commissions
- **Admin**: Platform administration

## Key Components

### Layout Components
- **Header**: Navigation with role switcher and user menu
- **Footer**: Site information and links

### Feature Components
- **HomePage**: Hero section, featured properties, and CTAs
- **PropertySearch**: Advanced search with filters
- **PropertyDetail**: Comprehensive property information
- **Dashboards**: Role-specific management interfaces

### Custom Hooks
- **useWhatsAppContact**: Simplified WhatsApp integration

### Utility Functions
- Currency formatting
- Phone number formatting
- Text truncation
- Percentage calculations

## Design System

The application uses a cohesive design system with:
- Blue primary color scheme
- Responsive typography
- Consistent spacing and borders
- Mobile-first responsive design

## Documentation

For detailed information about the modular structure, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## License

All rights reserved © 2025 DormDash
