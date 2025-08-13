import React, { useState } from 'react';
import { 
  User, 
  BookOpen, 
  Target, 
  Calendar, 
  Bell, 
  Star, 
  TrendingUp, 
  Award, 
  MessageSquare, 
  Search,
  Settings,
  LogOut,
  Plus,
  Filter,
  ExternalLink,
  Clock,
  MapPin,
  Building,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';

const StudentDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      {/* Top Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SkillBridge</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  Profile
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
                  placeholder="Search opportunities..."
                  className={`pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
              <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Ready to take the next step in your career journey?
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Applications</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Skill Match</p>
                    <p className="text-2xl font-bold text-green-600">85%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Saved Jobs</p>
                    <p className="text-2xl font-bold text-purple-600">8</p>
                  </div>
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Events</p>
                    <p className="text-2xl font-bold text-orange-600">3</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* AI Recommendations */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">AI-Recommended Opportunities</h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Frontend Developer Intern",
                        company: "TechCorp Inc.",
                        location: "San Francisco, CA",
                        match: "92%",
                        type: "Internship",
                        deadline: "5 days left"
                      },
                      {
                        title: "UX Research Assistant",
                        company: "Design Studio",
                        location: "Remote",
                        match: "88%",
                        type: "Research",
                        deadline: "2 weeks left"
                      },
                      {
                        title: "Data Science Project",
                        company: "Analytics Pro",
                        location: "New York, NY",
                        match: "85%",
                        type: "Project",
                        deadline: "1 week left"
                      }
                    ].map((opportunity, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} transition-colors cursor-pointer`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{opportunity.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                opportunity.type === 'Internship' ? 'bg-blue-100 text-blue-700' :
                                opportunity.type === 'Research' ? 'bg-green-100 text-green-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {opportunity.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Building className="w-4 h-4" />
                                <span>{opportunity.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{opportunity.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{opportunity.deadline}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Match</p>
                              <p className="font-bold text-green-600">{opportunity.match}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Status */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h2 className="text-xl font-bold mb-6">Application Status</h2>
                  <div className="space-y-4">
                    {[
                      { company: "Google", position: "Software Engineer Intern", status: "Interview Scheduled", color: "blue" },
                      { company: "Microsoft", position: "Product Manager Intern", status: "Under Review", color: "yellow" },
                      { company: "Apple", position: "Design Intern", status: "Application Sent", color: "gray" }
                    ].map((application, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div>
                          <h3 className="font-semibold">{application.position}</h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{application.company}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          application.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {application.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Summary */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Alex Johnson</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Computer Science Student</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Top Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Python', 'JavaScript', 'UI/UX'].map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Tech Career Fair", date: "Mar 15", time: "2:00 PM" },
                      { title: "AI Workshop", date: "Mar 18", time: "10:00 AM" },
                      { title: "Networking Event", date: "Mar 22", time: "6:00 PM" }
                    ].map((event, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.date} at {event.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-blue-600" />
                      <span>Upload Resume</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span>Explore Opportunities</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span>Contact Mentor</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Explore More Opportunities?</h2>
              <p className="mb-6 opacity-90">Discover internships, research projects, and career opportunities tailored just for you.</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore More Opportunities
              </button>
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input type="text" value="Alex Johnson" className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input type="email" value="alex.johnson@university.edu" className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">University</label>
                      <input type="text" value="Stanford University" className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Major</label>
                      <input type="text" value="Computer Science" className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-4">Skills & Interests</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Technical Skills</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {['React', 'Python', 'JavaScript', 'Node.js', 'SQL', 'Git'].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center space-x-1">
                            <span>{skill}</span>
                            <button className="text-blue-500 hover:text-blue-700">×</button>
                          </span>
                        ))}
                      </div>
                      <input type="text" placeholder="Add new skill..." className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Career Interests</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {['Frontend Development', 'Machine Learning', 'UI/UX Design'].map((interest) => (
                          <span key={interest} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center space-x-1">
                            <span>{interest}</span>
                            <button className="text-green-500 hover:text-green-700">×</button>
                          </span>
                        ))}
                      </div>
                      <input type="text" placeholder="Add career interest..." className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button className={`px-6 py-2 rounded-lg border ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors`}>
                  Cancel
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;