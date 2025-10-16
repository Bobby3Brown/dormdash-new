import React, { useState, useEffect } from "react";
import {
  Plus,
  Home,
  BarChart3,
  Settings,
  Upload,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Star,
  MousePointer,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  LogOut,
  User,
  Calendar,
  Building2,
  CheckCircle2,
  Crown,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getAllProducts } from "../api/api";
import { User as UserType } from "../types";
import { useUser } from "../context/UserContext";
// import { analysis } from './AuthPage';
import { userInfo } from "os";
import { analytics } from "./AuthPage";
import { toast, Toaster } from "sonner";
import { Password } from "./AuthPage";

interface LandlordDashboardProps {
  user?: UserType;
}
const API_URL = `https://dormdashbackend.onrender.com/`

export function LandlordDashboard({ user }: LandlordDashboardProps) {
  const ctx = useUser();
  const resolvedUser: UserType =
    user ??
    ({
      id: "ctx-user",
      name: ctx.fullname || "Landlord",
      email: ctx.email || "",
      password: Password,
      phone: ctx.number || "",
      role: (ctx.mode as any) || "landlord",
      verified: false,
    } as UserType);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [statsData, setStatsData] = useState<analytics>();
  const [oldpassword, setOldPassword] = useState<string>('');
    const [newpassword, setNewPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  // const [landlordProperties, setLandlordProperties] = useState<any[]>([]);
  const [landlordProperties, setLandlordProperties] = useState<any[]>([]);
  const [landlordStats, setLandlordStats] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;

    // Fetch landlord properties
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/product/owner/${resolvedUser?.email}`
        );
        if (!res.ok) throw new Error("Error fetching properties");
        const data = await res.json();
        if (mounted) setLandlordProperties(data || []);
      } catch (err) {
        console.error("Failed to load landlord properties:", err);
      }
    };

    // Fetch landlord dashboard stats
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/profile/getAnalysis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: resolvedUser.email }),
        });
        const data = await res.json().catch(() => null);
        console.log(data);
        setStatsData(data);
        // if (mounted && res.ok && data) {
        //   setLandlordStats(data);
        // } else {
        //   console.warn("Failed to fetch landlord dashboard data", data);
        // }
      } catch (err) {
        console.error("Error fetching landlord dashboard data:", err);
      }
    };

    // Run both requests
    if (resolvedUser?.email) {
      fetchProperties();
      fetchStats();
    }

    return () => {
      mounted = false;
    };
  }, [resolvedUser?.email]);

  // TODO: fetch student messages from API. Replaced mock data with empty array.
  const studentMessages: any[] = [];

  // TODO: fetch boosting info from API. Replaced with empty list.
  const boostedProperties: any[] = [];

  const stats = [
    {
      label: "Active Listings",
      value: statsData?.active,
      icon: Home,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Rented Properties",
      value: statsData?.rented,
      icon: CheckCircle2,
      gradient: "from-green-500 to-green-600",
    },
    {
      label: "Total Student Messages",
      value: statsData?.student,
      icon: MessageSquare,
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const sidebarMenu = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "properties", label: "My Properties", icon: Building2 },
    { id: "add-property", label: "Add New Property", icon: Plus },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "boosting", label: "Boosting Plan", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleWhatsAppMessage = (
    phone: string,
    propertyTitle: string,
    studentName: string
  ) => {
    const message = `Hello ${studentName}, thank you for your interest in "${propertyTitle}". I'd be happy to help you with any questions about the property.`;
    const whatsappUrl = `https://wa.me/${phone.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const AddPropertyForm = () => {
    const [showImage, setShowImage] = useState<string>('')
    const [formData, setFormData] = useState({
      title: "",
      type: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      amenities: [],
      images: [],
      contactPhone: "",
      availableDate: "",
    });

    const availableAmenities = [
      "wifi",
      "electricity",
      "water",
      "parking",
      "generator",
      "security",
      "furnished",
      "kitchen",
      "laundry",
      "cleaning",
      "gym",
      "pool",
    ];

    const handleAmenityToggle = (amenity) => {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      }));
    };

    const handleSubmit = async () => {
      const payload = {
        title: formData.title,
        type: formData.type,
        rent: Number(formData.price),
        owneremail: resolvedUser.email,
        location: formData.location,
        bedrooms: Number(formData.bedrooms) || 0,
        availability: formData.availableDate || "available",
        amnities: JSON.stringify(formData.amenities || []),
        boost: 0,
        description: formData.description,
        contactinfo: formData.contactPhone,
        pictures: JSON.stringify(formData.images || []),
      };
      console.log(payload)

      try {
        const res = await fetch(`${API_URL}/product/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Failed to create product");
        }

        // if (!res.ok) throw new Error(data.error || "Update failed");
        const next = await fetch(
          `${API_URL}/profile/updateListing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: resolvedUser.email,
              rented: 0,
              active: 1,
            }),
          }
        );
        const test = await next.json().catch(() => ({}));
        if (!next.ok) throw new Error(test.error || "Update failed");
        toast("Success");

        const data = await res.json();
        toast.success("✅ Property listed successfully!");
        console.log("Created:", data);
        setIsAddPropertyOpen(false);
      } catch (err) {
        console.error("❌ Error:", err);
        toast.error("Failed to list property. Please try again.");
      }
    };
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      const fileURLs = files.map((file) => URL.createObjectURL(file));

      // Store preview URLs and raw File objects
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileURLs],
      }));
    };
    const handleUploadImage = () =>{
      const file  = new FormData
      const res = fetch(`${API_URL}/upload`,{
        method: 'POST',
        body: file
      })
    }

    return (
      <div className="space-y-6 max-h-[80vh] sm:max-h-96 overflow-y-auto">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3>Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="title">Property Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Modern 2-Bedroom Apartment Near UNILAG"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="type">Property Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
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

          <div className="sm:col-span-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="e.g., Akoka, Lagos State (Near University of Lagos)"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h3>Property Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Annual Rent (₦) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="120000"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select
                value={formData.bedrooms}
                onValueChange={(value) =>
                  setFormData({ ...formData, bedrooms: value })
                }
              >
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
              <Select
                value={formData.bathrooms}
                onValueChange={(value) =>
                  setFormData({ ...formData, bathrooms: value })
                }
              >
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

          <div>
            <Label htmlFor="availableDate">Available From</Label>
            <Input
              id="availableDate"
              type="date"
              value={formData.availableDate}
              onChange={(e) =>
                setFormData({ ...formData, availableDate: e.target.value })
              }
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h3>Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableAmenities.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center space-x-2 cursor-pointer"
              >
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
            placeholder="Describe your property, nearby facilities, transportation, and any special features..."
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3>Contact Information</h3>
          <div>
            <Label htmlFor="contactPhone">Contact Phone Number *</Label>
            <Input
              id="contactPhone"
              placeholder="+234 800 000 0000"
              value={formData.contactPhone}
              onChange={(e) =>
                setFormData({ ...formData, contactPhone: e.target.value })
              }
            />
          </div>
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

fetch(`${API_URL}/uploads`, {
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

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setIsAddPropertyOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            List Property
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={`${
            isSidebarCollapsed ? "w-16" : "w-64"
          } bg-white shadow-sm border-r transition-all duration-300 min-h-screen hidden md:block relative`}
        >
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {!isSidebarCollapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}
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
      case "dashboard":
        return renderDashboard();
      case "properties":
        return renderProperties();
      case "add-property":
        return renderAddProperty();
      case "messages":
        return renderMessages();
      case "analytics":
        return renderAnalytics();
      case "boosting":
        return renderBoosting();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  }

  function renderDashboard() {
    return (
      <div className="space-y-6 w-full">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {resolvedUser.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {(landlordStats && Array.isArray(landlordStats.cards)
            ? landlordStats.cards
            : stats
          ).map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    {/* <p className="text-xs text-gray-500">{stat.change}</p> */}
                  </div>
                  <div
                    className={`p-2 sm:p-3 rounded-full bg-gradient-to-r ${stat.gradient} text-white flex-shrink-0`}
                  >
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* My Properties Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <CardTitle>My Properties</CardTitle>
                <Button
                  onClick={() => setActiveSection("add-property")}
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Property
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(landlordProperties) &&
                  landlordProperties.length > 0 ? (
                    landlordProperties.slice(0, 3).map((property) => {
                      const img = property?.pictures?.[0] || "/placeholder.jpg";
                      const title = property?.title || "Untitled";
                      const location =
                        property?.location || "Location not specified";
                      const price =
                        typeof property?.price === "number"
                          ? property.price
                          : Number(property?.rent || 0);
                      return (
                        <div
                          key={property?.id || title}
                          className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <ImageWithFallback
                            src={img}
                            alt={title}
                            className="w-full sm:w-16 h-48 sm:h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 w-full">
                            <h4 className="text-gray-900">{title}</h4>
                            <p className="text-sm text-gray-600">{location}</p>
                            <p className="text-sm">
                              ₦{(price || 0).toLocaleString()}/year
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-2 sm:hidden">
                              <Badge
                                variant={
                                  property?.isBoostingActive
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {property?.isBoostingActive
                                  ? "Boosted"
                                  : "Available"}
                              </Badge>
                              {/* <span className="text-xs text-gray-500">
                                Contacted by 12 students
                              </span> */}
                            </div>
                          </div>
                          <div className="hidden sm:flex flex-col items-center space-y-1">
                            <Badge
                              variant={
                                property?.isBoostingActive
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {property?.isBoostingActive
                                ? "Boosted"
                                : "Available"}
                            </Badge>
                            {/* <span className="text-xs text-gray-500">
                              Contacted by 12 students
                            </span> */}
                          </div>
                          <div className="flex space-x-1 w-full sm:w-auto">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 sm:flex-none"
                            >
                              <Edit className="h-3 w-3 sm:mr-0 mr-2" />
                              <span className="sm:hidden">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 sm:flex-none"
                              onClick={async ()=>{
                                const res =  await fetch(`${API_URL}/product/delete/${property.id}`,{
                                  method: 'DELETE',
                                  headers:{'Content-Type':'application/json'},
                                  body: JSON.stringify({
                                    email: resolvedUser.email,
                                    password:Password,
                                  })
                                })
                                const data = await res.ok ? toast.success("Deleted data"):console.log("Error in delete");

                                const next = await fetch(`${API_URL}/profile/updateListing`,{
                                  method:'POST',
                                  headers: {'Content-Type':'application/json'},
                                  body: JSON.stringify({
                                    email: resolvedUser.email,
                                    rented: 0,
                                    active: -1,
                                  })
                                })
                                const test = await next.ok ? toast.success("Deleted data"):console.log("Error in delete");
                              }}
                            >
                              <Trash2 className="h-3 w-3 sm:mr-0 mr-2" />
                              <span className="sm:hidden">Delete</span>
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-gray-500">
                      No properties available
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setActiveSection("properties")}
                  >
                    View All Properties
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentMessages.slice(0, 3).map((message) => (
                    <div key={message.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-900">
                          {message.studentName}
                        </p>
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {message.propertyTitle}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        {message.message}
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleWhatsAppMessage(
                            message.phone,
                            message.propertyTitle,
                            message.studentName
                          )
                        }
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Reply via WhatsApp
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setActiveSection("messages")}
                  >
                    View All Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  function renderProperties() {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">My Properties</h1>
            <p className="text-gray-600">Manage all your property listings</p>
          </div>
          <Button
            onClick={() => setActiveSection("add-property")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.isArray(landlordProperties) &&
          landlordProperties.length > 0 ? (
            landlordProperties.map((property) => {
              const img = property?.pictures?.[0] || "/placeholder.jpg";
              const title = property?.title || "Untitled";
              const location = property?.location || "Location not specified";
              const price =
                typeof property?.price === "number"
                  ? property.price
                  : Number(property?.rent || 0);
              return (
                <Card
                  key={property?.id || title}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={img}
                      alt={title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {property?.isBoostingActive && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-white text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Boosted
                      </Badge>
                    )}
                    <Badge
                      className={`absolute top-2 left-2 ${
                        property?.availability === "Rented"
                          ? "bg-red-500"
                          : "bg-green-500"
                      } text-white text-xs`}
                    >
                      {property?.availability === "Rented"
                        ? "Rented"
                        : "Available"}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-base sm:text-lg text-gray-900 mb-2 line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                      {location}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base sm:text-lg text-gray-900">
                        ₦{(price || 0).toLocaleString()}/year
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {property?.safetyRating ?? "N/A"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">
                      Contacted by 12 students
                    </p>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={async () => {
                          try {
                            const newStatus =
                              property?.availability === "Rented"
                                ? "Available"
                                : "Rented";
                            const newRented =
                              property?.availability === "Rented" ? -1 : 1;
                            const newActive =
                              property?.availability === "Rented" ? 1 : -1;
                            const res = await fetch(
                              `${API_URL}/product/${property.id}/availability`,
                              {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  availability: newStatus,
                                }),
                              }
                            );
                            const data = await res.json().catch(() => ({}));
                            if (!res.ok)
                              throw new Error(data.error || "Update failed");
                            const next = await fetch(
                              `${API_URL}/profile/updateListing`,
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  Accept: "application/json",
                                },
                                body: JSON.stringify({
                                  email: resolvedUser.email,
                                  rented: newRented,
                                  active: newActive,
                                }),
                              }
                            );
                            const test = await next.json().catch(() => ({}));
                            if (!next.ok)
                              throw new Error(test.error || "Update failed");
                            // toast("Success");

                            setLandlordProperties((prev) =>
                              prev.map((p) =>
                                p?.id === property.id
                                  ? { ...p, availability: newStatus }
                                  : p
                              )
                            );
                          toast.success(
                              newStatus === "Rented"
                                ? "✅ Property marked as Rented"
                                : "✅ Property marked as Available"
                            );
                          } catch (err) {
                            console.error("Failed to update availability", err);
                            toast.success("❌ Failed to update property status");
                          }
                        }}
                      >
                        {property?.availability === "Rented"
                          ? "Mark as Available"
                          : "Mark as Rented"}
                      </Button>
                      <Button size="sm" variant="outline" className="sm:w-auto">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No properties available
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderMessages() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Student Messages</h1>
          <p className="text-gray-600">
            Manage inquiries from interested students
          </p>
        </div>

        <div className="space-y-4">
          {studentMessages.map((message) => (
            <Card key={message.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg text-gray-900">
                        {message.studentName}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 mb-2">
                      {message.propertyTitle}
                    </p>
                    <p className="text-gray-700 mb-4">{message.message}</p>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        handleWhatsAppMessage(
                          message.phone,
                          message.propertyTitle,
                          message.studentName
                        )
                      }
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
          <p className="text-gray-600">Track your property performance</p>
        </div>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xl sm:text-2xl text-gray-900">
                  {landlordProperties
                    .reduce((sum, prop) => sum + (prop.views || 0), 0)
                    .toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Property Views This Week
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
                <p className="text-xl sm:text-2xl text-gray-900">47</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  WhatsApp Contacts
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-lg sm:text-2xl text-gray-900">
                  Modern Apartment
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Top Performing Property
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-xl sm:text-2xl text-gray-900">23%</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Inquiry Conversion Rate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function renderBoosting() {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-2">
            Boost Your Property Visibility 🚀
          </h1>
          <p className="text-gray-600">
            Get more views and inquiries with our boosting plans
          </p>
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
              <Badge className="bg-blue-500 text-white px-4 py-1">
                RECOMMENDED
              </Badge>
            </div>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Crown className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Pro Plan</h3>
              <div className="text-3xl text-blue-600 mb-2">₦3,000</div>
              <p className="text-sm text-gray-600 mb-4">/week</p>
              <p className="text-gray-700 mb-6">
                Top 5 Listings + Highlight Badge
              </p>
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
              <p className="text-gray-700 mb-6">
                Top 3 Listings + Featured Banner + Badge
              </p>
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
            {/* Desktop Table */}
            <div className="hidden md:block">
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
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {boostedProperties.map((property) => (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-gray-900">
                      {property.name}
                    </h4>
                    <Badge className="bg-green-100 text-green-800">
                      {property.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Plan:</span>
                      <Badge variant="outline">{property.plan}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expires:</span>
                      <span className="text-sm font-medium">
                        {property.expiry}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Renew Boost
                  </Button>
                </div>
              ))}
            </div>
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
          <p className="text-gray-600">List your property on DormDash</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <AddPropertyForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderSettings() {
    let showPassword = "text";
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue="Mr. Landlord" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="landlord@example.com"
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp Contact Number</Label>
                <Input id="whatsapp" defaultValue="+234 801 234 5678" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Update Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security & Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type={showPassword} onChange={(e)=>{setOldPassword(e.target.value)}}/>
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type={showPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type={showPassword} onChange={(e)=> {setPassword(e.target.value)}}/>
              </div>
              <button onClick={()=>{
                showPassword = showPassword === "password" ? "text": "password"
              }}>{showPassword === "password" ? "show all": "hide all"}</button>
             <Button className="bg-blue-600 hover:bg-blue-700"
              onClick={async()=>{
                if(!newpassword || !password || !oldpassword) toast.error("Fill-in Complete data");
                if(newpassword !== password) toast.error("password and Confirm Password are not same")
                try{
                  const res = await fetch(`${API_URL}/auth/update`,{
                    method: 'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify({
                      email: resolvedUser.email,
                      password: password,
                      newPassword: newpassword,
                    })
                  })
                const data =  res.ok ? toast.success("Password Updated Successfully") : toast.error("An Error occured while updating password")
                }catch(err){
                  toast.error(`Error While changing password ${err}`)
                }
              }}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
