import React, { useState, useMemo } from 'react';
import { Search, MapPin, Filter, Star, Shield, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProperties } from '../data/mockProperties';
import { Property } from '../types';
import { useWhatsAppContact } from '../hooks';

interface PropertySearchProps {
  onPropertySelect: (property: Property) => void;
}

export function PropertySearch({ onPropertySelect }: PropertySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const { sendWhatsAppMessage } = useWhatsAppContact();
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const locations = ['Lagos State', 'Oyo State', 'Ogun State', 'Federal Capital Territory', 'Rivers State'];
  const propertyTypes = ['apartment', 'house', 'hostel'];
  const amenities = ['wifi', 'electricity', 'water', 'parking', 'security', 'generator', 'kitchen'];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };

  const filteredProperties = useMemo(() => {
    let filtered = mockProperties.filter(property => {
      const matchesSearch = !searchTerm || 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !selectedLocation || selectedLocation === 'all' || 
        property.location.includes(selectedLocation);
      
      const matchesType = !selectedType || selectedType === 'all' || property.type === selectedType;
      
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      
      const matchesAmenities = selectedAmenities.length === 0 ||
        selectedAmenities.every(amenity => property.amenities.includes(amenity));

      return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesAmenities;
    });

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.safetyRating - a.safetyRating);
        break;
      case 'boosted':
        filtered.sort((a, b) => Number(b.isBoostingActive) - Number(a.isBoostingActive));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [searchTerm, selectedLocation, selectedType, priceRange, selectedAmenities, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-4">Find Student Accommodation</h1>
        <p className="text-gray-600">
          Search through thousands of verified properties across Nigeria
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by property name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="sm:col-span-1">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-1">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {propertyTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-3">
                Price Range: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500000}
                min={0}
                step={10000}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-3">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenities.map(amenity => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                    />
                    <label className="text-sm text-gray-700 capitalize">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="text-gray-600 text-sm sm:text-base">
          Showing {filteredProperties.length} properties
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Most Relevant</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="boosted">Boosted First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Results */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="lg:flex">
              <div className="relative lg:w-48 lg:flex-shrink-0">
                <ImageWithFallback
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 lg:h-full object-cover lg:rounded-l-lg"
                />
                {property.isBoostingActive && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {property.boostType === 'elite' ? 'Elite' : 
                     property.boostType === 'premium' ? 'Premium' : 'Basic'}
                  </Badge>
                )}
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800 capitalize">
                    {property.type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-6 flex-1">
                <h3 className="text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {property.safetyRating} ({property.reviews} reviews)
                    </span>
                  </div>
                  {property.landlord.verified && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  {property.amenities.slice(0, 4).map(amenity => (
                    <Badge key={amenity} variant="secondary" className="text-xs capitalize">
                      {amenity}
                    </Badge>
                  ))}
                  {property.amenities.length > 4 && (
                    <span className="text-xs text-gray-500">
                      +{property.amenities.length - 4} more
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl text-gray-900">
                      ₦{property.price.toLocaleString()}/year
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button 
                      onClick={() => onPropertySelect(property)}
                      variant="outline"
                      className="w-full sm:flex-1"
                    >
                      View Details
                    </Button>
                    <Button 
                      onClick={() => handleQuickContact(
                        property.landlord.name, 
                        property.landlord.phone, 
                        property.title
                      )}
                      className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20B358] text-white px-3"
                      title="Quick WhatsApp contact"
                    >
                      <MessageCircle className="h-4 w-4 sm:mr-0 mr-2" />
                      <span className="sm:hidden">WhatsApp</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <Search className="h-16 w-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-lg text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more properties.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedType('all');
                setPriceRange([0, 500000]);
                setSelectedAmenities([]);
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}