# DormDash - Security Documentation

## Overview
This document outlines the security measures, best practices, and recommendations for the DormDash student accommodation platform.

## ⚠️ Important Security Notice

**This is a frontend prototype application.** For production deployment with real user data, you MUST implement proper backend security measures using a service like Supabase, Firebase, or a custom backend API.

## Current Frontend Security Measures

### 1. Input Validation & Sanitization

#### Enhanced Input Fields
All input fields include:
- **Type validation**: Email, phone, password, etc.
- **Required field enforcement**: Critical fields marked as required
- **Visual feedback**: 
  - Gray border (default)
  - Blue border with glow (focus)
  - Red border (error/invalid)
- **Length requirements**: Passwords must be 8+ characters

#### Password Fields
```typescript
- Minimum 8 characters
- Hidden by default with show/hide toggle
- Not stored in plain text (would be hashed on backend)
- Password confirmation matching
```

### 2. Authentication Flow

#### Login Process
1. Email and password validation
2. Backend authentication (to be implemented)
3. JWT token issuance (backend)
4. Secure session management
5. Success toast notification

#### Registration Process
1. User type selection (Landlord/Agent only)
2. Full name, email, phone validation
3. Password creation with confirmation
4. Terms of service agreement
5. Email verification (simulated)
6. Profile auto-generation
7. Success dialog with next steps

#### Password Reset Flow
1. Email verification
2. Reset link generation (backend)
3. New password creation
4. Password confirmation matching
5. Success notification
6. Automatic redirect to login

### 3. Protection Against Common Attacks

#### XSS (Cross-Site Scripting) Protection
- React's built-in JSX escaping
- No `dangerouslySetInnerHTML` usage
- Input sanitization on all form fields

#### CSRF (Cross-Site Request Forgery) Protection
- Would require backend CSRF tokens
- Same-site cookie policies (backend)

#### SQL Injection Protection
- Backend: Use parameterized queries
- ORM frameworks (Prisma, TypeORM)
- Supabase Row Level Security (RLS)

#### Brute Force Protection
- Rate limiting (backend required)
- Account lockout after failed attempts
- CAPTCHA for multiple failures

## Recommended Backend Implementation

### Using Supabase (Recommended)

```typescript
// Example Supabase Authentication Setup

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Sign Up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securePassword123',
  options: {
    data: {
      full_name: 'John Doe',
      phone: '+234 800 000 0000',
      role: 'landlord'
    }
  }
})

// Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securePassword123'
})

// Password Reset
const { data, error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com',
  { redirectTo: 'https://yourdomain.com/reset-password' }
)
```

### Row Level Security (RLS) Policies

```sql
-- Example RLS Policies for Supabase

-- Landlords can only see/edit their own properties
CREATE POLICY "Landlords can view own properties"
ON properties FOR SELECT
USING (auth.uid() = landlord_id);

CREATE POLICY "Landlords can update own properties"
ON properties FOR UPDATE
USING (auth.uid() = landlord_id);

-- Students can view all public properties
CREATE POLICY "Students can view all properties"
ON properties FOR SELECT
USING (is_published = true);

-- Prevent unauthorized access to user data
CREATE POLICY "Users can only view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);
```

## Data Protection Measures

### 1. Password Security
- **Never store passwords in plain text**
- Use bcrypt or argon2 for hashing
- Minimum 10 rounds for bcrypt
- Add salt for additional security

### 2. Sensitive Data Encryption
```typescript
// Phone numbers
- Store in encrypted format
- Decrypt only when displaying to authorized users

// Email addresses
- Verify ownership before use
- Implement email verification flow

// Payment information
- NEVER store credit card details
- Use payment processors (Paystack, Flutterwave)
- Store only payment reference IDs
```

### 3. Session Management
```typescript
// JWT Token Security
- Short expiration times (15-30 minutes)
- Refresh token rotation
- Secure HTTP-only cookies
- SameSite cookie attribute

// Session Storage
- Use secure, HTTP-only cookies
- Never store tokens in localStorage
- Implement token refresh mechanism
```

## API Security Best Practices

### 1. Rate Limiting
```typescript
// Implement rate limits for:
- Login attempts: 5 per 15 minutes
- Registration: 3 per hour per IP
- Password reset: 3 per hour
- API calls: 100 per minute per user
```

### 2. Input Validation
```typescript
// Backend validation (example with Zod)
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+234\d{10}$/),
  password: z.string().min(8).max(100)
})
```

### 3. CORS Configuration
```typescript
// Only allow requests from your domain
const corsOptions = {
  origin: 'https://yourdomain.com',
  credentials: true,
  optionsSuccessStatus: 200
}
```

## Environment Variables Security

### Never Commit These to Git
```bash
# .env.local (add to .gitignore)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PAYSTACK_SECRET_KEY=your_paystack_secret
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
```

## Payment Security

### Integration with Nigerian Payment Processors

```typescript
// Paystack Integration (Recommended)
import { Paystack } from 'paystack-sdk'

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!)

// Never expose secret keys to frontend
// All payment processing should happen on backend

// Verify payments server-side
const verifyPayment = async (reference: string) => {
  const response = await paystack.transaction.verify(reference)
  // Update database only after verification
}
```

### PCI Compliance
- Never handle credit card data directly
- Use payment processor's hosted forms
- Implement 3D Secure authentication
- Log all payment transactions
- Regular security audits

## Monitoring & Logging

### Security Event Logging
```typescript
// Log security-relevant events:
- Failed login attempts
- Password reset requests
- Profile changes
- Property deletions
- Payment transactions
- Admin actions

// Use structured logging
logger.warn('Failed login attempt', {
  email: user.email,
  ip: req.ip,
  timestamp: new Date(),
  userAgent: req.headers['user-agent']
})
```

### Audit Trail
- Track all data modifications
- Record who, what, when, where
- Store logs securely
- Regular review of suspicious activity

## Compliance & Legal

### Data Protection (NDPR - Nigeria)
- Obtain explicit consent for data collection
- Clear privacy policy
- Data retention policies
- Right to access/delete data
- Data breach notification procedures

### User Agreements
- Terms of Service
- Privacy Policy
- Cookie Policy
- Landlord/Agent agreements
- Commission structure clarity

## Security Checklist for Production

### Before Launch
- [ ] Implement backend authentication (Supabase/Firebase)
- [ ] Set up Row Level Security (RLS) policies
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Add CAPTCHA for forms
- [ ] Implement email verification
- [ ] Set up backup system
- [ ] Create disaster recovery plan
- [ ] Conduct security audit
- [ ] Penetration testing
- [ ] Legal review of terms
- [ ] NDPR compliance check

### Ongoing Security
- [ ] Regular security updates
- [ ] Dependency vulnerability scanning
- [ ] Log monitoring and alerts
- [ ] Regular backup testing
- [ ] Security training for team
- [ ] Incident response plan
- [ ] Regular penetration testing
- [ ] User security education

## Contact & Reporting

### Security Vulnerabilities
If you discover a security vulnerability, please email:
- security@dormdash.ng (setup required)

### Incident Response
1. Immediate containment
2. Assessment of impact
3. User notification (if required)
4. Fix implementation
5. Post-incident review
6. Update security measures

## Additional Resources

### Recommended Tools
- **Supabase**: Backend & Authentication
- **Sentry**: Error tracking
- **Cloudflare**: DDoS protection
- **Let's Encrypt**: Free SSL certificates
- **GitHub Dependabot**: Dependency scanning
- **OWASP ZAP**: Security testing

### Learning Resources
- OWASP Top 10 Security Risks
- Nigeria Data Protection Regulation (NDPR)
- Web Security Best Practices
- Supabase Security Documentation

---

## Disclaimer

This security documentation provides guidelines and best practices. Implementing these measures requires backend development expertise. For production deployment with real user data, consult with security professionals and conduct thorough security audits.

**DormDash is currently a frontend prototype and should not be used for production without proper backend security implementation.**
