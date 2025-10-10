import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Building, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { User as UserType } from '../types';
import { toast } from 'sonner@2.0.3';

interface AuthPageProps {
  onAuth: (userData: UserType) => void;
}

export function AuthPage({ onAuth }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('landlord');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      // Show success dialog for signup
      setShowSuccessDialog(true);
      toast.success('Account created successfully!');
    } else {
      // For login, authenticate immediately
      const userData: UserType = {
        id: Date.now().toString(),
        name: formData.name || 'John Doe',
        email: formData.email || 'john@example.com',
        phone: formData.phone || '+234800000000',
        role: userType as 'landlord' | 'agent' | 'admin',
        verified: true,
        registrationDate: new Date().toISOString().split('T')[0]
      };
      toast.success('Login successful! Welcome back.');
      onAuth(userData);
    }
  };

  const handleDialogContinue = () => {
    setShowSuccessDialog(false);
    // Mock authentication
    const userData: UserType = {
      id: Date.now().toString(),
      name: formData.name || 'John Doe',
      email: formData.email || 'john@example.com',
      phone: formData.phone || '+234800000000',
      role: userType as 'landlord' | 'agent' | 'admin',
      verified: true,
      registrationDate: new Date().toISOString().split('T')[0]
    };
    onAuth(userData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Building className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your Landlord/Agent account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <Label htmlFor="userType">I am a...</Label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landlord">Landlord</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!isLogin && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>

              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Student Info */}
        {!isLogin && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="text-sm text-green-800 mb-2">👨‍🎓 Are you a student?</h3>
              <p className="text-sm text-green-700">
                Students don't need to sign up! Browse and search for properties freely without an account.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Registration Fees Info */}
        {!isLogin && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="text-sm text-blue-800 mb-2">Registration Fee</h3>
              <p className="text-sm text-blue-700">
                {userType === 'landlord' && 'Landlord registration fee: ₦1,000 (one-time payment)'}
                {userType === 'agent' && 'Agent registration fee: ₦1,000 (one-time payment)'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          open={showForgotPassword}
          onOpenChange={setShowForgotPassword}
        />

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl">Welcome to DormDash!</DialogTitle>
              <DialogDescription className="text-center pt-2">
                Your {userType} account has been successfully created.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <p className="text-sm text-blue-900">
                  <strong>Next Steps:</strong>
                </p>
                <ul className="text-sm text-blue-800 space-y-1 text-left list-disc list-inside">
                  {userType === 'landlord' && (
                    <>
                      <li>Complete your profile information</li>
                      <li>List your first property</li>
                      <li>Verify your properties for better visibility</li>
                      <li>Consider boosting your listings to reach more students</li>
                    </>
                  )}
                  {userType === 'agent' && (
                    <>
                      <li>Complete your agent profile</li>
                      <li>Add properties on behalf of landlords</li>
                      <li>Track your commissions (5-10% of rental income)</li>
                      <li>Manage your client relationships</li>
                    </>
                  )}
                </ul>
              </div>
              <p className="text-sm text-gray-600 text-center">
                A verification email has been sent to <strong>{formData.email}</strong>
              </p>
            </div>
            
            <div className="flex flex-col space-y-2 mt-4">
              <Button 
                onClick={handleDialogContinue}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continue to Dashboard
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
