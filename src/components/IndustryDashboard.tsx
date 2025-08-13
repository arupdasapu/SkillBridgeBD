import React, { useState } from 'react';
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

const IndustryDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
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
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
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
                    <p className="text-2xl font-bold text-blue-600">47</p>
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
                    <h2 className="text-xl font-bold">Recent Applications</h2>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">View All</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Sarah Chen",
                        position: "Frontend Developer Intern",
                        university: "Stanford University",
                        skills: ["React", "TypeScript", "UI/UX"],
                        match: "94%",
                        applied: "2 hours ago"
                      },
                      {
                        name: "Michael Rodriguez",
                        position: "Data Science Intern",
                        university: "MIT",
                        skills: ["Python", "Machine Learning", "SQL"],
                        match: "89%",
                        applied: "5 hours ago"
                      },
                      {
                        name: "Emily Johnson",
                        position: "Product Manager Intern",
                        university: "UC Berkeley",
                        skills: ["Product Strategy", "Analytics", "Agile"],
                        match: "87%",
                        applied: "1 day ago"
                      }
                    ].map((applicant, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} transition-colors cursor-pointer`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">{applicant.name.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              <div>
                                <h3 className="font-semibold">{applicant.name}</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{applicant.university}</p>
                              </div>
                            </div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{applicant.position}</p>
                            <div className="flex items-center space-x-2 mb-2">
                              {applicant.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Applied {applicant.applied}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Match</p>
                              <p className="font-bold text-green-600">{applicant.match}</p>
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
                      <h3 className="font-semibold mb-4">Top Skills in Demand</h3>
                      <div className="space-y-3">
                        {[
                          { skill: "React", percentage: 85 },
                          { skill: "Python", percentage: 78 },
                          { skill: "Machine Learning", percentage: 72 },
                          { skill: "Node.js", percentage: 65 }
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.skill}</span>
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
                      <h3 className="font-semibold mb-4">Application Trends</h3>
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between">
                            <span>This Month</span>
                            <span className="font-bold text-green-600">+23%</span>
                          </div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>47 applications</p>
                        </div>
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between">
                            <span>Response Rate</span>
                            <span className="font-bold text-blue-600">68%</span>
                          </div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Above industry average</p>
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
                      { action: "New application received", time: "2 hours ago", type: "application" },
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
            <h1 className="text-3xl font-bold mb-8">Application Management</h1>
            
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      className={`pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                  <select className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                    <option>All Positions</option>
                    <option>Frontend Developer</option>
                    <option>Data Science</option>
                    <option>Product Manager</option>
                  </select>
                  <select className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                    <option>All Status</option>
                    <option>New</option>
                    <option>Reviewed</option>
                    <option>Interview</option>
                    <option>Hired</option>
                  </select>
                </div>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Chen",
                    position: "Frontend Developer Intern",
                    university: "Stanford University",
                    gpa: "3.8",
                    skills: ["React", "TypeScript", "UI/UX"],
                    match: "94%",
                    status: "Interview Scheduled",
                    applied: "2 hours ago"
                  },
                  {
                    name: "Michael Rodriguez",
                    position: "Data Science Intern",
                    university: "MIT",
                    gpa: "3.9",
                    skills: ["Python", "Machine Learning", "SQL"],
                    match: "89%",
                    status: "Under Review",
                    applied: "5 hours ago"
                  },
                  {
                    name: "Emily Johnson",
                    position: "Product Manager Intern",
                    university: "UC Berkeley",
                    gpa: "3.7",
                    skills: ["Product Strategy", "Analytics", "Agile"],
                    match: "87%",
                    status: "New Application",
                    applied: "1 day ago"
                  }
                ].map((applicant, index) => (
                  <div key={index} className={`p-6 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{applicant.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{applicant.name}</h3>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{applicant.university} • GPA: {applicant.gpa}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Applied for:</p>
                            <p className="font-medium">{applicant.position}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {applicant.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Match Score: </span>
                            <span className="font-bold text-green-600">{applicant.match}</span>
                          </div>
                          <div>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Applied: </span>
                            <span>{applicant.applied}</span>
                          </div>
                          <div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              applicant.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-700' :
                              applicant.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {applicant.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          View Resume
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Schedule Interview
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