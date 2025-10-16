import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { PropertySearch } from './components/PropertySearch';
import { PropertyDetail } from './components/PropertyDetail';
import { LandlordDashboard } from './components/LandlordDashboard';
import { AgentDashboard } from './components/AgentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthPage } from './components/AuthPage';
import { BoostingServices } from './components/BoostingServices';
import { ProfilePage } from './components/ProfilePage';
// import { mockUsers, defaultUser } from './data/mockUsers';
import { User, PageType, Property } from './types';
import { Toaster } from './components/ui/sonner';
import { UserProvider, useUser } from './context/UserContext';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Small component to sync the local `user` (typed User from /types)
  // into the more form-centric UserContext (fullname, email, number, ...).
  const SyncUserContext: React.FC<{ user: User | null }> = ({ user: ctxUser }) => {
    const { setFullname, setEmail, setNumber } = useUser();

    useEffect(() => {
      if (ctxUser) {
        setFullname(ctxUser.name || '');
        setEmail(ctxUser.email || '');
        setNumber(ctxUser.phone || '');
      } else {
        setFullname('');
        setEmail('');
        setNumber('');
      }
    }, [ctxUser, setFullname, setEmail, setNumber]);

    return null;
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setCurrentPage('property-detail');
  };

  const handleUserRoleChange = (role: string) => {
    // Update user with appropriate mock user data for the role
    const base = user || { id: 'local-guest', name: 'Guest', email: '', phone: '', role: 'student', verified: false } as User;
    const newUser: User = { ...base, role: role as any };
    setUser(newUser);
    
    // Automatically navigate to appropriate dashboard for landlords/agents/admin
    if (role === 'landlord') {
      setCurrentPage('landlord-dashboard');
    } else if (role === 'agent') {
      setCurrentPage('agent-dashboard');
    } else if (role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
    // Navigate to appropriate dashboard based on role
    if (userData.role === 'landlord') {
      setCurrentPage('landlord-dashboard');
    } else if (userData.role === 'agent') {
      setCurrentPage('agent-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPropertySelect={handlePropertySelect} onNavigate={setCurrentPage} />;
      case 'search':
        return <PropertySearch onPropertySelect={handlePropertySelect} />;
      case 'property-detail':
        return selectedProperty ? (
          <PropertyDetail property={selectedProperty} onBack={() => setCurrentPage('search')} />
        ) : (
          <HomePage onPropertySelect={handlePropertySelect} onNavigate={setCurrentPage} />
        );
      case 'landlord-dashboard':
        return user ? <LandlordDashboard user={user} /> : <AuthPage onAuth={handleAuth} />;
      case 'agent-dashboard':
        return user ? <AgentDashboard user={user} /> : <AuthPage onAuth={handleAuth} />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'auth':
        return <AuthPage onAuth={handleAuth} />;
      case 'boosting':
        return <BoostingServices />;
      case 'profile':
        return user ? (
          <ProfilePage user={user} onNavigate={setCurrentPage} onUpdateUser={handleUpdateUser} />
        ) : (
          <AuthPage onAuth={handleAuth} />
        );
      default:
        return <HomePage onPropertySelect={handlePropertySelect} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" richColors />
        {/* sync local user into context (no-op if user is null) */}
        <SyncUserContext user={user} />
        <Header
          currentPage={currentPage}
          user={user}
          onNavigate={setCurrentPage}
          onUserRoleChange={handleUserRoleChange}
          onLogout={handleLogout}
        />

        <main>
          {renderPage()}
        </main>

        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
