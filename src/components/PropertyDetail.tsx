import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Shield, Phone, Mail, Share2, Heart, Calendar, Wifi, Zap, Droplets, Car, Lock, Settings, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Property } from '../types';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

export function PropertyDetail({ property, onBack }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [api, setApi] = useState<any>();

  if (!property) return null;

  React.useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // WhatsApp contact functions
  const handleWhatsAppContact = (contactName: string, phone: string, propertyTitle: string) => {
    const message = `Hi ${contactName}, I'm interested in your property "${propertyTitle}" listed on DormDash. Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const amenityIcons = {
    wifi: Wifi,
    electricity: Zap,
    water: Droplets,
    parking: Car,
    security: Lock,
    generator: Settings,
    kitchen: Settings
  };

  const reviews = [
    {
      id: 1,
      name: "Adebayo Okunola",
      rating: 5,
      comment: "Excellent accommodation! Very close to campus and the landlord is very responsive.",
      date: "2 weeks ago",
      avatar: "https://images.unsplash.com/photo-1620829813573-7c9e1877706f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NTg4MTI3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      name: "Fatima Mohammed",
      rating: 4,
      comment: "Good property with reliable electricity and water supply. The agent was very helpful.",
      date: "1 month ago",
      avatar: "https://images.unsplash.com/photo-1620829813573-7c9e1877706f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NTg4MTI3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Property Images Carousel */}
          <div className="space-y-4">
            <Carousel 
              className="relative w-full" 
              setApi={setApi}
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <ImageWithFallback
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation Buttons */}
              <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
              <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
              
              {/* Action Buttons - Favorite & Share */}
              <div className="absolute top-4 right-4 flex space-x-2 z-10">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="bg-white/90 hover:bg-white shadow-lg"
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white shadow-lg"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Boost Badge */}
              {property.isBoostingActive && (
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-white z-10 shadow-lg">
                  {property.boostType === 'elite' ? 'Elite' : 
                   property.boostType === 'premium' ? 'Premium' : 'Basic'} Boost
                </Badge>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </Carousel>
            
            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-blue-600 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm sm:text-base">{property.location}</span>
                </div>
              </div>
              <div className="sm:text-right">
                <div className="text-xl sm:text-2xl text-gray-900 mb-1">
                  ₦{property.price.toLocaleString()}/year
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {property.safetyRating} ({property.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <Badge variant="secondary" className="capitalize">
                {property.type}
              </Badge>
              {property.landlord.verified && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified Property
                </Badge>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg text-gray-900 mb-4">Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {property.amenities.map((amenity) => {
                const IconComponent = amenityIcons[amenity] || Settings;
                return (
                  <div key={amenity} className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                    <span className="text-sm sm:text-base text-gray-700 capitalize">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-lg text-gray-900 mb-4">Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm text-gray-900">{review.name}</h4>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Landlord Info */}
              <div>
                <h4 className="text-sm text-gray-900 mb-2 flex items-center">
                  Landlord
                  {property.landlord.verified && (
                    <Shield className="h-3 w-3 text-green-500 ml-1" />
                  )}
                </h4>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{property.landlord.name}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Phone className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Call</span>
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Email</span>
                    </Button>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          className="w-full bg-[#25D366] hover:bg-[#20B358] text-white shadow-sm"
                          onClick={() => handleWhatsAppContact(property.landlord.name, property.landlord.phone, property.title)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Landlord
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chat directly with the landlord on WhatsApp</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <Separator />

              {/* Agent Info */}
              {property.agent && (
                <div>
                  <h4 className="text-sm text-gray-900 mb-2 flex items-center">
                    Agent
                    {property.agent.verified && (
                      <Shield className="h-3 w-3 text-green-500 ml-1" />
                    )}
                  </h4>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">{property.agent.name}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Call</span>
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Mail className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Email</span>
                      </Button>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            className="w-full bg-[#25D366] hover:bg-[#20B358] text-white shadow-sm"
                            onClick={() => handleWhatsAppContact(property.agent.name, property.agent.phone, property.title)}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message Agent
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chat directly with the agent on WhatsApp</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              )}
            </CardContent>
          </Card>

          {/* Schedule Visit */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule a Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Book Viewing
              </Button>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Free property viewing with verified agents
              </p>
            </CardContent>
          </Card>

          {/* Safety Information */}
          <Card>
            <CardHeader>
              <CardTitle>Safety Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-700">Area Safety Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm">{property.safetyRating}/5</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Security</span>
                  <span className="text-green-600">Good</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transportation</span>
                  <span className="text-green-600">Excellent</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Utilities</span>
                  <span className="text-green-600">Reliable</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Properties */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center py-4">
                Discover more properties in this area
              </p>
              <Button variant="outline" className="w-full">
                View Similar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}