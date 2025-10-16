import React, { useState } from 'react';
import { Search, MapPin, Shield, Star, TrendingUp, Users, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getAllProducts } from '../../api/api';
import { Property, PageType } from '../../types';
import { useWhatsAppContact } from '../../hooks';
// import { userInfo } from 'os';
// import { useUser } from '../../context/UserContext'

interface HomePageProps {
  onPropertySelect: (property: Property) => void;
  onNavigate: (page: PageType) => void;
}
const API_URL = `https://dormdash-backend.vercel.app`
export function HomePage({ onPropertySelect, onNavigate }: HomePageProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const { sendWhatsAppMessage } = useWhatsAppContact();
  // const {email} = useUser();

  const handleSearch = () => {
    onNavigate('search');
  };

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await getAllProducts();
        if (!mounted) return;
        // guard if API returns undefined/null
        setFeaturedProperties((all || []).slice(0, 3));
      } catch (err) {
        console.error('Failed to load properties', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
              Find Your Perfect Student Accommodation
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto px-4">
              Verified properties near Nigerian universities. Safe, affordable, and perfect for students.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="e.g. Akoka, Lagos"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 h-11 sm:h-12"
                  />
                </div>
              </div>
              
              
              <div>
                <label className="block text-gray-700 mb-2">Property Type</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 h-11 sm:h-12">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 sm:h-12"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-1 sm:mb-2">100%</h3>
              <p className="text-sm sm:text-base text-gray-600">Verified Properties</p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-1 sm:mb-2">5,000+</h3>
              <p className="text-sm sm:text-base text-gray-600">Happy Students</p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-1 sm:mb-2">4.8/5</h3>
              <p className="text-sm sm:text-base text-gray-600">Average Rating</p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="bg-orange-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-1 sm:mb-2">500+</h3>
              <p className="text-sm sm:text-base text-gray-600">New Listings Monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {/* <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4">Featured Properties</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Handpicked accommodations near top universities</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Array.isArray(featuredProperties) && featuredProperties.length > 0 ? (
              featuredProperties.map((property) => {
                const imageSrc = property?.pictures?.[0] || '/placeholder.jpg';
                const landlord = property?.landlord || { name: 'Owner', phone: '', verified: false };
                const price = typeof property?.price === 'number' ? property.price : Number(property?.rent || 0);
                const amenities = Array.isArray(property?.amenities) ? property.amenities : [];
                return (
                  <Card 
                    key={property?.id || `${property?.title}-${Math.random()}`} 
                    className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer bg-white"
                    onClick={() => onPropertySelect(property)}
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 bg-gray-200">
                      <ImageWithFallback
                        src={imageSrc}
                        alt={property?.title || 'Property'}
                        className="w-full h-full object-cover"
                      />
                      {landlord.verified && (
                        <Badge className="absolute top-3 right-3 bg-green-500 text-white border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {property?.isBoostingActive && (
                        <Badge className="absolute top-3 left-3 bg-yellow-500 text-white border-0">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base sm:text-lg line-clamp-2">{property?.title || 'Untitled'}</CardTitle>
                      <div className="flex items-center text-gray-600 text-sm mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property?.location || 'Location not specified'}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-xl sm:text-2xl text-blue-600">₦{(price || 0).toLocaleString()}</span>
                          <span className="text-gray-500 text-sm">/year</span>
                        </div>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{property?.safetyRating ?? 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          sendWhatsAppMessage(
                            landlord.name,
                            landlord.phone,
                            property?.title || ''
                          );
                          const res = fetch(`http://localhost:2100/profile/updateListing`,{
                            method: 'POST',
                            headers:{
                              'Content-Type':'application/json',
                              Accept:'application/json'
                            },
                            body: JSON.stringify({
                              email: userInfo
                            })
                          })
                        }}
                        variant="outline"
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Quick Contact via WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-500">No featured properties available</div>
            )}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section> */}

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Find your perfect accommodation in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-2 sm:mb-3">Search</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
                Browse through hundreds of verified properties near your university
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-2 sm:mb-3">Connect</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
                Contact verified landlords and agents directly through the platform
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-2 sm:mb-3">Move In</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
                Complete the process and move into your new home with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Are you a landlord or agent?</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            List your properties on DormDash and reach thousands of students looking for accommodation
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              onClick={() => onNavigate('auth')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => onNavigate('boosting')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
            >
              View Boosting Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
