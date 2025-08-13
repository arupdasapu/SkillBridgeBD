import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Briefcase, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  Search,
  Settings,
  LogOut,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  Bell,
  BookOpen,
  Moon,
  Sun,
  Star,
  MapPin,
  Clock,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

interface StudentProfile {
  id: string;
  username: string;
  email: string;
  department: string;
  university: string;
  cgpa: number | null;
}

const IndustryDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [positionFilter, setPositionFilter] = useState('All Positions');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const navigate = useNavigate();

  const positions = ['All Positions', 'Frontend Developer', 'Data Science', 'Product Manager'];
  const statuses = ['All Status', 'New', 'Reviewed', 'Interview', 'Hired'];

  useEffect(() => {
    fetchStudentProfiles();
  }, []);

  useEffect(() => {
    let filtered = studentProfiles;
    if (positionFilter !== 'All Positions') {
      // Placeholder: Filter by department as a proxy for position
      filtered = filtered.filter(profile => 
        profile.department.toLowerCase().includes(positionFilter.toLowerCase())
      );
    }
    if (statusFilter !== 'All Status') {
      // Placeholder: Status filter (no status in profiles, so no effect)
      filtered = filtered;
    }
    setFilteredProfiles(filtered);
  }, [studentProfiles, positionFilter, statusFilter]);

  const fetchStudentProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      // if (authError || !user) {
      //   setError('Please log in to view the dashboard.');
      //   navigate('/login/industry');
      //   return;
      // }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, email, department, university, cgpa');

      if (error) {
        throw new Error(error.message || 'Failed to fetch student profiles.');
      }

      setStudentProfiles(data || []);
      setFilteredProfiles(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch student profiles.');
      console.error('Error fetching student profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login/industry');
    } catch (err: any) {
      setError('Failed to log out. Please try again.');
      console.error('Logout error:', err);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 text-gray-900';

  if (loading) {
    return (
      <div className={`min-h-screen ${themeClasses} flex items-center justify-center`}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      {/* Error Alert */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
          {error}
          <button
            className="ml-4 text-white hover:text-gray-200"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Top Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SkillBridge</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('listings')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'listings' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}
                >
                  Listings
                </button>
                <button 
                  onClick={() => setActiveTab('applications')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'applications' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}
                >
                  Applications
                </button>
                <button className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">Messages</button>
                <button className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">Settings</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  className={`pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  onChange={(e) => {
                    const search = e.target.value.toLowerCase();
                    setFilteredProfiles(
                      studentProfiles.filter(
                        (profile) =>
                          profile.username.toLowerCase().includes(search) ||
                          profile.university.toLowerCase().includes(search) ||
                          profile.department.toLowerCase().includes(search)
                      )
                    );
                  }}
                />
              </div>
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={handleLogout}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back, TechCorp!</h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage your talent acquisition and partnerships
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Listings</p>
                    <p className="text-2xl font-bold text-orange-600">8</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Applications</p>
                    <p className="text-2xl font-bold text-blue-600">{studentProfiles.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Interviews</p>
                    <p className="text-2xl font-bold text-green-600">12</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hires</p>
                    <p className="text-2xl font-bold text-purple-600">5</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Applications */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Recent Candidates</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">View All</button>
                  </div>
                  <div className="space-y-4">
                    {filteredProfiles.slice(0, 3).map((profile) => (
                      <div key={profile.id} className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} transition-colors cursor-pointer`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">{profile.username.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              <div>
                                <h3 className="font-semibold">{profile.username}</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{profile.university}</p>
                              </div>
                            </div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{profile.department}</p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>CGPA: {profile.cgpa?.toFixed(2) || 'N/A'}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Match</p>
                              <p className="font-bold text-green-600">{Math.round(Math.random() * 20 + 80)}%</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                <MessageSquare className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analytics */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h2 className="text-xl font-bold mb-6">Industry Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Top Departments</h3>
                      <div className="space-y-3">
                        {[
                          { department: "Computer Science", percentage: 85 },
                          { department: "Data Science", percentage: 78 },
                          { department: "Engineering", percentage: 72 },
                          { department: "Business", percentage: 65 }
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.department}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                              <div 
                                className="bg-orange-600 h-2 rounded-full" 
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Candidate Trends</h3>
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between">
                            <span>Total Candidates</span>
                            <span className="font-bold text-green-600">{studentProfiles.length}</span>
                          </div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available students</p>
                        </div>
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between">
                            <span>Average CGPA</span>
                            <span className="font-bold text-blue-600">
                              {studentProfiles.length > 0 
                                ? (studentProfiles.reduce((sum, p) => sum + (p.cgpa || 0), 0) / studentProfiles.length).toFixed(2)
                                : 'N/A'}
                            </span>
                          </div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Across all candidates</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Profile */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">TechCorp Inc.</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Technology Company</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Industry Focus</p>
                      <div className="flex flex-wrap gap-2">
                        {['Software', 'AI/ML', 'Cloud'].map((focus) => (
                          <span key={focus} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-orange-600" />
                      <span>Post New Listing</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center space-x-2">
                      <Search className="w-4 h-4 text-orange-600" />
                      <span>Search Candidates</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-orange-600" />
                      <span>View Analytics</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-orange-600" />
                      <span>Message Students</span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { action: "New candidate viewed", time: "2 hours ago", type: "application" },
                      { action: "Interview scheduled", time: "4 hours ago", type: "interview" },
                      { action: "Listing published", time: "1 day ago", type: "listing" }
                    ].map((activity, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'listings' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Manage Listings</h1>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create New Listing</span>
              </button>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search listings..."
                      className={`pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                  <button className={`p-2 rounded-lg border ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors`}>
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Frontend Developer Intern",
                    type: "Internship",
                    location: "San Francisco, CA",
                    applications: 23,
                    status: "Active",
                    posted: "3 days ago"
                  },
                  {
                    title: "Data Science Research Project",
                    type: "Research",
                    location: "Remote",
                    applications: 15,
                    status: "Active",
                    posted: "1 week ago"
                  },
                  {
                    title: "Product Manager Intern",
                    type: "Internship",
                    location: "New York, NY",
                    applications: 31,
                    status: "Paused",
                    posted: "2 weeks ago"
                  }
                ].map((listing, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{listing.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            listing.type === 'Internship' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {listing.type}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            listing.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{listing.applications} applications</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Posted {listing.posted}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Candidate Management</h1>
            
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      className={`pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      onChange={(e) => {
                        const search = e.target.value.toLowerCase();
                        setFilteredProfiles(
                          studentProfiles.filter(
                            (profile) =>
                              profile.username.toLowerCase().includes(search) ||
                              profile.university.toLowerCase().includes(search) ||
                              profile.department.toLowerCase().includes(search)
                          )
                        );
                      }}
                    />
                  </div>
                  <select 
                    value={positionFilter}
                    onChange={(e) => setPositionFilter(e.target.value)}
                    className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  >
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              <div className="space-y-4">
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className={`p-6 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{profile.username.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{profile.username}</h3>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{profile.university} • GPA: {profile.cgpa?.toFixed(2) || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Department:</p>
                            <p className="font-medium">{profile.department}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Email:</p>
                            <p className="font-medium">{profile.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Match Score: </span>
                            <span className="font-bold text-green-600">{Math.round(Math.random() * 20 + 80)}%</span>
                          </div>
                          <div>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status: </span>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                              New
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          View Profile
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Contact
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryDashboard;