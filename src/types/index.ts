/**
 * Type definitions for DormDash application
 */

// User roles
export type UserRole = 'student' | 'landlord' | 'agent' | 'admin';

// Page types for navigation
export type PageType = 
  | 'home' 
  | 'search' 
  | 'property-detail' 
  | 'landlord-dashboard' 
  | 'agent-dashboard' 
  | 'admin-dashboard' 
  | 'auth' 
  | 'boosting'
  | 'profile';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  verified: boolean;
  avatar?: string;
  registrationDate?: string;
}

// Landlord information
export interface Landlord {
  id: string;
  name: string;
  phone: string;
  email: string;
  verified: boolean;
  rating: number;
  properties: number;
}

// Agent information
export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  verified: boolean;
  rating: number;
  commissionRate: number;
  properties: number;
  clients: number;
}

// Property interface
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: 'apartment' | 'house' | 'hostel' | 'room';
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  landlord: Landlord;
  agent?: Agent;
  isBoostingActive: boolean;
  boostingTier?: 'basic' | 'pro' | 'premium';
  boostingExpiresAt?: string;
  safetyRating: number;
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
}

// Navigation item
export interface NavigationItem {
  id: PageType;
  name: string;
  path?: string;
}

// Analytics data
export interface PropertyAnalytics {
  propertyId: string;
  views: number;
  inquiries: number;
  favorites: number;
  conversionRate: number;
  viewsHistory: {
    date: string;
    count: number;
  }[];
}

// Boosting tier
export interface BoostingTier {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

// Message/Inquiry
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  propertyId: string;
  propertyTitle: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Commission record
export interface Commission {
  id: string;
  propertyId: string;
  propertyTitle: string;
  landlordName: string;
  amount: number;
  rate: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
}

// Client (for agents)
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: number;
  preferredLocation: string;
  status: 'active' | 'viewing' | 'closed';
  addedDate: string;
}
