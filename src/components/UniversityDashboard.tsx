import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Clock,
} from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

interface Student {
  id: string;
  username: string;
  email: string;
  department: string;
  university: string;
  cgpa: number | null;
}

interface Placement {
  id: string;
  student_id: string;
  company: string;
  position: string;
  department: string;
  university: string;
}

interface Skill {
  id: string;
  skill: string;
  demand: number;
  supply: number;
  university: string;
}

interface Partnership {
  id: string;
  company: string;
  type: string;
  students_involved: number;
  duration: string;
  status: string;
  contact: string;
  university: string;
}

interface UniversityProfile {
  user_id: string;
  email: string;
  department: string;
  university: string;
}

const UniversityDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [universityProfile, setUniversityProfile] = useState<UniversityProfile | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [universityFilter, setUniversityFilter] = useState('All Universities');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const navigate = useNavigate();

  const universities = [
    'All Universities',
    'Daffodil International University',
    'Dhaka University',
  ];
  const departments = [
    'All Departments',
    'Computer Science and Engineering',
    'Software Engineering',
    'Multimedia and Creative Technology',
  ];

  useEffect(() => {
    fetchUniversityProfile();
  }, []);

  useEffect(() => {
    if (universityProfile?.university) {
      if (activeTab === 'students') {
        fetchStudents();
      } else if (activeTab === 'overview') {
        fetchAllData();
      } else if (activeTab === 'partnerships') {
        fetchPartnerships();
      }
    }
  }, [activeTab, universityProfile]);

  useEffect(() => {
    let filtered = students;
    if (universityFilter !== 'All Universities') {
      filtered = filtered.filter((student) => student.university === universityFilter);
    }
    if (departmentFilter !== 'All Departments') {
      filtered = filtered.filter((student) => student.department === departmentFilter);
    }
    setFilteredStudents(filtered);
  }, [students, universityFilter, departmentFilter]);

  const fetchUniversityProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setError('Please log in to view the dashboard.');
        navigate('/login/university');
        return;
      }

      console.log('Fetching profile for user:', user.id);
      const { data, error } = await supabase
        .from('university_profiles')
        .select('user_id, email, department, university')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Fetch profile error:', error);
        throw new Error(error.message || 'University profile not found.');
      }

      console.log('Fetched university profile:', data);
      setUniversityProfile(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch university profile.');
      console.error('Error fetching university profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    if (!universityProfile?.university) {
      setError('University profile not loaded.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setError('Please log in to view student data.');
        navigate('/login/university');
        return;
      }

      console.log('Fetching students for university:', universityProfile.university);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, email, department, university, cgpa')
        .eq('university', universityProfile.university);

      if (error) {
        console.error('Fetch students error:', error);
        throw error;
      }

      console.log('Fetched students:', data);
      setStudents(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch student data.');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlacements = async () => {
    if (!universityProfile?.university) return;
    try {
      console.log('Fetching placements for university:', universityProfile.university);
      const { data, error } = await supabase
        .from('placements')
        .select('id, student_id, company, position, department, university')
        .eq('university', universityProfile.university);

      if (error) {
        console.error('Fetch placements error:', error);
        throw error;
      }

      console.log('Fetched placements:', data);
      setPlacements(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch placement data.');
      console.error('Error fetching placements:', err);
    }
  };

  const fetchSkills = async () => {
    if (!universityProfile?.university) return;
    try {
      console.log('Fetching skills for university:', universityProfile.university);
      const { data, error } = await supabase
        .from('skills')
        .select('id, skill, demand, supply, university')
        .eq('university', universityProfile.university);

      if (error) {
        console.error('Fetch skills error:', error);
        throw error;
      }

      console.log('Fetched skills:', data);
      setSkills(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch skills data.');
      console.error('Error fetching skills:', err);
    }
  };

  const fetchPartnerships = async () => {
    if (!universityProfile?.university) return;
    try {
      console.log('Fetching partnerships for university:', universityProfile.university);
      const { data, error } = await supabase
        .from('partnerships')
        .select('id, company, type, students_involved, duration, status, contact, university')
        .eq('university', universityProfile.university);

      if (error) {
        console.error('Fetch partnerships error:', error);
        throw error;
      }

      console.log('Fetched partnerships:', data);
      setPartnerships(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch partnerships data.');
      console.error('Error fetching partnerships:', err);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchStudents(), fetchPlacements(), fetchSkills(), fetchPartnerships()]);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data.');
      console.error('Error fetching all data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.removeItem('universityEmail');
      navigate('/login/university');
    } catch (err) {
      setError('Failed to log out. Please try again.');
      console.error('Logout error:', err);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode
    ? 'bg-gray-900 text-white'
    : 'bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 text-gray-900';

  if (!universityProfile && !loading) {
    return (
      <div className={`min-h-screen ${themeClasses} flex items-center justify-center`}>
        <p className="text-red-500">Failed to load university profile. Please log in again.</p>
      </div>
    );
  }

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
      <nav
        className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-gray-200'
        } backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300`}
      >
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
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'overview' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'students' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setActiveTab('partnerships')}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'partnerships' ? 'bg-teal-100 text-teal-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Partnerships
                </button>
                <button className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Messages
                </button>
                <button className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className={`pl-10 pr-4 py-2 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  onChange={(e) => {
                    const search = e.target.value.toLowerCase();
                    setFilteredStudents(
                      students.filter(
                        (student) =>
                          student.username.toLowerCase().includes(search) ||
                          student.email.toLowerCase().includes(search)
                      )
                    );
                  }}
                />
              </div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors`}
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
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {universityProfile?.university || 'University'}!
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Monitor student engagement and industry partnerships
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Active Students
                    </p>
                    <p className="text-2xl font-bold text-teal-600">{students.length}</p>
                  </div>
                  <GraduationCap className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Placements
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {students.length > 0 ? Math.round((placements.length / students.length) * 100) : 0}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Industry Partners
                    </p>
                    <p className="text-2xl font-bold text-blue-600">{partnerships.length}</p>
                  </div>
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Success Stories
                    </p>
                    <p className="text-2xl font-bold text-purple-600">{placements.length}</p>
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
                    <button className="text-teal-600 hover:text-teal-700 font-medium">
                      View Details
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Department Performance</h3>
                      <div className="space-y-4">
                        {departments.slice(1).map((dept, index) => {
                          const deptStudents = students.filter((s) => s.department === dept);
                          const deptPlacements = placements.filter((p) => p.department === dept);
                          const placementRate =
                            deptStudents.length > 0
                              ? Math.round((deptPlacements.length / deptStudents.length) * 100)
                              : 0;
                          return (
                            <div
                              key={index}
                              className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{dept}</span>
                                <span className="text-sm text-green-600 font-semibold">
                                  {placementRate}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>{deptStudents.length} students</span>
                                <span>{deptPlacements.length} placed</span>
                              </div>
                              <div
                                className={`w-full ${
                                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                                } rounded-full h-2 mt-2`}
                              >
                                <div
                                  className="bg-teal-600 h-2 rounded-full"
                                  style={{ width: `${placementRate}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Recent Placements</h3>
                      <div className="space-y-3">
                        {placements.slice(0, 3).map((placement, index) => {
                          const student = students.find((s) => s.id === placement.student_id);
                          return (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${
                                isDarkMode ? 'border-gray-700' : 'border-gray-200'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-semibold">
                                    {student ? student.username.split(' ').map((n) => n[0]).join('') : 'N/A'}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{student?.username || 'Unknown'}</p>
                                  <p
                                    className={`text-xs ${
                                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                                  >
                                    {placement.position} at {placement.company}
                                  </p>
                                </div>
                                <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                                  {placement.department.split(' ')[0]}
                                </span>
                              </div>
                            </div>
                          );
                        })}
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
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{skill.skill}</span>
                              <span
                                className={`text-sm font-semibold ${
                                  skill.demand > skill.supply ? 'text-red-600' : 'text-green-600'
                                }`}
                              >
                                {skill.demand > skill.supply
                                  ? `+${skill.demand - skill.supply}% gap`
                                  : `${Math.abs(skill.demand - skill.supply)}% surplus`}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Industry Demand</span>
                                <span>{skill.demand}%</span>
                              </div>
                              <div
                                className={`w-full ${
                                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                                } rounded-full h-2`}
                              >
                                <div
                                  className="bg-red-500 h-2 rounded-full"
                                  style={{ width: `${skill.demand}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span>Student Skills</span>
                                <span>{skill.supply}%</span>
                              </div>
                              <div
                                className={`w-full ${
                                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                                } rounded-full h-2`}
                              >
                                <div
                                  className="bg-teal-500 h-2 rounded-full"
                                  style={{ width: `${skill.supply}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Curriculum Recommendations</h3>
                      <div className="space-y-3">
                        {skills
                          .filter((s) => s.demand > s.supply)
                          .map((skill, index) => ({
                            recommendation: `Add ${skill.skill} Course`,
                            priority: 'High',
                            impact: `Address ${skill.demand - skill.supply}% skill gap in ${skill.skill}`,
                            timeline: 'Next Semester',
                          }))
                          .slice(0, 3)
                          .map((rec, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border ${
                                isDarkMode ? 'border-gray-700' : 'border-gray-200'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">{rec.recommendation}</h4>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    rec.priority === 'High'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}
                                >
                                  {rec.priority}
                                </span>
                              </div>
                              <p
                                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
                              >
                                {rec.impact}
                              </p>
                              <p
                                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                              >
                                Timeline: {rec.timeline}
                              </p>
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
                      <h3 className="font-bold">{universityProfile?.university || 'University'}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {universityProfile?.department || 'Department'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                        Focus Areas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['AI/ML', 'Software Eng', 'Data Science'].map((area) => (
                          <span
                            key={area}
                            className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full"
                          >
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
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Highest growth in tech sector
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Remote Work</span>
                        <span className="text-xs text-blue-600">↑ 28%</span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Permanent remote positions
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Cybersecurity</span>
                        <span className="text-xs text-purple-600">↑ 22%</span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Critical skill shortage
                      </p>
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
                    {placements.slice(0, 3).map((placement, index) => {
                      const student = students.find((s) => s.id === placement.student_id);
                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            isDarkMode ? 'border-gray-700' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium text-sm">{student?.username || 'Unknown'}</span>
                          </div>
                          <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
                          >
                            {placement.company}
                          </p>
                          <p
                            className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            {placement.position}
                          </p>
                        </div>
                      );
                    })}
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
                      className={`pl-10 pr-4 py-2 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      onChange={(e) => {
                        const search = e.target.value.toLowerCase();
                        setFilteredStudents(
                          students.filter(
                            (student) =>
                              student.username.toLowerCase().includes(search) ||
                              student.email.toLowerCase().includes(search)
                          )
                        );
                      }}
                    />
                  </div>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className={`p-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    disabled={loading}
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <select
                    value={universityFilter}
                    onChange={(e) => setUniversityFilter(e.target.value)}
                    className={`p-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    disabled={loading}
                  >
                    {universities.map((uni) => (
                      <option key={uni} value={uni}>
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading students...</div>
              ) : filteredStudents.length === 0 ? (
                <div className="text-center py-8">No students found.</div>
              ) : (
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-6 rounded-lg border ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {student.username.split(' ').map((n) => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{student.username}</h3>
                              <p
                                className={`${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                ID: {student.id} • {student.department}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                } mb-1`}
                              >
                                University:
                              </p>
                              <p className="font-medium">{student.university}</p>
                            </div>
                            <div>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                } mb-1`}
                              >
                                CGPA:
                              </p>
                              <p className="font-medium">{student.cgpa?.toFixed(2) || 'N/A'}</p>
                            </div>
                            <div>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                } mb-1`}
                              >
                                Email:
                              </p>
                              <p className="font-medium">{student.email}</p>
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
              )}
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
                    {partnerships.map((partnership, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg border ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <Building className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{partnership.company}</h3>
                                <p
                                  className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                  }`}
                                >
                                  {partnership.type}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p
                                  className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                  }`}
                                >
                                  Students Involved
                                </p>
                                <p className="font-semibold">{partnership.students_involved}</p>
                              </div>
                              <div>
                                <p
                                  className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                  }`}
                                >
                                  Duration
                                </p>
                                <p className="font-semibold">{partnership.duration}</p>
                              </div>
                              <div>
                                <p
                                  className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                  }`}
                                >
                                  Contact
                                </p>
                                <p className="font-semibold">{partnership.contact}</p>
                              </div>
                              <div>
                                <p
                                  className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                  }`}
                                >
                                  Status
                                </p>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    partnership.status === 'Active'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}
                                >
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
                        <span className="font-bold text-teal-600">{partnerships.length}</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <span>Active Programs</span>
                        <span className="font-bold text-green-600">
                          {partnerships.filter((p) => p.status === 'Active').length}
                        </span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <span>Students Placed</span>
                        <span className="font-bold text-blue-600">{placements.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="font-bold mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    {[
                      { event: 'Tech Career Fair', date: 'Mar 15', companies: 25 },
                      { event: 'Industry Panel', date: 'Mar 22', companies: 8 },
                      { event: 'Networking Mixer', date: 'Apr 5', companies: 15 },
                    ].map((event, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      >
                        <h4 className="font-medium text-sm">{event.event}</h4>
                        <p
                          className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
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