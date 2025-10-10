# DormDash - Authentication & User Management Guide

## Overview
This document provides a comprehensive guide to the authentication system, user management, and profile features in DormDash.

## Authentication Features

### 1. User Registration (Sign Up)

#### Who Can Register?
- **Landlords**: Property owners who want to list their properties
- **Agents**: Property agents who manage properties on behalf of landlords
- **Students**: No registration required - can browse freely

#### Registration Process
1. Navigate to the Auth page
2. Select user type (Landlord or Agent)
3. Fill in required information:
   - Full Name
   - Email Address
   - Password (minimum 8 characters)
   - Phone Number
   - Accept Terms of Service
4. Submit registration
5. Receive welcome dialog with next steps
6. Account is automatically created

#### What Happens After Registration?
- Profile is auto-generated with provided information
- User is redirected to their dashboard (Landlord or Agent)
- Welcome email is sent (simulated in prototype)
- Success toast notification appears

### 2. User Login (Sign In)

#### Login Process
1. Navigate to the Auth page or Sign In page
2. Enter email and password
3. Optional: Check "Remember me"
4. Click "Sign In"
5. Success toast notification
6. Redirect to appropriate dashboard

#### Security Features
- Password visibility toggle (show/hide)
- Email validation
- Loading state during authentication
- Error handling for invalid credentials
- Success notifications

### 3. Forgot Password Flow

#### How to Reset Password
1. Click "Forgot your password?" on login page
2. Enter your email address
3. Click "Send Reset Link"
4. Check your email for reset link (simulated)
5. Enter new password (minimum 8 characters)
6. Confirm new password
7. Click "Reset Password"
8. Success notification appears
9. Redirect back to login

#### Security Measures
- Email verification required
- Password strength requirements (8+ characters)
- Password confirmation matching
- Secure token generation (backend required)
- Time-limited reset links (backend required)

## User Profile Management

### Auto-Generated Profiles

When a user registers, their profile is automatically created with:
- **Full Name**: From registration form
- **Email Address**: From registration form
- **Phone Number**: From registration form
- **Role**: Landlord or Agent
- **Verified Status**: Initial status (verified by admin later)
- **Registration Date**: Current date
- **Profile Picture**: Default avatar with first initial

### Profile Page Features

#### Profile Information Display
- Avatar with first name initial
- Full name and role badge
- Verification status badge
- Contact information (email, phone)
- Join date
- Quick stats:
  - Properties listed/managed
  - Inquiries/clients
  - Account status

#### Edit Profile
1. Click "Edit Profile" button
2. Update fields:
   - Full Name
   - Email Address
   - Phone Number
3. Click "Save Changes"
4. Success toast notification
5. Profile updates immediately

#### Profile Picture
- Click camera icon on avatar
- Upload new photo (coming soon)
- Automatic thumbnail generation

#### Quick Actions
- Go to Dashboard
- Add New Property (Landlords)
- View All Listings
- Account Settings
- Notification Preferences
- Help & Support

### Role-Specific Benefits

#### Landlords
- List unlimited properties
- Boost listings for better visibility
- Direct communication with students
- Verified badge for trusted properties

#### Agents
- Manage multiple client properties
- Earn 5-10% commission on rentals
- Track all commissions in one place
- Build property portfolio

## Input Field Enhancements

### Visual Feedback System

#### Default State
- Light gray border (#d1d5db)
- Gray placeholder text (#9ca3af)
- White background

#### Focus State
- Blue border (#3b82f6)
- Blue ring/glow effect (4px)
- Enhanced visibility
- Smooth transition

#### Typing State
- Dark gray text (#111827)
- High contrast for readability
- Clear character visibility

#### Hover State
- Slightly darker border
- Smooth transition effect

#### Error/Invalid State
- Red border (#ef4444)
- Red ring/glow effect
- Error message displayed
- Maintains accessibility

#### Disabled State
- Gray background
- Reduced opacity (50%)
- Cursor: not-allowed
- No interaction possible

### Accessibility Features
- ARIA labels on all inputs
- Keyboard navigation support
- Screen reader compatible
- High contrast ratios
- Focus indicators

## Toast Notifications

### Types of Notifications

#### Success Toasts (Green)
- "Account created successfully!"
- "Login successful! Welcome back."
- "Password reset successful!"
- "Profile updated successfully!"
- "Property added successfully!"

#### Error Toasts (Red)
- "Passwords do not match!"
- "Password must be at least 8 characters long!"
- "Invalid email or password"
- "An error occurred. Please try again."

#### Info Toasts (Blue)
- "Reset link sent to your email!"
- "Verification email sent"
- "Settings saved"

### Toast Features
- Auto-dismiss after 4 seconds
- Manual dismiss option
- Position: Top-right corner
- Smooth slide-in animation
- Stack multiple toasts
- Rich colors and icons
- Responsive design

## Navigation Improvements

### Public Header (Not Logged In)
- Clean DormDash logo
- Navigation menu: Home, Search, Boosting
- "Browse Properties" button
- "Login / Sign Up" button (blue, prominent)
- Mobile-responsive hamburger menu

### Authenticated Header (Logged In)
- DormDash logo
- Navigation menu
- Dashboard button (for Landlords/Agents)
- User profile dropdown with:
  - Name and role
  - Profile link
  - Settings link
  - Logout button

### Mobile Navigation
- Hamburger menu icon
- Full-screen mobile menu
- User profile section
- Quick access to dashboard
- All navigation items
- Clean logout button

## Best Practices for Users

### Password Security
1. Use at least 8 characters
2. Mix uppercase and lowercase letters
3. Include numbers and symbols
4. Avoid common words or patterns
5. Don't reuse passwords from other sites
6. Change password regularly

### Account Security
1. Verify your email address
2. Keep contact information updated
3. Enable two-factor authentication (coming soon)
4. Log out when using shared computers
5. Don't share your password
6. Report suspicious activity

### Profile Management
1. Complete all profile fields
2. Upload a professional photo
3. Keep contact information current
4. Update listings regularly
5. Respond to inquiries promptly

## Troubleshooting

### Can't Log In?
- Verify email address is correct
- Check password spelling (case-sensitive)
- Use "Forgot Password" to reset
- Clear browser cache
- Try a different browser
- Contact support if issue persists

### Didn't Receive Reset Email?
- Check spam/junk folder
- Verify email address spelling
- Wait a few minutes for delivery
- Request a new reset link
- Contact support

### Profile Not Updating?
- Refresh the page
- Check internet connection
- Verify all required fields are filled
- Try logging out and back in
- Contact support

## Future Enhancements

### Planned Features
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Google, Facebook)
- [ ] SMS verification
- [ ] Email verification
- [ ] Profile picture upload
- [ ] Password strength meter
- [ ] Account activity log
- [ ] Login history
- [ ] Device management
- [ ] Session management
- [ ] Privacy settings
- [ ] Notification preferences

### Backend Integration (Required)
- Supabase Authentication
- Secure password hashing (bcrypt)
- JWT token management
- Session management
- Email service integration
- SMS service integration
- File upload service
- Database security (RLS)

## Support & Contact

### Need Help?
- Visit our Help Center (coming soon)
- Email: support@dormdash.ng
- Phone: +234 800 DORMDASH
- WhatsApp: +234 800 000 0000

### Report Issues
- Security concerns: security@dormdash.ng
- Bug reports: bugs@dormdash.ng
- Feature requests: feedback@dormdash.ng

---

**Note**: This is a frontend prototype. For production deployment, backend security implementation is required. See [SECURITY.md](./SECURITY.md) for detailed security guidelines.
