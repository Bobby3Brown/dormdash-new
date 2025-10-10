# DormDash - Project Structure

This document outlines the modular file structure of the DormDash application.

## Directory Structure

```
/
├── App.tsx                          # Main application entry point with routing logic
├── types/
│   └── index.ts                     # TypeScript type definitions and interfaces
├── data/
│   ├── index.ts                     # Barrel export for all data modules
│   ├── constants.ts                 # Application-wide constants
│   ├── mockProperties.ts            # Mock property data for development
│   ├── mockUsers.ts                 # Mock user data for development
│   └── navigation.ts                # Navigation menu items
├── utils/
│   └── helpers.ts                   # Utility functions (formatting, calculations, etc.)
├── components/
│   ├── layout/                      # Layout components
│   │   ├── Header.tsx              # Main navigation header
│   │   └── Footer.tsx              # Site footer
│   ├── home/                        # Home page components
│   │   └── HomePage.tsx            # Main landing page
│   ├── PropertySearch.tsx           # Property search and filtering
│   ├── PropertyDetail.tsx           # Individual property details view with image carousel
│   ├── ProfilePage.tsx              # User profile management page
│   ├── ForgotPasswordModal.tsx      # Password reset flow
│   ├── LandlordDashboard.tsx       # Landlord dashboard
│   ├── AgentDashboard.tsx          # Agent dashboard
│   ├── AdminDashboard.tsx          # Admin dashboard
│   ├── AuthPage.tsx                # Authentication/registration page
│   ├── SignInPage.tsx              # Sign-in page
│   ├── BoostingServices.tsx        # Property boosting services
│   ├── ui/                          # Reusable UI components (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx              # Enhanced with focus styles
│   │   ├── sonner.tsx             # Toast notifications
│   │   └── ...                     # Other shadcn components
│   └── figma/                       # Figma-specific components
│       └── ImageWithFallback.tsx   # Image component with fallback
└── styles/
    └── globals.css                  # Global styles and Tailwind configuration
```

## Module Organization

### Types (`/types`)
Contains all TypeScript interfaces and type definitions:
- `Property` - Property data structure
- `User` - User account structure
- `PropertyAnalytics` - Analytics data structure
- `PageType` - Valid page routes
- `NavigationItem` - Navigation menu items

### Data (`/data`)
Centralized data management:
- `constants.ts` - App-wide constants (locations, amenities, tiers, etc.)
- `mockProperties.ts` - Sample property listings
- `mockUsers.ts` - Sample user accounts for different roles
- `navigation.ts` - Navigation menu configuration
- `index.ts` - Convenient barrel exports

### Utils (`/utils`)
Reusable utility functions:
- Currency formatting
- Phone number formatting for WhatsApp
- WhatsApp URL generation
- Text truncation
- Percentage calculations

### Components

#### Layout Components (`/components/layout`)
- `Header.tsx` - Navigation bar with user menu, role switcher, and mobile menu
- `Footer.tsx` - Site footer with links and branding

#### Feature Components
- `HomePage.tsx` - Landing page with hero, featured properties, and CTAs
- `PropertySearch.tsx` - Search interface with filters and results
- `PropertyDetail.tsx` - Detailed property view with 10-image carousel and contact options
- `ProfilePage.tsx` - User profile with stats, edit mode, and quick actions
- `ForgotPasswordModal.tsx` - Multi-step password reset flow
- `LandlordDashboard.tsx` - Property management for landlords
- `AgentDashboard.tsx` - Client and commission management for agents
- `AdminDashboard.tsx` - Platform administration interface
- `AuthPage.tsx` - User authentication and registration with toast notifications
- `SignInPage.tsx` - Dedicated sign-in page with forgot password link
- `BoostingServices.tsx` - Property promotion tiers and pricing

#### UI Components (`/components/ui`)
Reusable components from shadcn/ui library

#### Figma Components (`/components/figma`)
Protected components for Figma integration

## Key Features of the Modular Structure

1. **Separation of Concerns**: Each module has a single, well-defined purpose
2. **Type Safety**: Centralized type definitions ensure consistency
3. **Reusability**: Utility functions and constants are easily shared
4. **Maintainability**: Clear organization makes code easy to find and update
5. **Scalability**: Easy to add new features without cluttering existing code
6. **Enhanced UX**: Toast notifications, password reset, and improved input styling
7. **Profile Management**: Auto-generated profiles with edit capabilities

## Import Patterns

### Importing Types
```typescript
import { Property, User, PageType } from '../types';
```

### Importing Data
```typescript
import { mockProperties, mockUsers, navigationItems } from '../data';
// or specific imports:
import { mockProperties } from '../data/mockProperties';
```

### Importing Constants
```typescript
import { LOCATIONS, PROPERTY_TYPES, BOOSTING_TIERS } from '../data/constants';
```

### Importing Utils
```typescript
import { formatCurrency, createWhatsAppUrl } from '../utils/helpers';
```

### Importing Components
```typescript
// Layout components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Feature components
import { HomePage } from './components/home/HomePage';

// UI components
import { Button } from './components/ui/button';
```

## Best Practices

1. **Keep components focused**: Each component should have one primary responsibility
2. **Use TypeScript types**: Import and use defined types for all props and data
3. **Extract reusable logic**: Move common functions to `/utils/helpers.ts`
4. **Centralize constants**: Add new constants to `/data/constants.ts`
5. **Update types**: When adding new data structures, update `/types/index.ts`

## Recent Enhancements (October 2025)

### Authentication & Security
- **Forgot Password Flow**: Multi-step password reset with email verification
- **Toast Notifications**: Success/error messages for login, signup, and password reset
- **Enhanced Input Styling**: 
  - Default: Light gray border (#d1d5db)
  - Focus: Blue border with soft glow (ring-4)
  - Typing: Dark gray text (#111827) for clarity
  - Hover: Slightly darker border

### Profile Management
- **Auto-generated Profiles**: Created from signup data (name, email, phone)
- **Profile Page**: Clean layout with avatar, stats, and quick actions
- **Edit Mode**: In-place editing of profile information
- **Role-specific Benefits**: Custom content for landlords vs agents

### UI/UX Improvements
- **Simplified Header**: No role selector when not logged in
- **Clean Landing Page**: Public-facing homepage for visitors
- **10-Image Carousel**: Properties now display all 10 photos with thumbnails
- **Professional Navigation**: Improved mobile menu and user dropdown
- **Modern Design**: White and blue color scheme with subtle shadows

## Future Enhancements

Consider adding:
- `/hooks` - Custom React hooks for shared logic (✓ Already added)
- `/services` - API integration layer (Supabase recommended)
- `/contexts` - React Context providers for global state
- `/lib` - Third-party library configurations
