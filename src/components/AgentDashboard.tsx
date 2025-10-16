import React, { useState } from 'react';
import { Plus, Home, Users, DollarSign, Clock, FileText, Edit, Eye, Phone, Mail, BarChart3, MousePointer, MapPin, Star, TrendingUp, Upload, MessageSquare, LogOut, User, Calendar, Building2, CheckCircle2, Crown, Zap, Settings, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getAllProducts, createProduct, updateProduct } from '../api/api';
import { toast } from 'sonner';
import { User as UserType } from '../types';
import { useUser } from '../context/UserContext';

interface AgentDashboardProps {
  user?: UserType;
}

export function AgentDashboard({ user }: AgentDashboardProps) {
  const ctx = useUser();
  const resolvedUser: UserType = user ?? ({
    id: 'ctx-user',
    name: ctx.fullname || 'Agent',
    email: ctx.email || '',
    phone: ctx.number || '',
    role: (ctx.mode as any) || 'agent',
    verified: false
  } as UserType);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [agentProperties, setAgentProperties] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await getAllProducts();
        if (!mounted) return;
        setAgentProperties(all || []);
      } catch (err) {
        console.error('Failed to load agent properties', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Sidebar menu items
  const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'properties', label: 'My Properties', icon: Building2 },
    { id: 'add-property', label: 'Add New Property', icon: Plus },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'commission', label: 'Commission', icon: DollarSign },
    { id: 'boosting', label: 'Boosting Plan', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // TODO: fetch student messages from API. Replaced mock data with empty array.
  const studentMessages: any[] = [];

  // TODO: fetch boosting info from API. Replaced with empty list.
  const boostedProperties: any[] = [];

  const handleWhatsAppMessage = (phone: string, propertyTitle: string, studentName: string) => {
    const message = `Hi ${studentName}, thank you for your interest in "${propertyTitle}". I'm Jane Agent from DormDash and I'd be happy to help you with this property. When would be a good time for a viewing?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const stats = [
    { 
      label: 'Active Listings', 
      value: '8', 
      icon: Home, 
      change: '+2 this week',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Active Clients', 
      value: '15', 
      icon: Users, 
      change: '+3 new clients',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      label: 'Monthly Commission', 
      value: '₦186,000', 
      icon: DollarSign, 
      change: '+12% from last month',
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Pending Tasks', 
      value: '4', 
      icon: Clock, 
      change: '2 urgent',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const clients = [
    {
      id: 1,
      name: 'Adebayo Johnson',
      email: 'adebayo@email.com',
      phone: '+234 801 234 5678',
      status: 'active',
      propertyInterest: 'Apartment in Lagos',
      budget: '₦100k - ₦150k',
      lastContact: '2 days ago'
    },
    {
      id: 2,
      name: 'Fatima Mohammed',
      email: 'fatima@email.com',
      phone: '+234 802 345 6789',
      status: 'viewing',
      propertyInterest: 'Hostel near UI',
      budget: '₦80k - ₦120k',
      lastContact: '1 week ago'
    },
    {
      id: 3,
      name: 'Chinedu Okafor',
      email: 'chinedu@email.com',
      phone: '+234 803 456 7890',
      status: 'negotiating',
      propertyInterest: 'House in Ogun',
      budget: '₦180k - ₦250k',
      lastContact: '3 days ago'
    }
  ];

  const commissionHistory = [
    { id: 1, property: 'Modern Apartment A12', client: 'John Doe', amount: 18000, rate: '6%', date: '2024-09-15', status: 'paid' },
    { id: 2, property: 'Student Hostel B5', client: 'Jane Smith', amount: 12000, rate: '8%', date: '2024-09-10', status: 'pending' },
    { id: 3, property: 'Family House C3', client: 'Mike Johnson', amount: 24000, rate: '5%', date: '2024-09-05', status: 'paid' }
  ];

  const AddClientForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input id="clientName" placeholder="Enter client name" />
        </div>
        <div>
          <Label htmlFor="clientEmail">Email Address</Label>
          <Input id="clientEmail" type="email" placeholder="client@email.com" />
        </div>
  </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientPhone">Phone Number</Label>
          <Input id="clientPhone" placeholder="+234 800 000 0000" />
        </div>
        <div>
          <Label htmlFor="budget">Budget Range</Label>
          <Input id="budget" placeholder="₦100,000 - ₦150,000" />
        </div>
      </div>
      
      <div>
        <Label htmlFor="propertyType">Property Interest</Label>
        <Input id="propertyType" placeholder="e.g., 2-bedroom apartment in Lagos" />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setIsAddClientOpen(false)}>
          Add Client
        </Button>
      </div>
    </div>
  );

  const AddPropertyForm = ({ initialData }: { initialData?: any } = {}) => {
    const [showImage, setShowImage] = useState<string>('')
    const [formData, setFormData] = useState(() => ({
      title: '',
      type: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      description: '',
      amenities: [] as string[],
      images: [] as string[],
      landlordName: '',
      landlordPhone: '',
      landlordEmail: '',
      commissionRate: '7',
      availableDate: ''
    , ...initialData }));

    const availableAmenities = [
      'wifi', 'electricity', 'water', 'parking', 'generator', 'security', 
      'furnished', 'kitchen', 'laundry', 'cleaning', 'gym', 'pool'
    ];

    const handleAmenityToggle = (amenity: string) => {
      setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    };

    const handleSubmit = async () => {
      try {
        const payload = {
          title: formData.title,
          type: formData.type,
          location: formData.location,
          rent: Number(formData.price || 0),
          bedrooms: Number(formData.bedrooms) || 1,
          availability: formData.availableDate,
          amnities: formData.amenities,
          boost: 0,
          description: formData.description,
          contactinfo: `${formData.landlordName} | ${formData.landlordPhone} | ${formData.landlordEmail}`,
          pictures: formData.images,
          owneremail: formData.landlordEmail || resolvedUser.email || ''
        };

        if (initialData && initialData.id) {
          // Update existing product
          await updateProduct(initialData.id, payload);
          toast.success('Property updated successfully');
        } else {
          // Create new product
          await createProduct(payload);
          toast.success('Property created successfully');
        }

        // Refresh properties list
        try {
          const all = await getAllProducts();
          setAgentProperties(all || []);
        } catch (e) {
          console.error('Failed to refresh properties', e);
        }

        // Clear editing state and close form
        setEditingProduct(null);
        setIsAddPropertyOpen(false);
      } catch (err) {
        console.error('Failed to create/update property', err);
        toast.error('Failed to create/update property');
      }
    };

    return (
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3>Property Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Property Title *</Label>
              <Input 
                id="title" 
                placeholder="e.g., Modern 2-Bedroom Apartment Near UNILAG"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="type">Property Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="hostel">Student Hostel</SelectItem>
                  <SelectItem value="room">Single Room</SelectItem>
                  <SelectItem value="shared">Shared Accommodation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input 
              id="location" 
              placeholder="e.g., Akoka, Lagos State (Near University of Lagos)"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h3>Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Annual Rent (₦) *</Label>
              <Input 
                id="price" 
                type="number" 
                placeholder="120000"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select value={formData.bedrooms} onValueChange={(value) => setFormData({...formData, bedrooms: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select value={formData.bathrooms} onValueChange={(value) => setFormData({...formData, bathrooms: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bathroom</SelectItem>
                  <SelectItem value="2">2 Bathrooms</SelectItem>
                  <SelectItem value="3">3 Bathrooms</SelectItem>
                  <SelectItem value="4">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="availableDate">Available From</Label>
              <Input 
                id="availableDate" 
                type="date"
                value={formData.availableDate}
                onChange={(e) => setFormData({...formData, availableDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Select value={formData.commissionRate} onValueChange={(value) => setFormData({...formData, commissionRate: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5% Commission</SelectItem>
                  <SelectItem value="6">6% Commission</SelectItem>
                  <SelectItem value="7">7% Commission</SelectItem>
                  <SelectItem value="8">8% Commission</SelectItem>
                  <SelectItem value="10">10% Commission</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Landlord Information */}
        <div className="space-y-4">
          <h3>Landlord Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="landlordName">Landlord Name *</Label>
              <Input 
                id="landlordName" 
                placeholder="Full name"
                value={formData.landlordName}
                onChange={(e) => setFormData({...formData, landlordName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="landlordPhone">Landlord Phone *</Label>
              <Input 
                id="landlordPhone" 
                placeholder="+234 800 000 0000"
                value={formData.landlordPhone}
                onChange={(e) => setFormData({...formData, landlordPhone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="landlordEmail">Landlord Email</Label>
              <Input 
                id="landlordEmail" 
                type="email"
                placeholder="landlord@email.com"
                value={formData.landlordEmail}
                onChange={(e) => setFormData({...formData, landlordEmail: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h3>Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {availableAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="rounded"
                />
                <span className="text-sm capitalize">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Property Description *</Label>
          <Textarea 
            id="description" 
            placeholder="Describe the property, nearby facilities, transportation, and any special features..."
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        
        {/* Images */}
         <>
                <Label>Property Images</Label>
                {
                  showImage === '' ? (
                     <div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload up to 10 high-quality photos (optional)
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Include exterior, interior, bedrooms, kitchen, bathroom, and
                        nearby areas
                      </p>
        
                      <input
                        type="file"
                        id="landlord-images-input"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                           const formData = new FormData();
                          if (files.length === 0) return;
                          try {
                            for (const f of files) {
                             
        formData.append("file", files[0]); // from an <input type="file" />
        
        fetch(`http://localhost:2100/uploads`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Uploaded file URL:", data.url);
            setShowImage(data.url);
             setFormData((prev) => ({
                ...prev,
                images: [...prev.images, data.url],
              }));
          })
          .catch((err) => console.error("Upload failed:", err));
                            }
                            (e.target as HTMLInputElement).value = "";
                          } catch (err) {
                            console.error("Image upload failed", err);
                          }
                        }}
                      />
        
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("landlord-images-input")?.click()
                        }
                      >
                        Choose Files
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Properties with more photos get 40% more views
                  </p>
                </div>
                  ):(
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <>
                      <div className="w-100 h-100">
                        <img src={showImage} className="" />
                      </div>
                      </>
                    </div>
                  )
                }
                </>
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsAddPropertyOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            List Property
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <span>DormDash</span>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation menu
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <nav className="space-y-2">
                    {sidebarMenu.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === item.id
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                  
                  {/* Logout button at bottom */}
                  <div className="mt-6 pt-6 border-t">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="h-5 w-5" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl text-gray-900 font-semibold hidden sm:block">DormDash</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <span className="text-gray-700">Jane Agent</span>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
            {/* Mobile user icon */}
            <div className="sm:hidden flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-sm border-r transition-all duration-300 min-h-screen hidden md:block relative`}>
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
                </button>
              ))}
            </nav>
            
            {/* Logout button at bottom */}
            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="text-sm">Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 w-full">{renderContent()}</main>
      </div>
    </div>
  );

  function renderContent() {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'properties':
        return renderProperties();
      case 'add-property':
        return renderAddProperty();
      case 'clients':
        return renderClients();
      case 'messages':
        return renderMessages();
      case 'analytics':
        return renderAnalytics();
      case 'commission':
        return renderCommission();
      case 'boosting':
        return renderBoosting();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Agent Dashboard</h1>
          <p className="text-gray-600">Welcome back, {resolvedUser.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full bg-gradient-to-r ${stat.gradient} text-white flex-shrink-0`}>
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <CardTitle>Recent Client Activity</CardTitle>
                <Button 
                  onClick={() => setActiveSection('clients')}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  View All Clients
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.slice(0, 4).map((client) => (
                    <div key={client.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <Avatar className="mx-auto sm:mx-0">
                        <AvatarFallback className="bg-blue-100 text-blue-600">{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="text-gray-900">{client.name}</h4>
                        <p className="text-sm text-gray-600">{client.propertyInterest}</p>
                        <p className="text-sm text-gray-500">Budget: {client.budget}</p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2 sm:hidden">
                          <Badge variant={
                            client.status === 'active' ? 'default' :
                            client.status === 'viewing' ? 'secondary' : 'outline'
                          }>
                            {client.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{client.lastContact}</span>
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col items-end space-y-1">
                        <Badge variant={
                          client.status === 'active' ? 'default' :
                          client.status === 'viewing' ? 'secondary' : 'outline'
                        }>
                          {client.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{client.lastContact}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                        onClick={() => handleWhatsAppMessage(client.phone, client.propertyInterest, client.name)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Commission Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="text-lg text-green-700">₦186,000</h4>
                    <p className="text-sm text-gray-600">This Month's Commission</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-lg text-blue-700">₦45,000</h4>
                    <p className="text-sm text-gray-600">Pending Commission</p>
                  </div>
                  <div className="space-y-2">
                    {commissionHistory.slice(0, 2).map((commission) => (
                      <div key={commission.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{commission.property}</span>
                        <span className="text-gray-900">₦{commission.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveSection('commission')}
                  >
                    View All Commission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Properties Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Properties</CardTitle>
            <Button 
              onClick={() => setActiveSection('add-property')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentProperties.slice(0, 3).map((property) => (
                <div key={property.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <ImageWithFallback
                    src={property.pictures[0]}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-gray-900 mb-1">{property.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">₦{property.price.toLocaleString()}/year</span>
                    <Badge variant={property.isBoostingActive ? "default" : "secondary"}>
                      {property.isBoostingActive ? "Boosted" : "Active"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={() => setActiveSection('properties')}>
                View All Properties
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderProperties() {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">My Properties</h1>
            <p className="text-gray-600">Manage properties for your clients</p>
          </div>
          <Button 
            onClick={() => setActiveSection('add-property')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {property.isBoostingActive && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Boosted
                  </Badge>
                )}
                <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                  Available
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg text-gray-900 mb-2">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                <p className="text-sm text-blue-600 mb-2">Landlord: {property.landlord.name}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg text-gray-900">
                    ₦{property.price.toLocaleString()}/year
                  </span>
                  <span className="text-sm text-green-600">7% Commission</span>
                </div>
                
                <p className="text-xs text-gray-500 mb-3">15 inquiries this week</p>
                
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => { setEditingProduct(property); setActiveSection('add-property'); }}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={async () => {
                        try {
                          const newStatus = property?.availability === 'Rented' ? 'Available' : 'Rented';
                          const res = await fetch(`http://localhost:2100/product/${property.id}/availability`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ availability: newStatus }),
                          });
                          const data = await res.json().catch(() => ({}));
                          if (!res.ok) throw new Error(data.error || 'Update failed');

                          // Update local state
                          setAgentProperties((prev) => prev.map((p) => (p.id === property.id ? { ...p, availability: newStatus } : p)));

                          const msg = newStatus === 'Rented' ? 'Property marked as Rented' : 'Property marked as Available';
                          toast.success(`✅ ${msg}`);
                        } catch (err) {
                          console.error('Failed to update availability', err);
                          toast.error('❌ Failed to update property status');
                        }
                      }}
                    >
                      {property?.availability === 'Rented' ? 'Mark as Available' : 'Mark as Rented'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  function renderClients() {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">Client Management</h1>
            <p className="text-gray-600">Manage your client relationships</p>
          </div>
          <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Add a new client to your portfolio and start managing their property needs.
                </DialogDescription>
              </DialogHeader>
              <AddClientForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card key={client.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm"><span className="text-gray-500">Phone:</span> {client.phone}</p>
                  <p className="text-sm"><span className="text-gray-500">Interest:</span> {client.propertyInterest}</p>
                  <p className="text-sm"><span className="text-gray-500">Budget:</span> {client.budget}</p>
                  <p className="text-sm"><span className="text-gray-500">Last Contact:</span> {client.lastContact}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant={
                    client.status === 'active' ? 'default' :
                    client.status === 'viewing' ? 'secondary' : 'outline'
                  }>
                    {client.status}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleWhatsAppMessage(client.phone, client.propertyInterest, client.name)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  function renderMessages() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Student Messages</h1>
          <p className="text-gray-600">Manage inquiries from interested students</p>
        </div>

        <div className="space-y-4">
          {studentMessages.map((message) => (
            <Card key={message.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg text-gray-900">{message.studentName}</h3>
                      <span className="text-sm text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-blue-600 mb-2">{message.propertyTitle}</p>
                    <p className="text-gray-700 mb-4">{message.message}</p>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleWhatsAppMessage(message.phone, message.propertyTitle, message.studentName)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Reply via WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  function renderAnalytics() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your property and client performance</p>
        </div>
        
        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl text-gray-900">
                  {agentProperties.reduce((sum, prop) => sum + prop.analytics.totalViews, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Property Views This Week</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl text-gray-900">28</p>
                <p className="text-sm text-gray-600">Client Inquiries</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl text-gray-900">₦186,000</p>
                <p className="text-sm text-gray-600">Monthly Commission</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl text-gray-900">23%</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    );
  }

  function renderCommission() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Commission Tracking</h1>
          <p className="text-gray-600">Track your earnings and commission history</p>
        </div>

        {/* Commission Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl text-green-600 mb-2">₦186,000</h3>
              <p className="text-gray-600">This Month's Commission</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl text-blue-600 mb-2">₦45,000</h3>
              <p className="text-gray-600">Pending Commission</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl text-purple-600 mb-2">7.2%</h3>
              <p className="text-gray-600">Average Commission Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Commission History */}
        <Card>
          <CardHeader>
            <CardTitle>Commission History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionHistory.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell>{commission.property}</TableCell>
                    <TableCell>{commission.client}</TableCell>
                    <TableCell>{commission.rate}</TableCell>
                    <TableCell className="text-green-600">
                      ₦{commission.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{commission.date}</TableCell>
                    <TableCell>
                      <Badge variant={commission.status === 'paid' ? 'default' : 'secondary'}>
                        {commission.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderBoosting() {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-2">Boost Property Visibility 🚀</h1>
          <p className="text-gray-600">Help your clients get more views and inquiries</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Basic Plan</h3>
              <div className="text-3xl text-blue-600 mb-2">₦1,500</div>
              <p className="text-sm text-gray-600 mb-4">/week</p>
              <p className="text-gray-700 mb-6">Appear in Top 10 Listings</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Boost Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white px-4 py-1">RECOMMENDED</Badge>
            </div>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Crown className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Pro Plan</h3>
              <div className="text-3xl text-blue-600 mb-2">₦3,000</div>
              <p className="text-sm text-gray-600 mb-4">/week</p>
              <p className="text-gray-700 mb-6">Top 5 Listings + Highlight Badge</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Boost Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Premium Plan</h3>
              <div className="text-3xl text-yellow-600 mb-2">₦5,000</div>
              <p className="text-sm text-gray-600 mb-4">/week</p>
              <p className="text-gray-700 mb-6">Top 3 Listings + Featured Banner + Badge</p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                Boost Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Currently Boosted Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Currently Boosted Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property Name</TableHead>
                  <TableHead>Boost Plan</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boostedProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>{property.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{property.plan}</Badge>
                    </TableCell>
                    <TableCell>{property.expiry}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {property.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Renew Boost
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderAddProperty() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Add New Property</h1>
          <p className="text-gray-600">List a property for your client</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <AddPropertyForm initialData={editingProduct || undefined} />
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your agent account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue="Jane Agent" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="jane@agent.com" />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp Contact Number</Label>
                <Input id="whatsapp" defaultValue="+234 803 456 7890" />
              </div>
              <div>
                <Label htmlFor="licenseNumber">Agent License Number</Label>
                <Input id="licenseNumber" defaultValue="AG-2024-001234" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Update Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commission Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="defaultCommission">Default Commission Rate (%)</Label>
                <Select defaultValue="7">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5% Commission</SelectItem>
                    <SelectItem value="6">6% Commission</SelectItem>
                    <SelectItem value="7">7% Commission</SelectItem>
                    <SelectItem value="8">8% Commission</SelectItem>
                    <SelectItem value="10">10% Commission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                <Select defaultValue="bank">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bankAccount">Bank Account Number</Label>
                <Input id="bankAccount" defaultValue="0123456789" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Update Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}