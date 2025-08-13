import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Building, Users, ArrowRight, BookOpen, Target, Zap, Award, TrendingUp, Globe, Mail, Phone, MapPin, Send } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SkillBridge</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Bridging the Gap Between
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Education & Industry</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect students with real-world opportunities, universities with industry partners, 
              and companies with fresh talent through our comprehensive skill development platform.
            </p>
            
            {/* Main CTA Button */}
            <div className="mt-10">
              <Link
                to="/select-user-type"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In & Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Empowering Three Key Stakeholders
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform creates meaningful connections across the education-industry spectrum
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Students Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Students</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access real-world projects, build industry-relevant skills, and connect directly with potential employers.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-blue-500 mr-2" />
                  Project-based learning
                </li>
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-blue-500 mr-2" />
                  Industry mentorship
                </li>
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-blue-500 mr-2" />
                  Career placement support
                </li>
              </ul>
            </div>

            {/* Universities Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Universities</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Enhance curriculum with industry input, improve graduate employability, and strengthen industry partnerships.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-teal-500 mr-2" />
                  Curriculum enhancement
                </li>
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-teal-500 mr-2" />
                  Industry collaboration
                </li>
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-teal-500 mr-2" />
                  Graduate tracking
                </li>
              </ul>
            </div>

            {/* Industry Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Industry</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access skilled talent pipeline, influence education outcomes, and engage in meaningful CSR initiatives.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-orange-500 mr-2" />
                  Talent acquisition
                </li>
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-orange-500 mr-2" />
                  Skills development
                </li>
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-orange-500 mr-2" />
                  Innovation partnerships
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              About SkillBridge
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming education through innovative industry partnerships and real-world skill development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                SkillBridge was founded with a simple yet powerful vision: to eliminate the gap between academic learning and industry requirements. We believe that education should be dynamic, practical, and directly connected to the evolving needs of the modern workforce.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our platform serves as a comprehensive ecosystem where students gain hands-on experience through real industry projects, universities enhance their curricula with current market insights, and companies discover and nurture fresh talent while contributing to educational excellence.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Excellence in Education</h4>
                  <p className="text-sm text-gray-600">Recognized for innovative educational solutions</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Platform Impact</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Students</span>
                  <span className="text-2xl font-bold text-blue-600">25,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Partner Universities</span>
                  <span className="text-2xl font-bold text-teal-600">150+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Industry Partners</span>
                  <span className="text-2xl font-bold text-orange-600">500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Successful Placements</span>
                  <span className="text-2xl font-bold text-green-600">18,000+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Skill Development</h4>
              <p className="text-gray-600">
                Comprehensive skill tracking and development programs aligned with industry standards and future job market demands.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Global Network</h4>
              <p className="text-gray-600">
                Connect with opportunities worldwide through our extensive network of educational institutions and industry leaders.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Quality Assurance</h4>
              <p className="text-gray-600">
                Rigorous quality standards ensure all projects and partnerships meet the highest educational and professional criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to transform your educational or professional journey? We're here to help you get started.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600 mb-2">Get in touch with our team for any inquiries</p>
                    <a href="mailto:info@skillbridge.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      info@skillbridge.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600 mb-2">Speak directly with our support team</p>
                    <a href="tel:+1-555-0123" className="text-teal-600 hover:text-teal-700 font-medium">
                      +1 (555) 012-3456
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-gray-600 mb-2">Our headquarters location</p>
                    <address className="text-orange-600 not-italic">
                      123 Innovation Drive<br />
                      Tech Valley, CA 94025<br />
                      United States
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Partnership Inquiries</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Interested in partnering with us? We'd love to explore collaboration opportunities.
                </p>
                <a href="mailto:partnerships@skillbridge.com" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  partnerships@skillbridge.com
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                    I am a...
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="university">University Representative</option>
                    <option value="industry">Industry Professional</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of students, universities, and companies already benefiting from our platform
          </p>
          <Link
            to="/select-user-type"
            className="group inline-flex items-center px-10 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Zap className="mr-2 w-5 h-5" />
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SkillBridge</span>
            </div>
            <p className="text-gray-400">
              © 2025 SkillBridge. Connecting education with industry for a better tomorrow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;