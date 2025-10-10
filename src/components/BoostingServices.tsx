import React, { useState } from 'react';
import { TrendingUp, Star, Zap, Crown, Check, Calendar, Target, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BoostingServices() {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  const boostingPlans = [
    {
      id: 'basic',
      name: 'Basic Boost',
      icon: TrendingUp,
      duration: '1 week',
      priceRange: '₦2,000 - ₦5,000',
      color: 'bg-blue-600',
      features: [
        'Priority listing in search results',
        'Basic highlighting in property lists',
        'Email support',
        '2x more visibility'
      ],
      benefits: '+50% more views',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Boost',
      icon: Star,
      duration: '2 weeks',
      priceRange: '₦5,000 - ₦10,000',
      color: 'bg-purple-600',
      features: [
        'Top placement in search results',
        'Enhanced property highlighting',
        'Social media promotion',
        'Priority customer support',
        '5x more visibility',
        'Featured in newsletter'
      ],
      benefits: '+150% more views',
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite Boost',
      icon: Crown,
      duration: '1 month',
      priceRange: '₦10,000 - ₦20,000',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-600',
      features: [
        'Featured placement on homepage',
        'Maximum visibility boost',
        'Dedicated account manager',
        'Professional photography tips',
        'Multi-platform promotion',
        '10x more visibility',
        'Premium badge display',
        'Analytics dashboard'
      ],
      benefits: '+300% more views',
      popular: false
    }
  ];

  const mockProperties = [
    { id: 1, title: 'Modern 2-Bedroom Apartment', location: 'Akoka, Lagos', currentViews: 145 },
    { id: 2, title: 'Student Hostel Complex', location: 'UI Campus, Ibadan', currentViews: 89 },
    { id: 3, title: '3-Bedroom House', location: 'Ota, Ogun State', currentViews: 67 }
  ];

  const successStories = [
    {
      landlord: 'Mrs. Funmi Adeleke',
      property: 'Student Hostel in Ibadan',
      boost: 'Premium Boost',
      result: '280% increase in inquiries',
      testimonial: 'My property was fully booked within 2 weeks of using Premium Boost!'
    },
    {
      landlord: 'Dr. Emmanuel Eze',
      property: 'Family House in Ogun',
      boost: 'Elite Boost',
      result: '450% increase in views',
      testimonial: 'The Elite Boost gave my property maximum visibility. Highly recommended!'
    }
  ];

  const handleBoostProperty = (planId: string) => {
    setSelectedPlan(planId);
    // Mock payment process
    alert(`Proceeding to payment for ${boostingPlans.find(p => p.id === planId)?.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl text-gray-900 mb-4">
          Boost Your Property Visibility
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get more views, inquiries, and bookings with our powerful boosting services. 
          Increase your property's visibility and connect with more students faster.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center">
          <div className="p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl text-gray-900 mb-1">3x</h3>
          <p className="text-gray-600">More Views on Average</p>
        </div>
        <div className="text-center">
          <div className="p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl text-gray-900 mb-1">85%</h3>
          <p className="text-gray-600">Faster Booking Rate</p>
        </div>
        <div className="text-center">
          <div className="p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-2xl text-gray-900 mb-1">72hrs</h3>
          <p className="text-gray-600">Average Time to First Inquiry</p>
        </div>
      </div>

      {/* Boosting Plans */}
      <div className="mb-12">
        <h2 className="text-2xl text-gray-900 text-center mb-8">Choose Your Boosting Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boostingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-500 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-2xl text-gray-900">{plan.priceRange}</div>
                <div className="text-sm text-gray-600">{plan.duration}</div>
                <div className="text-lg text-green-600">{plan.benefits}</div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleBoostProperty(plan.id)}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Property Selection */}
      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Select Property to Boost</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a property to boost" />
              </SelectTrigger>
              <SelectContent>
                {mockProperties.map((property) => (
                  <SelectItem key={property.id} value={property.id.toString()}>
                    {property.title} - {property.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedProperty && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm text-gray-900 mb-2">Current Performance</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Monthly Views</p>
                    <p className="text-lg text-gray-900">
                      {mockProperties.find(p => p.id.toString() === selectedProperty)?.currentViews || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Inquiries</p>
                    <p className="text-lg text-gray-900">12</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Conversion Rate</p>
                    <p className="text-lg text-gray-900">8.3%</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="text-2xl text-gray-900 text-center mb-8">How Boosting Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
              1
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Select Property</h3>
            <p className="text-sm text-gray-600">Choose which property you want to boost from your listings</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
              2
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Choose Plan</h3>
            <p className="text-sm text-gray-600">Select the boosting plan that fits your budget and goals</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
              3
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Make Payment</h3>
            <p className="text-sm text-gray-600">Secure payment processing with multiple payment options</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
              4
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Get Results</h3>
            <p className="text-sm text-gray-600">Watch your property views and inquiries increase immediately</p>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-12">
        <h2 className="text-2xl text-gray-900 text-center mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <Card key={index} className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    {story.landlord.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-900">{story.landlord}</h4>
                    <p className="text-sm text-gray-600">{story.property}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    {story.boost}
                  </Badge>
                  <p className="text-lg text-green-600 mb-2">{story.result}</p>
                </div>
                <blockquote className="text-gray-700 italic">
                  "{story.testimonial}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl mb-4">Ready to Boost Your Property?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of successful landlords who have increased their bookings with our boosting services.
        </p>
        <div className="space-x-4">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Started Now
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}