import React, { useState } from 'react';
import { Users, Home, DollarSign, Shield, CheckCircle, AlertTriangle, Eye, Edit, Trash2, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getAllProducts } from '../api/api';

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [properties, setProperties] = useState<any[]>([]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await getAllProducts();
        if (!mounted) return;
        setProperties(all || []);
      } catch (err) {
        console.error('Failed to load properties for admin', err);
      }
    })();
    return () => { mounted = false; };
  }, []);
  
  const stats = [
    { label: 'Total Properties', value: '2,847', icon: Home, change: '+12% this month' },
    { label: 'Registered Users', value: '15,234', icon: Users, change: '+8% this month' },
    { label: 'Monthly Revenue', value: '₦4,280,000', icon: DollarSign, change: '+15% this month' },
    { label: 'Pending Verifications', value: '47', icon: Shield, change: '12 urgent' }
  ];

  const pendingVerifications = [
    {
      id: 1,
      type: 'landlord',
      name: 'Dr. Emmanuel Eze',
      email: 'emmanuel@email.com',
      submittedDate: '2024-09-20',
      status: 'pending',
      documents: ['ID Card', 'Property Deed']
    },
    {
      id: 2,
      type: 'agent',
      name: 'Grace Adeolu',
      email: 'grace@email.com',
      submittedDate: '2024-09-19',
      status: 'reviewing',
      documents: ['ID Card', 'Agent License', 'References']
    },
    {
      id: 3,
      type: 'property',
      name: 'Modern Apartment Complex',
      owner: 'Mrs. Funmi Adeleke',
      submittedDate: '2024-09-18',
      status: 'pending',
      documents: ['Building Permit', 'Safety Certificate']
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'Registration Fee', user: 'John Doe (Landlord)', amount: 1000, date: '2024-09-20', status: 'completed' },
    { id: 2, type: 'Premium Boost', user: 'Sarah Okafor (Agent)', amount: 7500, date: '2024-09-20', status: 'completed' },
    { id: 3, type: 'Agent Commission', user: 'David Okoro', amount: 15000, date: '2024-09-19', status: 'pending' },
    { id: 4, type: 'Elite Boost', user: 'Dr. Emmanuel Eze', amount: 15000, date: '2024-09-19', status: 'completed' }
  ];

  const platformUsers = [
    { id: 1, name: 'Adebayo Johnson', email: 'adebayo@email.com', role: 'student', status: 'active', joinDate: '2024-08-15' },
    { id: 2, name: 'Mrs. Funmi Adeleke', email: 'funmi@email.com', role: 'landlord', status: 'verified', joinDate: '2024-07-20' },
    { id: 3, name: 'Sarah Okafor', email: 'sarah@email.com', role: 'agent', status: 'verified', joinDate: '2024-06-10' },
    { id: 4, name: 'Fatima Mohammed', email: 'fatima@email.com', role: 'student', status: 'active', joinDate: '2024-09-01' }
  ];

  const boostingConfig = [
    { type: 'Basic Boost', duration: '1 week', minPrice: 2000, maxPrice: 5000, features: ['Priority listing', 'Basic highlighting'] },
    { type: 'Premium Boost', duration: '2 weeks', minPrice: 5000, maxPrice: 10000, features: ['Top placement', 'Enhanced visibility', 'Social media promotion'] },
    { type: 'Elite Boost', duration: '1 month', minPrice: 10000, maxPrice: 20000, features: ['Featured placement', 'Maximum visibility', 'Dedicated support'] }
  ];

  // TODO: fetch success stories from API when available. Placeholder empty list for now.
  const successStories: any[] = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage the DormDash platform</p>
        </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 h-auto gap-1">
          <TabsTrigger value="overview" className="text-xs sm:text-sm px-2">Overview</TabsTrigger>
          <TabsTrigger value="verifications" className="text-xs sm:text-sm px-2">Verify</TabsTrigger>
          <TabsTrigger value="properties" className="text-xs sm:text-sm px-2">Properties</TabsTrigger>
          <TabsTrigger value="users" className="text-xs sm:text-sm px-2">Users</TabsTrigger>
          <TabsTrigger value="payments" className="text-xs sm:text-sm px-2">Payments</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm px-2">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-xl sm:text-2xl text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <Shield className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600 capitalize">{item.type} verification</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900">{transaction.type}</p>
                        <p className="text-xs text-gray-600">{transaction.user}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600">₦{transaction.amount.toLocaleString()}</p>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verifications" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl text-gray-900">Pending Verifications</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="landlord">Landlord</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name/Property</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingVerifications.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm text-gray-900">{item.name}</p>
                            {item.email && <p className="text-xs text-gray-600">{item.email}</p>}
                            {item.owner && <p className="text-xs text-gray-600">Owner: {item.owner}</p>}
                          </div>
                        </TableCell>
                        <TableCell>{item.submittedDate}</TableCell>
                        <TableCell>
                          <div className="space-x-1">
                            {item.documents.map((doc, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'reviewing' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <AlertTriangle className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4 p-4">
                {pendingVerifications.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="capitalize mb-2">
                          {item.type}
                        </Badge>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        {item.email && <p className="text-xs text-gray-600">{item.email}</p>}
                        {item.owner && <p className="text-xs text-gray-600">Owner: {item.owner}</p>}
                      </div>
                      <Badge variant={item.status === 'reviewing' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Submitted:</span>
                        <span className="text-sm">{item.submittedDate}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Documents:</span>
                        <div className="space-x-1">
                          {item.documents.map((doc, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <AlertTriangle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl text-gray-900">Property Management</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Search properties..." className="sm:w-64" />
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {properties.map((property) => (
              <Card key={property.id} className="group">
                <CardContent className="p-4">
                  <h3 className="text-base sm:text-lg text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    Landlord: {property.landlord.name}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base sm:text-lg text-gray-900">
                      ₦{property.price.toLocaleString()}/year
                    </span>
                    <div className="flex items-center space-x-2">
                      {property.landlord.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                      )}
                      {property.isBoostingActive && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">Boosted</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl text-gray-900">Platform Users</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Search users..." className="sm:w-64" />
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {platformUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'verified' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4 p-4">
                {platformUsers.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-xs text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <Badge variant={user.status === 'verified' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Role:</span>
                      <Badge variant="outline" className="capitalize">
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Joined:</span>
                      <span>{user.joinDate}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl text-gray-900">Payment History</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell className="text-green-600">₦{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4 p-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{transaction.type}</h4>
                        <p className="text-sm text-gray-600">{transaction.user}</p>
                      </div>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-lg text-green-600 font-medium">₦{transaction.amount.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">{transaction.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-xl text-gray-900">Platform Settings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Boosting Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {boostingConfig.map((config, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{config.type}</h4>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Duration: {config.duration}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Price: ₦{config.minPrice.toLocaleString()} - ₦{config.maxPrice.toLocaleString()}
                    </p>
                    <div className="space-y-1">
                      {config.features.map((feature, i) => (
                        <p key={i} className="text-xs text-gray-500">• {feature}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="registration-fee">Registration Fee (₦)</Label>
                  <Input id="registration-fee" defaultValue="1000" />
                </div>
                <div>
                  <Label htmlFor="commission-rate">Default Commission Rate (%)</Label>
                  <Input id="commission-rate" defaultValue="7" />
                </div>
                <div>
                  <Label htmlFor="safety-threshold">Safety Rating Threshold</Label>
                  <Input id="safety-threshold" defaultValue="3.5" />
                </div>
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}