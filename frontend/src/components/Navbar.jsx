import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, LayoutDashboard, History, LogOut, LogIn } from 'lucide-react';

const Navbar = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">FairLens</span>
            </Link>
            
            {user && (
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link to="/upload" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" /> Audit
                </Link>
                <Link to="/history" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium flex items-center gap-1">
                  <History className="h-4 w-4" /> History
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img src={user.photoURL} alt={user.displayName} className="h-8 w-8 rounded-full" />
                  <span className="hidden md:block text-sm text-gray-700">{user.displayName}</span>
                </div>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary flex items-center gap-2">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
