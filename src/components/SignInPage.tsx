import React, { useState } from 'react';
import { Mail, Lock, Building, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { toast } from 'sonner';
import * as api from '../api/api';

interface SignInPageProps {
  onAuth: (userData: any) => void;
  onNavigateToSignUp: () => void;
  onNavigateHome: () => void;
}

export function SignInPage({ onAuth, onNavigateToSignUp, onNavigateHome }: SignInPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.login(formData.email, formData.password);
      const userData = {
        id: 1,
        name: 'John Doe',
        email: formData.email,
        phone: '+234 800 000 0000',
        role: 'landlord', // This would come from the backend
        verified: true,
        registrationDate: new Date().toISOString().split('T')[0]
      };
      setIsLoading(false);
      toast.success('Login successful! Welcome back.');
      onAuth(userData);
    } catch (err: any) {
      setIsLoading(false);
      console.error('Login failed', err);
      toast.error(err?.message || 'Login failed');
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <button 
            onClick={onNavigateHome}
            className="flex items-center justify-center mx-auto mb-6 space-x-2 hover:opacity-80 transition-opacity"
          >
            <Building className="h-12 w-12 text-blue-600" />
            <span className="text-2xl text-gray-900">StudentPad Nigeria</span>
          </button>
          <h2 className="mt-6 text-3xl text-gray-900">
            Welcome back!
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Sign In Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-xl">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.rememberMe}
                    onCheckedChange={(checked: boolean) => handleInputChange('rememberMe', checked)}
                  />
                  <label className="text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToSignUp}
              className="text-blue-600 hover:text-blue-500"
            >
              Sign up for free
            </button>
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>🔒 Secure Login</span>
            <span>•</span>
            <span>🇳🇬 Made for Nigeria</span>
            <span>•</span>
            <span>✅ Verified Properties</span>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          open={showForgotPassword}
          onOpenChange={setShowForgotPassword}
        />
      </div>
    </div>
  );
}