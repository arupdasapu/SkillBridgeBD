import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Award, 
  MessageSquare, 
  Search,
  Settings,
  LogOut,
  Plus,
  Filter,
  Eye,
  Edit,
  BarChart3,
  Bell,
  Moon,
  Sun,
  FileText,
  Target,
  Briefcase,
  Star,
  ChevronRight,
  MapPin,
  Clock
} from 'lucide-react';

const UniversityDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      {/* Top Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SkillBridge</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('students')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'students' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'}`}
                >
                  Students
                </button>
                <button 
                  onClick={() => setActiveTab('partnerships')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'partnerships' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'}`}
                >
                  Partnerships
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
                  placeholder="Search students..."
                  className={`pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
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
              <h1 className="text-3xl font-bold mb-2">Welcome back, Stanford University!</h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Monitor student engagement and industry partnerships
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Students</p>
                    <p className="text-2xl font-bold text-teal-600">1,247</p>
                  </div>
                  <GraduationCap className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Placements</p>
                    <p className="text-2xl font-bold text-green-600">89%</p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Industry Partners</p>
                    <p className="text-2xl font-bold text-blue-600">156</p>
                  </div>
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Success Stories</p>
                    <p className="text-2xl font-bold text-purple-600">342</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Student Participation Stats */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Student Participation & Placement</h2>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">View Details</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Department Performance</h3>
                      <div className="space-y-4">
                        {[
                          { dept: "Computer Science", students: 342, placed: 95 },
                          { dept: "Engineering", students: 289, placed: 87 },
                          { dept: "Business", students: 234, placed: 82 },
                          { dept: "Data Science", students: 198, placed: 91 }
                        ].map((dept, index) => (
                          <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{dept.dept}</span>
                              <span className="text-sm text-green-600 font-semibold">{dept.placed}%</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>{dept.students} students</span>
                              <span>{Math.round(dept.students * dept.placed / 100)} placed</span>
                            </div>
                            <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mt-2`}>
                              <div 
                                className="bg-teal-600 h-2 rounded-full" 
                                style={{ width: `${dept.placed}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Recent Placements</h3>
                      <div className="space-y-3">
                        {[
                          { name: "Sarah Chen", company: "Google", position: "Software Engineer", dept: "CS" },
                          { name: "Michael Rodriguez", company: "Microsoft", position: "Data Scientist", dept: "DS" },
                          { name: "Emily Johnson", company: "Apple", position: "Product Manager", dept: "Business" },
                          { name: "David Kim", company: "Tesla", position: "ML Engineer", dept: "CS" }
                        ].map((placement, index) => (
                          <div key={index} className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">{placement.name.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{placement.name}</p>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{placement.position} at {placement.company}</p>
                              </div>
                              <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                                {placement.dept}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skill Gap Analytics */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h2 className="text-xl font-bold mb-6">Skill Gap Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Industry Demand vs Student Skills</h3>
                      <div className="space-y-4">
                        {[
                          { skill: "Machine Learning", demand: 85, supply: 65, gap: 20 },
                          { skill: "Cloud Computing", demand: 78, supply: 45, gap: 33 },
                          { skill: "React/Frontend", demand: 72, supply: 80, gap: -8 },
                          { skill: "Data Analysis", demand: 69, supply: 58, gap: 11 }
                        ].map((skill, index) => (
                          <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{skill.skill}</span>
                              <span className={`text-sm font-semibold ${skill.gap > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {skill.gap > 0 ? `+${skill.gap}% gap` : `${Math.abs(skill.gap)}% surplus`}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Industry Demand</span>
                                <span>{skill.demand}%</span>
                              </div>
                              <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${skill.demand}%` }}></div>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span>Student Skills</span>
                                <span>{skill.supply}%</span>
                              </div>
                              <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${skill.supply}%` }}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Curriculum Recommendations</h3>
                      <div className="space-y-3">
                        {[
                          {
                            recommendation: "Add Advanced ML Course",
                            priority: "High",
                            impact: "Address 20% skill gap in ML",
                            timeline: "Next Semester"
                          },
                          {
                            recommendation: "Cloud Computing Certification",
                            priority: "High",
                            impact: "Bridge 33% cloud skills gap",
                            timeline: "6 months"
                          },
                          {
                            recommendation: "Industry Project Integration",
                            priority: "Medium",
                            impact: "Improve practical experience",
                            timeline: "Ongoing"
                          }
                        ].map((rec, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm">{rec.recommendation}</h4>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                rec.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {rec.priority}
                              </span>
                            </div>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{rec.impact}</p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Timeline: {rec.timeline}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* University Profile */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Stanford University</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Computer Science Dept.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Focus Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {['AI/ML', 'Software Eng', 'Data Science'].map((area) => (
                          <span key={area} className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Industry Trends */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Industry Trends</h3>
                  <div className="space-y-4">
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">AI/ML Roles</span>
                        <span className="text-xs text-green-600">↑ 34%</span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Highest growth in tech sector</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Remote Work</span>
                        <span className="text-xs text-blue-600">↑ 28%</span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Permanent remote positions</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Cybersecurity</span>
                        <span className="text-xs text-purple-600">↑ 22%</span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Critical skill shortage</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-teal-50 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-teal-600" />
                      <span>Create Event</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-teal-50 transition-colors flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span>Generate Report</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-teal-50 transition-colors flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-teal-600" />
                      <span>Contact Industry</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-teal-50 transition-colors flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-teal-600" />
                      <span>View Analytics</span>
                    </button>
                  </div>
                </div>

                {/* Success Stories */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Recent Success Stories</h3>
                  <div className="space-y-3">
                    {[
                      { student: "Alex Chen", company: "Google", achievement: "Landed SWE role after internship" },
                      { student: "Maria Garcia", company: "Tesla", achievement: "Led autonomous driving project" },
                      { student: "James Wilson", company: "Meta", achievement: "Developed AR feature prototype" }
                    ].map((story, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium text-sm">{story.student}</span>
                        </div>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{story.company}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{story.achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'students' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Student Management</h1>
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Student</span>
              </button>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      className={`pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                  <select className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                    <option>All Departments</option>
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Business</option>
                  </select>
                  <select className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                    <option>All Years</option>
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Chen",
                    id: "SC2024001",
                    department: "Computer Science",
                    year: "Junior",
                    gpa: "3.8",
                    skills: ["React", "Python", "Machine Learning"],
                    status: "Active in Internship",
                    company: "Google"
                  },
                  {
                    name: "Michael Rodriguez",
                    id: "MR2024002",
                    department: "Data Science",
                    year: "Senior",
                    gpa: "3.9",
                    skills: ["Python", "SQL", "Deep Learning"],
                    status: "Seeking Opportunities",
                    company: null
                  },
                  {
                    name: "Emily Johnson",
                    id: "EJ2024003",
                    department: "Business",
                    year: "Junior",
                    gpa: "3.7",
                    skills: ["Product Management", "Analytics", "Strategy"],
                    status: "Interview Process",
                    company: "Microsoft"
                  }
                ].map((student, index) => (
                  <div key={index} className={`p-6 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{student.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{student.name}</h3>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: {student.id} • {student.department}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Academic Year:</p>
                            <p className="font-medium">{student.year} • GPA: {student.gpa}</p>
                          </div>
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {student.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Status:</p>
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                student.status === 'Active in Internship' ? 'bg-green-100 text-green-700' :
                                student.status === 'Interview Process' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {student.status}
                              </span>
                              {student.company && (
                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  @ {student.company}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
                          View Profile
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

        {activeTab === 'partnerships' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Industry Partnerships</h1>
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>New Partnership</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h2 className="text-xl font-bold mb-6">Active Partnerships</h2>
                  <div className="space-y-4">
                    {[
                      {
                        company: "Google",
                        type: "Internship Program",
                        students: 45,
                        duration: "2 years",
                        status: "Active",
                        contact: "Sarah Wilson"
                      },
                      {
                        company: "Microsoft",
                        type: "Research Collaboration",
                        students: 23,
                        duration: "3 years",
                        status: "Active",
                        contact: "John Davis"
                      },
                      {
                        company: "Tesla",
                        type: "Capstone Projects",
                        students: 18,
                        duration: "1 year",
                        status: "Pending Renewal",
                        contact: "Lisa Chen"
                      }
                    ].map((partnership, index) => (
                      <div key={index} className={`p-6 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <Building className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{partnership.company}</h3>
                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{partnership.type}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Students Involved</p>
                                <p className="font-semibold">{partnership.students}</p>
                              </div>
                              <div>
                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration</p>
                                <p className="font-semibold">{partnership.duration}</p>
                              </div>
                              <div>
                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contact</p>
                                <p className="font-semibold">{partnership.contact}</p>
                              </div>
                              <div>
                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  partnership.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {partnership.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Partnership Stats</h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <span>Total Partners</span>
                        <span className="font-bold text-teal-600">156</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <span>Active Programs</span>
                        <span className="font-bold text-green-600">23</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <span>Students Placed</span>
                        <span className="font-bold text-blue-600">1,247</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    {[
                      { event: "Tech Career Fair", date: "Mar 15", companies: 25 },
                      { event: "Industry Panel", date: "Mar 22", companies: 8 },
                      { event: "Networking Mixer", date: "Apr 5", companies: 15 }
                    ].map((event, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h4 className="font-medium text-sm">{event.event}</h4>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {event.date} • {event.companies} companies
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDashboard;