import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Mail, Lock, Eye, EyeOff, ArrowLeft, BookOpen, Shield } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const UniversityLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    institutionEmail: '',
    password: '',
    department: '',
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
      const rememberedEmail = localStorage.getItem('universityEmail');
      if (rememberedEmail) {
        setFormData((prev) => ({ ...prev, institutionEmail: rememberedEmail, rememberMe: true }));
      }
    };
    clearSession();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
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
        email: formData.institutionEmail,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user found after login.');

      // Verify user is a university user (has a profile in university_profiles)
      const { data: profileData, error: profileError } = await supabase
        .from('university_profiles')
        .select('department, university')
        .eq('user_id', authData.user.id)
        .single();

      if (profileError || !profileData) {
        await supabase.auth.signOut();
        throw new Error('This account is not registered as a university user. Please use the student login if applicable.');
      }

      if (profileData.department !== formData.department) {
        await supabase.auth.signOut();
        throw new Error('Selected department does not match your profile.');
      }

      // Check if user is also in profiles (prevent cross-type login)
      const { data: studentProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', authData.user.id)
        .single();

      if (studentProfile) {
        await supabase.auth.signOut();
        throw new Error('This account is registered as a student. Please use the student login page.');
      }

      // Handle "Remember Me"
      if (formData.rememberMe) {
        localStorage.setItem('universityEmail', formData.institutionEmail);
      } else {
        localStorage.removeItem('universityEmail');
      }

      console.log('University login successful:', {
        email: formData.institutionEmail,
        department: formData.department,
        university: profileData.university,
        userId: authData.user.id,
      });

      navigate('/dashboard/university');
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
      console.error('University login error:', err);
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
            <Link to="/select-user-type" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to user selection
            </Link>
            
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Building className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">University Portal</h2>
                <p className="text-sm text-gray-600">Institutional access dashboard</p>
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

            {/* Institution Email Field */}
            <div>
              <label htmlFor="institutionEmail" className="sr-only">
                Institution Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="institutionEmail"
                  name="institutionEmail"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.institutionEmail}
                  onChange={handleInputChange}
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Institution email address"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Department Selection */}
            <div>
              <label htmlFor="department" className="sr-only">
                Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleInputChange}
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-8 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors bg-white"
                  disabled={loading}
                >
                  <option value="">Select Department</option>
                  <option value="administration">Administration</option>
                  <option value="academic-affairs">Academic Affairs</option>
                  <option value="career-services">Career Services</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </select>
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
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
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
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Access University Portal'}
              </button>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need institutional access?{' '}
                <Link
                  to="/signup/university"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Contact our partnership team
                </Link>
              </p>
            </div>
          </form>

          {/* Features for Universities */}
          <div className="mt-8 p-4 bg-teal-50 rounded-xl">
            <h3 className="text-sm font-medium text-teal-900 mb-2">University Features:</h3>
            <ul className="text-xs text-teal-700 space-y-1">
              <li>• Student progress tracking and analytics</li>
              <li>• Industry partnership management</li>
              <li>• Curriculum enhancement tools</li>
              <li>• Graduate placement monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side - Brand & Info */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800">
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
                Enhance Education Through Industry Partnership
              </h2>
              
              <p className="text-xl mb-8 text-teal-100 leading-relaxed">
                Connect your institution with leading industry partners to provide students with real-world experience and improve graduate employability.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-teal-100">Track student progress and outcomes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-teal-100">Access industry-relevant curriculum</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-teal-100">Strengthen industry partnerships</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityLogin;