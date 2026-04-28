import { useAuth } from '../hooks/useAuth';
import { Shield, Lock } from 'lucide-react';

const Login = () => {
  const { loginWithGoogle, loading, error } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4">
              <Shield className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome to FairLens</h2>
            <p className="mt-2 text-gray-600">Sign in to start auditing your datasets for fairness.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-start gap-2">
              <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={loginWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="h-5 w-5" />
            {loading ? 'Connecting...' : 'Continue with Google'}
          </button>

          <p className="mt-8 text-center text-xs text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy. 
            We do not store your raw dataset on our servers permanently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
