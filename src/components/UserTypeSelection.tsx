import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Building, Users, ArrowLeft, BookOpen } from 'lucide-react';

const UserTypeSelection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SkillBridge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your User Type
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the option that best describes you to access the appropriate login portal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Student Option */}
            <Link
              to="/login/student"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Student</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Access learning resources, projects, and career opportunities
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-700 font-medium">
                    Perfect for learners seeking skill development and industry experience
                  </p>
                </div>
              </div>
            </Link>

            {/* University Option */}
            <Link
              to="/login/university"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">University</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Manage programs, track student progress, and partner with industry
                </p>
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-teal-700 font-medium">
                    Designed for educational institutions and academic professionals
                  </p>
                </div>
              </div>
            </Link>

            {/* Industry Option */}
            <Link
              to="/login/industry"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Industry</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Find talent, offer projects, and engage with educational partners
                </p>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-700 font-medium">
                    Built for companies and organizations seeking fresh talent
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500">
              Not sure which option is right for you? 
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;