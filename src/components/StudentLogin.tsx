import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowLeft, BookOpen } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Clear any existing session on mount and load remembered email
  useEffect(() => {
    const clearSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.auth.signOut();
        localStorage.removeItem('studentEmail');
        localStorage.removeItem('universityEmail');
      }
      // Load remembered email
      const rememberedEmail = localStorage.getItem('studentEmail');
      if (rememberedEmail) {
        setFormData((prev) => ({ ...prev, email: rememberedEmail, rememberMe: true }));
      }
    };
    clearSession();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Attempt login
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user found after login.');

      // Verify user is a student (has a profile in profiles table)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profileData) {
        await supabase.auth.signOut();
        throw new Error('This account is not registered as a student. Please use the university login if applicable.');
      }

      // Check if user is also in university_profiles (prevent cross-type login)
      const { data: universityProfile } = await supabase
        .from('university_profiles')
        .select('user_id')
        .eq('user_id', authData.user.id)
        .single();

      if (universityProfile) {
        await supabase.auth.signOut();
        throw new Error('This account is registered as a university user. Please use the university login page.');
      }

      // Handle "Remember Me"
      if (formData.rememberMe) {
        localStorage.setItem('studentEmail', formData.email);
      } else {
        localStorage.removeItem('studentEmail');
      }

      console.log('Student login successful:', {
        email: formData.email,
        userId: authData.user.id,
      });

      navigate('/dashboard/student');
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
      console.error('Student login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/select-user-type"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to user selection
            </Link>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Student Portal</h2>
                <p className="text-sm text-gray-600">Access your learning dashboard</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Student email address"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in to Student Portal'}
              </button>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have a student account?{' '}
                <Link
                  to="/signup/student"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>

          {/* Features for Students */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Student Benefits:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Access to industry projects and internships</li>
              <li>• Skill development tracking and certifications</li>
              <li>• Direct connection with potential employers</li>
              <li>• Personalized learning recommendations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side - Brand & Info */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative h-full flex flex-col justify-center px-12">
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">SkillBridge</span>
              </div>

              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Launch Your Career with Real-World Experience
              </h2>

              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Join thousands of students who have transformed their careers through hands-on industry projects and professional mentorship.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-blue-100">Work on real industry challenges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-blue-100">Build a portfolio that stands out</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-blue-100">Connect directly with employers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;